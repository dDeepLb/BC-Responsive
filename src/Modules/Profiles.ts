
import { BaseModule } from 'bc-deeplib';
import { ProfilesSettingsModel } from '../Models/Profiles';
import { GuiProfiles } from '../Screens/Profiles';
import { Subscreen } from 'bc-deeplib';

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

  Load(): void { }

  Run(): void { }
}
