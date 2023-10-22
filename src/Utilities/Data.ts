import { GlobalSettingsModel } from "../Models/Base";
import { ProfileEntryModel } from "../Models/Profiles";
import { ResponsesSettingsModel } from "../Models/Responses";
import { SettingsModel } from "../Models/Settings";
import { String } from "./String";

export function dataStore() {
  if (!Player.OnlineSettings)
    Player.OnlineSettings = <PlayerOnlineSettings>{};
  let Data: SettingsModel = {
    "Version": Player.BCResponsive.Version,
    "GlobalModule": Player.BCResponsive.GlobalModule,
    "ResponsesModule": Player.BCResponsive.ResponsesModule,
    "ProfilesModule": Player.BCResponsive.ProfilesModule
  }
  Player.OnlineSettings.BCResponsive = String.encode(Data);
  window.ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
}

export function dataTake() {
  try {
    // @ts-ignore
    Player.BCResponsive = JSON.parse(LZString.decompressFromBase64(Player.OnlineSettings?.BCResponsive as string) as string);
  } catch {
    Player.BCResponsive = Player.OnlineSettings?.BCResponsive as SettingsModel || <SettingsModel>{};
  }
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