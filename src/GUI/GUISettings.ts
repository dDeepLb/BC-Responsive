import { DataManager } from "../Data";
import { Localization } from "../Lang";
import { BExit, getXPos, getYPos, Title } from "./GUIMisc/GUIDefinition";
import { setSubscreen } from "./GUIMisc/GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUIMisc/GUISubscreen";

export class GUISettings extends GUISubscreen {

    Run(): void {
        const modSettings = DataManager.instance.data.modSettings;
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        //Title Text
        DrawText(Localization.GetText("settings_title"), Title.X, Title.Y, "Black", "Gray");
        DrawCheckbox(Title.X, getYPos(0), 64, 64, Localization.GetText("doShowNewVersion"), modSettings.doShowNewVersion);
        DrawCheckbox(Title.X, getYPos(1), 64, 64, Localization.GetText("isLeaveMessageEnabled"), modSettings.isLeaveMessageEnabled);
        DrawCheckbox(Title.X, getYPos(2), 64, 64, Localization.GetText("isSharkBiteEnabled"), modSettings.isSharkBiteEnabled);
        DrawCheckbox(Title.X, getYPos(3), 64, 64, Localization.GetText("doInterceptMessage"), modSettings.doInterceptMessage);
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
    }

    Unload(): void {
    }
}