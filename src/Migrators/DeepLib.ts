import { EntryResponseType, ResponsesEntryModel, ResponsesSettingsModel } from '_/Models/Responses';
import { GuiResponses } from '_/Screens/Responses';
import { BaseMigrator, dataStore, getModule } from 'bc-deeplib';
import { Guid } from 'js-guid';
import { GlobalModule } from '../Modules/Global';
import { ModName } from '../Utilities/Definition';

export class DeepLibMigrator extends BaseMigrator {
  get MigrationVersion(): string {
    return '0.7.0';
  }

  Migrate(): boolean {
    clearUpOldStorage();
    fixPotentialyFaultyData();
    replaceOldSettings();
    migrateOldSettings();

    dataStore();

    return true;
  }
}

function clearUpOldStorage() { 
  //@ts-expect-error: Deprecated property
  delete Player.OnlineSettings?.['BCResponsive']?.Profiles;
  //@ts-expect-error: Deprecated property
  delete Player.OnlineSettings?.['BCResponsive']?.data;
  //@ts-expect-error: Deprecated property
  delete Player.OnlineSettings?.['BCResponsive']?.SavedVersion;
}

type OldResponsesEntryModel = {
  actName: string;
  groupName: string[];
  responses: string[];
  selfTrigger?: boolean;
};

function fixPotentialyFaultyData() {
  const data = Player[ModName] as any;
  const mainResponses = data.ResponsesModule['mainResponses'] as OldResponsesEntryModel[];

  mainResponses.forEach((entry) => {
    if (entry.actName == undefined) {
      mainResponses.splice(mainResponses.indexOf(entry));
    }

    if (typeof entry.groupName == 'string') {
      entry.groupName = [entry.groupName];
    }

    if (entry.responses == undefined) {
      entry.responses = [''];
    }
  });
}

function replaceOldSettings() {
  const data = Player[ModName];
  
  const globalModuleDefaults = getModule<GlobalModule>('GlobalModule').defaultSettings;

  data.GlobalModule.charTalkEnabled = (data as any).GlobalModule?.CharTalkEnabled ?? globalModuleDefaults.charTalkEnabled;
  delete (data as any).GlobalModule.CharTalkEnabled;
  data.GlobalModule.modEnabled = (data as any).GlobalModule?.ResponsiveEnabled ?? globalModuleDefaults.modEnabled;
  delete (data as any).GlobalModule.ResponsiveEnabled;
}

function migrateOldSettings() {
  const data = Player[ModName];
  
  const newResponsesModel = [] as unknown as ResponsesSettingsModel;
  const oldResponsesModel = (data as any).ResponsesModule['mainResponses'] as OldResponsesEntryModel[];

  oldResponsesModel.forEach((entry, index) => {
    const group = AssetGroup.find((a) => a.Name == entry.groupName[1]);
    const activity = AssetAllActivities(Player.AssetFamily).find((act) => act.Name === entry.actName);
    const entryName = activity && group ? GuiResponses.getActivityLabel(activity, group) : entry.actName;
    const newEntry = {
      name: entryName,
      guid: Guid.newGuid().toString(),
      isEnabled: true,
      response: [],
      trigger: [],
    } as ResponsesEntryModel;

    newEntry.metadata = {
      'Group': entry.groupName,
      'Actitity': entry.actName,
    };

    newEntry.trigger.push({
      type: 'Action',
      direction: entry.selfTrigger ? 'Both' : 'Incoming',
    });

    const content = entry.responses.map((res) => {
      if (res.startsWith('**')) return res.slice(2);
      if (res.startsWith('*')) return res.slice(1);
      if (res.startsWith('@@')) return res.slice(2);
      if (res.startsWith('@')) return res.slice(1);
      return res;
    });

    content.forEach(response => {
      const responseType: EntryResponseType = ((): EntryResponseType => {
        if (response.startsWith('**')) return 'Emote';
        if (response.startsWith('*')) return 'EmoteSelf';
        if (response.startsWith('@@')) return 'Action';
        if (response.startsWith('@')) return 'ActionSelf';

        return 'Speech';
      })();

      newEntry.response.push({
        type: responseType,
        content: response,
      });
    });

    newResponsesModel.push(newEntry);
  });

  data.ResponsesModule = newResponsesModel;
}
