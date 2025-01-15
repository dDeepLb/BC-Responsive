import { EntryResponseType, ResponseRpMode, ResponsesEntryModel, ResponsesSettingsModel } from '_/Models/Responses';
import { GuiResponses } from '_/Screens/Responses';
import { BaseMigrator, getModule } from 'bc-deeplib';
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
    if (entry.actName === undefined) {
      mainResponses.splice(mainResponses.indexOf(entry));
    }

    if (typeof entry.groupName === 'string') {
      entry.groupName = [entry.groupName];
    }

    if (entry.responses === undefined) {
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

  oldResponsesModel.forEach((entry) => {
    const group = AssetGroup.find((a) => a.Name === entry.groupName[1]);
    const activity = AssetAllActivities(Player.AssetFamily).find((act) => act.Name === entry.actName);
    const entryName = activity && group ? GuiResponses.getActivityLabel(activity, group) : entry.actName;
    const newEntry = {
      name: entryName,
      guid: Guid.newGuid().toString(),
      priority: 0,
      isEnabled: true,
      response: [],
      trigger: [],
    } as ResponsesEntryModel;

    newEntry.trigger.push({
      type: 'activity',
      direction: entry.selfTrigger ? 'both' : 'incoming',
      groupName: entry.groupName,
      activityName: [entry.actName],
    });

    const getResponseType = (response: string): [EntryResponseType, ResponseRpMode, string] => {
      const prefixMap: Record<string, [EntryResponseType, ResponseRpMode]> = {
        '**': ['emote', 'global'],
        '@@': ['action', 'global'],
        '*': ['emote', 'personal'],
        '@': ['action', 'personal'],
      };

      for (const prefix in prefixMap) {
        if (response.startsWith(prefix)) {
          return [...prefixMap[prefix], response.slice(prefix.length)];
        }
      }

      return ['speech', 'personal', response];
    };

    entry.responses.forEach(response => {
      const [type, mode, content] = getResponseType(response);

      if (type === 'speech')
        newEntry.response.push({
          type,
          content: [content],
        });

      if (type === 'emote' || type === 'action')
        newEntry.response.push({
          type,
          content: [content],
          mode: mode,
        });
    });

    newResponsesModel.push(newEntry);
  });

  data.ResponsesModule = newResponsesModel;
}
