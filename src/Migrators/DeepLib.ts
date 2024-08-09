import { BaseMigrator, getModule } from 'bc-deeplib';
import { GlobalModule } from '../Modules/Global';
import { ModName } from '../Utilities/Definition';

export class DeepLibMigrator extends BaseMigrator {
  get MigrationVersion(): string {
    return '0.7.0';
  }

  Migrate(): boolean {
    //@ts-expect-error: Deprecated property
    delete Player.OnlineSettings?.['BCResponsive']?.Profiles;
    //@ts-expect-error: Deprecated property
    delete Player.OnlineSettings?.['BCResponsive']?.data;
    //@ts-expect-error: Deprecated property
    delete Player.OnlineSettings?.['BCResponsive']?.SavedVersion;

    const data = Player[ModName];
    const mainResponses = data.ResponsesModule.mainResponses;

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

    const globalModuleDefaults = getModule<GlobalModule>('GlobalModule').defaultSettings;

    data.GlobalModule.charTalkEnabled = (data as any).GlobalModule?.CharTalkEnabled ?? globalModuleDefaults.charTalkEnabled;
    delete (data as any).GlobalModule.CharTalkEnabled;
    data.GlobalModule.modEnabled = (data as any).GlobalModule?.ResponsiveEnabled ?? globalModuleDefaults.modEnabled;
    delete (data as any).GlobalModule.ResponsiveEnabled;

    return true;
  }
}
