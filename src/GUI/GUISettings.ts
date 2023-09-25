import { DataManager } from "../Utilities/Data";
import { Localization } from "../Utilities/Lang";
import { BExit, CBEnable, getYPos, Title } from "./GUIMisc/GUIDefinition";
import { setSubscreen } from "./GUIMisc/GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUIMisc/GUISubscreen";

export class GUISettings extends GUISubscreen {
  Run(): void {
    const data = DataManager.instance.data;
    const modSettings = DataManager.instance.data.modSettings;
    DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
    //Title Text
    DrawText(Localization.GetText("title_settings"), Title.X, Title.Y, "Black", "Gray");

    DrawCheckbox(CBEnable.Left, CBEnable.Top, CBEnable.Width, CBEnable.Height, Localization.GetText("responsive_enable"), data.settings.enable);
    DrawCheckbox(Title.X, getYPos(1), 64, 64, Localization.GetText("setting_doEnableCharTalk"), modSettings.doEnableCharTalk);
    DrawCheckbox(Title.X, getYPos(2), 64, 64, Localization.GetText("setting_doShowNewVersion"), modSettings.doShowNewVersion);
    DrawCheckbox(Title.X, getYPos(3), 64, 64, Localization.GetText("setting_isLeaveMessageEnabled"), modSettings.isLeaveMessageEnabled);
    DrawCheckbox(Title.X, getYPos(4), 64, 64, Localization.GetText("setting_isSharkBiteEnabled"), modSettings.isSharkBiteEnabled);
    DrawCheckbox(Title.X, getYPos(5), 64, 64, Localization.GetText("setting_doInterceptMessage"), modSettings.doInterceptMessage);
  }

  Click(): void {
    const data = DataManager.instance.data;
    const modSettings = DataManager.instance.data.modSettings;
    if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height)) {
      DataManager.instance.ServerStoreData();
      setSubscreen(new GUIMainMenu());
    }
    if (MouseIn(CBEnable.Left, CBEnable.Top, CBEnable.Width, CBEnable.Height)) data.settings.enable = !data.settings.enable;
    if (MouseIn(Title.X, getYPos(1), 64, 64)) modSettings.doEnableCharTalk = !modSettings.doEnableCharTalk;
    if (MouseIn(Title.X, getYPos(2), 64, 64)) modSettings.doShowNewVersion = !modSettings.doShowNewVersion;
    if (MouseIn(Title.X, getYPos(3), 64, 64)) modSettings.isLeaveMessageEnabled = !modSettings.isLeaveMessageEnabled;
    if (MouseIn(Title.X, getYPos(4), 64, 64)) modSettings.isSharkBiteEnabled = !modSettings.isSharkBiteEnabled;
    if (MouseIn(Title.X, getYPos(5), 64, 64)) modSettings.doInterceptMessage = !modSettings.doInterceptMessage;
  }

  Unload(): void {}
}
