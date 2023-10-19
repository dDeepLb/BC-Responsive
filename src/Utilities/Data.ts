import { ProfileSaveModel } from "../Settings/Models/Profiles";
import { SettingsModel } from "../Settings/Models/Settings";
import { String } from "./String";

export function DataStore() {
  if (!Player.OnlineSettings)
    Player.OnlineSettings = <PlayerOnlineSettings>{};
  let Data: SettingsModel = {
    "Version": Player.BCResponsive.Version,
    "GlobalModule": Player.BCResponsive.GlobalModule,
    "ResponsesModule": Player.BCResponsive.ResponsesModule,
    "ProfilesModule": Player.BCResponsive.ProfilesModule
  }
  Player.OnlineSettings.BCResponsive = String.Encode(Data);
  window.ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
}

export function DataTake() {
  try {
    // @ts-ignore
    Player.BCResponsive = JSON.parse(LZString.decompressFromBase64(Player.OnlineSettings?.BCResponsive as string) as string);
  } catch {
    Player.BCResponsive = Player.OnlineSettings?.BCResponsive as SettingsModel || <SettingsModel>{};
  }
}
