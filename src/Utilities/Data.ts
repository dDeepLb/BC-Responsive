import { SettingsModel } from "../Settings/Models/Settings";

export function DataStore() {
  if (!Player.OnlineSettings)
    Player.OnlineSettings = <PlayerOnlineSettings>{};
  Player.OnlineSettings.BCResponsive = Player.BCResponsive;
  window.ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
}

export function DataTake() {
  //Player.BCResponsive = JSON.parse(LZString.decompressFromUTF16(Player.OnlineSettings?.BCResponsive)) || <SettingsModel>{};
  Player.BCResponsive = Player.OnlineSettings?.BCResponsive || <SettingsModel>{};
}

export function EncodeDataStr() {
  let data = {
    Global: Player.BCResponsive.GlobalModule,
    Responses: Player.BCResponsive.ResponsesModule,
  }
  return LZString.compressToUTF16(JSON.stringify(data));
}

export function DecodeDataStr(str: string | undefined) {
  let d = LZString.decompressFromBase64(str);
  let data = {};

  try {
    let decoded = JSON.parse(d);
    data = decoded
  } catch { }
  if (data)
    return data;
}

export function ServerStoreData() {
  let data = {
    Global: Player.BCResponsive.GlobalModule,
    Responses: Player.BCResponsive.ResponsesModule,
  }
  Player.OnlineSettings.BCResponsive.data = EncodeDataStr();
  if (ServerAccountUpdate) ServerAccountUpdate.QueueData({ BCResponsive: Player.OnlineSettings.BCResponsive });
}

export function ServerTakeData() {
  let rawData = Player.OnlineSettings.BCResponsive;
  rawData = CheckOldData(rawData);
  return DecodeDataStr(rawData);
}

export function CheckOldData(data: string | undefined): string {
  //Delete old profile instances if they been there
  delete Player.OnlineSettings.BCRProfile1;
  delete Player.OnlineSettings.BCRProfile2;
  delete Player.OnlineSettings.BCRProfile3;
  delete Player.OnlineSettings.BCRProfiles;
  ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
  if (data === undefined) {
    let oldData = Player.OnlineSettings as any as {
      BCMoanerReloaded?: string;
    };
    let rawData = oldData.BCMoanerReloaded;
    if (rawData !== undefined) {
      delete oldData.BCMoanerReloaded;
      return rawData;
    }
  }

  if (data === undefined) {
    let oldData = Player.OnlineSettings as any as {
      BCResponsive?: string;
    };
    let rawData = oldData.BCResponsive;
    if (typeof rawData === "string") {
      delete oldData.BCResponsive;
      return rawData;
    }
  }
  return data as string;
}
