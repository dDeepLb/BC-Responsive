import { ExtensionStorage as ES, PlayerStorage as PS, dataStore } from 'bc-deeplib';
import { GlobalSettingsModel } from '../Models/Base';
import { ProfileEntryModel } from '../Models/Profiles';
import { ResponsesSettingsModel } from '../Models/Responses';
import { SettingsModel } from '../Models/Settings';
import { ModName } from './Definition';

export const PlayerStorage = () => PS() as SettingsModel;
export const ExtensionStorage = () => ES();

export function dataErase(doResetSettings: boolean, doResetResponses: boolean, doResetProfiles: boolean) {
  if (doResetSettings) {
    Player[ModName].GlobalModule = <GlobalSettingsModel>{};
  }

  if (doResetResponses) {
    Player[ModName].ResponsesModule = <ResponsesSettingsModel>{};
  }

  if (doResetProfiles) {
    Player[ModName].ProfilesModule = <ProfileEntryModel[]>{};
  }
  dataStore();
}

export function dataResetForManual() {
  Player[ModName].ResponsesModule = <ResponsesSettingsModel><unknown>{
    mainResponses: [],
    extraResponses: {
      low: [],
      light: [],
      medium: [],
      hot: [],
      orgasm: []
    }
  };
  dataStore();
}
