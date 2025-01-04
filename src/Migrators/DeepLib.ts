import { BaseMigrator, getModule } from 'bc-deeplib';
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

function fixPotentialyFaultyData() {
  const data = Player[ModName];
  //@ts-expect-error: Deprecated property
  const mainResponses = data.ResponsesModule['mainResponses'];

  mainResponses.forEach((entry: any) => {
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
