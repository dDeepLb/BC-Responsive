import { BaseModule } from "../Base/BaseModule";
import { Subscreen } from "../Base/SettingDefinitions";
import { initCharTalk } from "../Utilities/CharTalk";
import { GlobalSettingsModel } from "../Models/Base";
import { GuiGlobal } from "../Screens/Global";
import { leaveHandle, orgasmHandle } from "../Utilities/Handlers";
import { BCR_NEW_VERSION, sendLocalSmart } from "../Utilities/Messages";
import { HookPriority, ModuleCategory, hookFunction } from "../Utilities/SDK";
import { ModVersion } from "../Utilities/Definition";

export class GlobalModule extends BaseModule {
  static isItNewVersion: boolean = false;

  static isOrgasm_CT: boolean = false;
  static doAnimate_CT: boolean = true;

  get settingsScreen(): Subscreen | null {
    return GuiGlobal;
  }

  get settings(): GlobalSettingsModel {
    return super.settings as GlobalSettingsModel;
  }

  get defaultSettings() {
    return <GlobalSettingsModel>{
      ResponsiveEnabled: true,
      responsesEnabled: true,
      CharTalkEnabled: true,
      doShowNewVersionMessage: true,
      doLeaveMessage: true,
      doMessageInterruption: true
    };
  }

  Load(): void {
    //Leave Message
    hookFunction(
      "ServerAccountBeep",
      HookPriority.AddBehavior,
      (args, next) => {
        let data = args[0];
        leaveHandle(data);
        next(args);
      },
      ModuleCategory.Global
    );

    //Orgasm Handling
    hookFunction(
      "ActivityOrgasmStart",
      HookPriority.Observe,
      (args, next) => {
        GlobalModule.isOrgasm_CT = true;
        orgasmHandle(args[0] as Character);
        next(args);
      },
      ModuleCategory.Global
    );

    hookFunction(
      "ChatRoomSync",
      HookPriority.Observe,
      (args, next) => {
        next(args);
        GlobalModule.sendNewVersionMessage();
      },
      ModuleCategory.Global
    );

    //Character Talk
    initCharTalk();
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
    if (Player.BCResponsive.GlobalModule.doShowNewVersionMessage && GlobalModule.isItNewVersion) {
      sendLocalSmart("ResponsiveNewVersion", BCR_NEW_VERSION);
    }
  }

  static saveVersion() {
    if (Player.BCResponsive) {
      Player.BCResponsive.Version = ModVersion;
    }
  }

  static loadVersion() {
    if (Player?.BCResponsive?.Version) {
      return Player.BCResponsive.Version;
    }
    return;
  }

  static checkIfNewVersion() {
    let LoadedVersion = GlobalModule.loadVersion();
    if (GlobalModule.isNewVersion(LoadedVersion, ModVersion)) {
      GlobalModule.isItNewVersion = true;
    }
    GlobalModule.saveVersion();
  }
}
