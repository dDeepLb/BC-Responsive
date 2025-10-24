import { ReactionType, ReactionRpMode, BehaviorEntryModel, ResponsesSettingsModel } from '_/models/behaviours';
import { GuiResponses } from '_/screens/behaviors';
import { Guid } from 'js-guid';
import { GlobalModule } from '../modules/global';
import { ModName } from '../utilities/definition';
import { BaseMigrator, getModule } from 'bc-deeplib/deeplib';

export class DeepLibMigrator extends BaseMigrator {
  get migrationVersion(): string {
    return '0.7.0';
  }

  migrate(): boolean {
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

  const newResponsesModel = {
    behaviors: {},
  } as ResponsesSettingsModel;
  const oldResponsesModel = (data as any).ResponsesModule['mainResponses'] as OldResponsesEntryModel[];

  oldResponsesModel.forEach((entry) => {
    const guid = Guid.newGuid().toString();
    const newEntry = {
      name: entry.actName,
      guid,
      priority: 0,
      isEnabled: true,
      reaction: [],
      trigger: [],
    } as BehaviorEntryModel;

    newEntry.trigger.push({
      type: 'activity',
      direction: entry.selfTrigger ? 'both' : 'incoming',
      groupName: entry.groupName as AssetGroupItemName[],
      activityName: [entry.actName as ActivityName],
    });

    const getResponseType = (response: string): [ReactionType, ReactionRpMode, string] => {
      const prefixMap: Record<string, [ReactionType, ReactionRpMode]> = {
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
        newEntry.reaction.push({
          type,
          content: [content],
        });
      else if (type === 'emote' || type === 'action')
        newEntry.reaction.push({
          type,
          content: [content],
          mode: mode,
        });
    });

    newResponsesModel.behaviors[guid] = newEntry;
  });

  data.ResponsesModule = newResponsesModel;
}
