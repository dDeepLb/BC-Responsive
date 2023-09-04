import { DataManager } from "../Data";
import { Localization } from "../Utilities/Lang";
import { BExit, getXPos, getYPos, Title } from "./GUIMisc/GUIDefinition";
import { setSubscreen } from "./GUIMisc/GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUIMisc/GUISubscreen";

export class GUISettings extends GUISubscreen {

    Run(): void {
        const modSettings = DataManager.instance.data.modSettings;
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        //Title Text
        DrawText(Localization.GetText("title_settings"), Title.X, Title.Y, "Black", "Gray");
        DrawCheckbox(Title.X, getYPos(0), 64, 64, Localization.GetText("setting_doShowNewVersion"), modSettings.doShowNewVersion);
        DrawCheckbox(Title.X, getYPos(1), 64, 64, Localization.GetText("setting_isLeaveMessageEnabled"), modSettings.isLeaveMessageEnabled);
        DrawCheckbox(Title.X, getYPos(2), 64, 64, Localization.GetText("setting_isSharkBiteEnabled"), modSettings.isSharkBiteEnabled);
        DrawCheckbox(Title.X, getYPos(3), 64, 64, Localization.GetText("setting_doInterceptMessage"), modSettings.doInterceptMessage);
        DrawCheckbox(Title.X, getYPos(4), 64, 64, Localization.GetText("setting_doEnableCharTalk"), modSettings.doEnableCharTalk);
    }

    Click(): void {
        const modSettings = DataManager.instance.data.modSettings;
        if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height)) {
            DataManager.instance.ServerStoreData();
            setSubscreen(new GUIMainMenu());
        }
        if (MouseIn(Title.X, getYPos(0), 64, 64)) modSettings.doShowNewVersion = !modSettings.doShowNewVersion;
        if (MouseIn(Title.X, getYPos(1), 64, 64)) modSettings.isLeaveMessageEnabled = !modSettings.isLeaveMessageEnabled;
        if (MouseIn(Title.X, getYPos(2), 64, 64)) modSettings.isSharkBiteEnabled = !modSettings.isSharkBiteEnabled;
        if (MouseIn(Title.X, getYPos(3), 64, 64)) modSettings.doInterceptMessage = !modSettings.doInterceptMessage;
        if (MouseIn(Title.X, getYPos(4), 64, 64)) modSettings.doEnableCharTalk = !modSettings.doEnableCharTalk;
    }

    Unload(): void {
    }
}