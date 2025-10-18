import { modStorage } from 'bc-deeplib/deeplib';
import { GlobalSettingsModel } from '../models/base';
import { ProfileEntryModel } from '../models/profiles';
import { ResponsesSettingsModel } from '../models/responses';

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
