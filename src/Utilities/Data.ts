import { GlobalSettingsModel } from "../Models/Base";
import { ProfileEntryModel } from "../Models/Profiles";
import { ResponsesSettingsModel } from "../Models/Responses";
import { SettingsModel } from "../Models/Settings";
import { ModName } from "./Definition";
import { _String } from "./String";

export const PlayerStorage = () => Player[ModName];
export const ExtensionStorage = () => Player.ExtensionSettings[ModName];

export function dataTake() {
  if (ExtensionStorage()) {
    Player[ModName] = JSON.parse(LZString.decompressFromBase64(ExtensionStorage()) || "") as SettingsModel;
  } else if ((Player.OnlineSettings as any)["BCResponsive"]) {
    /*
     * Unfortunatelly, if data is object, it means, that data was saved in ancient version,
     * when dinosaurs and Jedis were living on the Earth. Or just something went wrong...
     */
    if (typeof (Player.OnlineSettings as any)["BCResponsive"] == "object") {
      return (Player[ModName] = <SettingsModel>{});
    }
    Player[ModName] = JSON.parse(LZString.decompressFromBase64((Player.OnlineSettings as any)["BCResponsive"]) || "");

    delete (Player.OnlineSettings as any)["BCResponsive"];
    window.ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
  } else {
    Player[ModName] = <SettingsModel>{};
  }
}

export function dataStore() {
  if (!ExtensionStorage()) Player.ExtensionSettings[ModName] = "";
  let Data: SettingsModel = {
    Version: PlayerStorage().Version,
    GlobalModule: PlayerStorage().GlobalModule,
    ResponsesModule: PlayerStorage().ResponsesModule,
    ProfilesModule: PlayerStorage().ProfilesModule
  };

  Player.ExtensionSettings[ModName] = _String.encode(Data);
  ServerPlayerExtensionSettingsSync(ModName);
}

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
  Player[ModName].ResponsesModule = {
    ResponsiveEnabled: false,
    mainResponses: [],
    extraResponses: {
      low: [],
      light: [],
      medium: [],
      hot: [],
      orgasm: []
    }
  } satisfies ResponsesSettingsModel;
  dataStore();
}

export function dataFix() {
  let data = Player[ModName];
  let mainResponses = data.ResponsesModule.mainResponses;

  mainResponses.forEach((entry) => {
    if (entry.actName == undefined) {
      mainResponses.splice(mainResponses.indexOf(entry));
    }

    if (typeof entry.groupName == "string") {
      entry.groupName = [entry.groupName];
    }

    if (entry.responses == undefined) {
      entry.responses = [""];
    }
  });
}

export function clearOldData() {
  delete (Player.OnlineSettings as any)["BCResponsive"]?.Profiles;
  delete (Player.OnlineSettings as any)["BCResponsive"]?.data;
  delete (Player.OnlineSettings as any)["BCResponsive"]?.SavedVersion;

  delete (Player as any)["BCResponsive"]?.Profiles;
  delete (Player as any)["BCResponsive"]?.data;
  delete (Player as any)["BCResponsive"]?.SavedVersion;
}
