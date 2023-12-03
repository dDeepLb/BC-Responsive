import { BaseModule } from "../Base/BaseModule";
import { PlayerStorage } from "../Utilities/Data";
import { ModVersion } from "../Utilities/Definition";
import { BCR_NEW_VERSION, sendLocalSmart } from "../Utilities/Messages";
import { HookPriority, ModuleCategory, hookFunction } from "../Utilities/SDK";

export class VersionModule extends BaseModule {
  static isItNewVersion: boolean = false;

  Load(): void {
    hookFunction(
      "ChatRoomSync",
      HookPriority.Observe,
      (args, next) => {
        next(args);
        VersionModule.sendNewVersionMessage();
      },
      ModuleCategory.Global
    );
  }

  Run(): void {}

  static isNewVersion(current: string | undefined, candidate: string) {
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

  static sendNewVersionMessage() {
    if (PlayerStorage().GlobalModule.doShowNewVersionMessage && VersionModule.isItNewVersion) {
      sendLocalSmart("ResponsiveNewVersion", BCR_NEW_VERSION);
    }
  }

  static saveVersion() {
    if (PlayerStorage()) {
      PlayerStorage().Version = ModVersion;
    }
  }

  static loadVersion() {
    if (PlayerStorage()?.Version) {
      return PlayerStorage().Version;
    }
    return;
  }

  static checkIfNewVersion() {
    let LoadedVersion = VersionModule.loadVersion();
    if (VersionModule.isNewVersion(LoadedVersion, ModVersion)) {
      VersionModule.isItNewVersion = true;
    }
    VersionModule.saveVersion();
  }
}
