
import { BaseModule, Subscreen } from 'bc-deeplib';
import { ProfilesSettingsModel } from '../Models/Profiles';
import { GuiProfiles } from '../Screens/Profiles';

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

  load(): void { }

  run(): void { }
}
