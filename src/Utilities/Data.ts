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
    Player[ModName] = JSON.parse(LZString.decompressFromBase64(ExtensionStorage())) as SettingsModel;
  } else if (Player.OnlineSettings["BCResponsive"]) {
    Player[ModName] = JSON.parse(LZString.decompressFromBase64(Player.OnlineSettings["BCResponsive"]));

    delete Player.OnlineSettings["BCResponsive"];
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
  Player[ModName].ResponsesModule = <ResponsesSettingsModel>{
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
  delete Player.OnlineSettings?.["BCResponsive"]?.Profiles;
  delete Player.OnlineSettings?.["BCResponsive"]?.data;
  delete Player.OnlineSettings?.["BCResponsive"]?.SavedVersion;

  delete Player["BCResponsive"]?.Profiles;
  delete Player["BCResponsive"]?.data;
  delete Player["BCResponsive"]?.SavedVersion;
}
