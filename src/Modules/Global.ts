
import { BaseModule, Subscreen } from 'bc-deeplib';
import { GlobalSettingsModel } from '../Models/Base';
import { GuiGlobal } from '../Screens/Global';

export class GlobalModule extends BaseModule {
  get settingsScreen(): Subscreen | null {
    return GuiGlobal;
  }

  get settings(): GlobalSettingsModel {
    return super.settings as GlobalSettingsModel;
  }

  get defaultSettings() {
    return <GlobalSettingsModel>{
      modEnabled: true,
      responsesEnabled: true,
      charTalkEnabled: true,
      doLeaveMessage: true,
      //doAddMoansOnHighArousal: true,
      doPreventMessageIfBcxBlock: false,
      doMessageInterruption: true,
      doShowNewVersionMessage: true
    };
  }

  load(): void { }

  run(): void { }
}
