import { MT } from "../Definition";
import { ResponsiveVersion } from "./SDK";
import { getModule } from "../Modules";
import { BCR_NEW_VERSION } from "./Messages";

//From BCAR
export function isNewVersion(current: string | undefined, candidate: string) {
  if (current !== undefined) {
    const CURRENT_ = current.split("."),
      CANDIDATE_ = candidate.split(".");
    for (let i = 0; i < 3; i++) {
      if (CURRENT_[i] === CANDIDATE_[i]) {
        continue;
      }
      return CANDIDATE_[i] > CURRENT_[i];
    }
  }
  if (current === undefined || current === "" || !current) {
    return true;
  }
  return false;
}

let isItNewVersion = false;
export function sendNewVersion() {
  if (Player.BCResponsive.GlobalModule.doShowNewVersion && isItNewVersion) {
    ChatRoomSendLocal(`${BCR_NEW_VERSION}`.replaceAll("\n", ""), MT.CHANGELOG);
  }
}

export function setIsItNewVersion(bool: boolean) {
  isItNewVersion = bool;
}

export function SaveVersion() {
  if (Player.OnlineSettings.BCResponsive) {
    Player.OnlineSettings.BCResponsive.SavedVersion = ResponsiveVersion;
    ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
  }
}

export function LoadVersion() {
  if (Player && Player.OnlineSettings && Player.OnlineSettings.BCResponsive && Player.OnlineSettings.BCResponsive.SavedVersion) {
    return Player.OnlineSettings.BCResponsive.SavedVersion;
  }
  return;
}
