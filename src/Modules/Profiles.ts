import { BaseModule } from "../Base/BaseModule";
import { Subscreen } from "../Base/SettingDefinitions";
import { ProfilesSettingsModel } from "../Models/Profiles";
import { GuiProfiles } from "../Screens/Profiles";

export class ProfilesModule extends BaseModule {
  get settings(): ProfilesSettingsModel {
    return super.settings as ProfilesSettingsModel;
  }

  get settingsScreen(): Subscreen | null {
    return GuiProfiles;
  }

  get defaultSettings() {
    return <ProfilesSettingsModel>{};
  }

  Load(): void {}

  Run(): void {}
}
