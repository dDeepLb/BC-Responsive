import { BaseModule } from "../Base/BaseModule";
import { Subscreen } from "../Base/SettingDefinitions";
import { GlobalSettingsModel } from "../Models/Base";
import { GuiGlobal } from "../Screens/Global";

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
      doAddMoansOnHighArousal: true,
      doPreventMessageIfBcxBlock: false,
      doMessageInterruption: true
    };
  }

  Load(): void {}

  Run(): void {}
}
