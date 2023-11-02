import { GlobalSettingsModel } from "../Models/Base";
import { ProfileEntryModel } from "../Models/Profiles";
import { ResponsesSettingsModel } from "../Models/Responses";
import { SettingsModel } from "../Models/Settings";
import { _String } from "./String";

export function dataTake() {
  try {
    // @ts-ignore
    Player.BCResponsive = JSON.parse(LZString.decompressFromBase64(Player.OnlineSettings?.BCResponsive as string) as string);
  } catch {
    Player.BCResponsive = (Player.OnlineSettings?.BCResponsive as SettingsModel) || <SettingsModel>{};
  }
}

export function dataStore() {
  if (!Player.OnlineSettings) Player.OnlineSettings = <PlayerOnlineSettings>{};
  let Data: SettingsModel = {
    Version: Player.BCResponsive.Version,
    GlobalModule: Player.BCResponsive.GlobalModule,
    ResponsesModule: Player.BCResponsive.ResponsesModule,
    ProfilesModule: Player.BCResponsive.ProfilesModule
  };
  //@ts-ignore
  Player.OnlineSettings.BCResponsive = _String.encode(Data);
  window.ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
}

export function dataErase(doResetSettings: boolean, doResetResponses: boolean, doResetProfiles: boolean) {
  if (doResetSettings) {
    Player.BCResponsive.GlobalModule = <GlobalSettingsModel>{};
  }

  if (doResetResponses) {
    Player.BCResponsive.ResponsesModule = <ResponsesSettingsModel>{};
  }

  if (doResetProfiles) {
    Player.BCResponsive.ProfilesModule = <ProfileEntryModel[]>{};
  }
  dataStore();
}

export function dataResetForManual() {
  Player.BCResponsive.ResponsesModule = <ResponsesSettingsModel>{
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

export function clearOldData() {
  delete Player.OnlineSettings?.BCResponsive?.Profiles;
  delete Player.OnlineSettings?.BCResponsive?.data;
  delete Player.OnlineSettings?.BCResponsive?.SavedVersion;

  delete Player.BCResponsive?.Profiles;
  delete Player.BCResponsive?.data;
  delete Player.BCResponsive?.SavedVersion;
}
