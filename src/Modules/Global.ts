import { BaseModule } from "../Base/BaseModule";
import { Subscreen } from "../Base/SettingDefinitions";
import { GlobalSettingsModel } from "../Models/Base";
import { GuiGlobal } from "../Screens/Global";
import { leaveHandle, orgasmHandle } from "../Utilities/Handlers";
import { BCR_NEW_VERSION, sendLocalSmart } from "../Utilities/Messages";
import { HookPriority, ModuleCategory, hookFunction } from "../Utilities/SDK";
import { ModVersion } from "../Utilities/Definition";

export class GlobalModule extends BaseModule {
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

  Load(): void {}

  Run(): void {}
}
