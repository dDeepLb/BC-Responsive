
import { BaseModule, Subscreen } from 'bc-deeplib/deeplib';
import { ProfilesSettingsModel } from '../models/profiles';
import { GuiProfiles } from '../screens/profiles';

export class ProfilesModule extends BaseModule {
  get settings(): ProfilesSettingsModel {
    return super.settings as ProfilesSettingsModel;
  }

  set settings(value) {
    super.settings = value;
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
