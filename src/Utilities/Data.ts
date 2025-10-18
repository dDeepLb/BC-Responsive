import { modStorage } from 'bc-deeplib/deeplib';
import { GlobalSettingsModel } from '../Models/Base';
import { ProfileEntryModel } from '../Models/Profiles';
import { ResponsesSettingsModel } from '../Models/Responses';

export function dataErase(doResetSettings: boolean, doResetResponses: boolean, doResetProfiles: boolean) {
  if (doResetSettings) {
    modStorage.playerStorage.GlobalModule = <GlobalSettingsModel>{};
  }

  if (doResetResponses) {
    modStorage.playerStorage.ResponsesModule = <ResponsesSettingsModel>{};
  }

  if (doResetProfiles) {
    modStorage.playerStorage.ProfilesModule = <ProfileEntryModel[]>{};
  }
  modStorage.save();
}

export function dataResetForManual() {
  modStorage.playerStorage.ResponsesModule = <ResponsesSettingsModel><unknown>{
    mainResponses: [],
    extraResponses: {
      low: [],
      light: [],
      medium: [],
      hot: [],
      orgasm: []
    }
  };
  modStorage.save();
}
