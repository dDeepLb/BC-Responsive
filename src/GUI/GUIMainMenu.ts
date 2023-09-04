import { DataManager } from "../Data";
import { DebugMode, ResponsiveVersion } from "../Definition";
import { Localization } from "../Utilities/Lang";
import { BExit, Title, CBEnable, getYPos } from "./GUIMisc/GUIDefinition";
import { GUIDebug } from "./GUIDebug";
import { setSubscreen } from "./GUIMisc/GUIHelper";
import { GUIProfiles } from "./GUIProfiles";
import { GUIReset } from "./GUIReset";
import { GUIResponses } from "./GUIResponses";
import { GUISettings } from "./GUISettings";
import { GUISubscreen } from "./GUIMisc/GUISubscreen"


export class GUIMainMenu extends GUISubscreen {
    Run(): void {
        const data = DataManager.instance.data;
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        if (DebugMode) {
            DrawButton(Title.X, 830, 80, 80, "", "White", undefined);
            DrawImageResize("Icons/Visibility.png", 150 + 10, 840, 60, 60);
        }
        
        DrawText(Localization.GetText("title_mainmenu") + ` v${ResponsiveVersion}`, Title.X, Title.Y, "Black", "Gray");

        DrawCheckbox(CBEnable.Left, CBEnable.Top, CBEnable.Width, CBEnable.Height, Localization.GetText("responsive_enable"), data.settings.enable);

        DrawButton(1500, 730, 400, 80, "", "IndianRed");
		DrawImageResize("Icons/ServiceBell.png", 1510, 740, 60, 60);
	    DrawTextFit("Reset", 1580, 770, 320, "Black");

        DrawButton(1500, 830, 400, 80, "", "White");
		DrawImageResize("Icons/Introduction.png", 1510, 840, 60, 60);
	    DrawTextFit("Wiki", 1580, 870, 320, "Black");

        DrawButton(Title.X, getYPos(1), 400, 80, "", "White");
		DrawImageResize("Icons/Chat.png", Title.X + 10, getYPos(1) + 10, 60, 60);
	    DrawTextFit(Localization.GetText("button_responses"), Title.X + 80, getYPos(1) + 40, 320, "Black");

        DrawButton(Title.X, getYPos(2), 400, 80, "", "White");
		DrawImageResize("Icons/Title.png", Title.X + 10, getYPos(2) + 10, 60, 60);
	    DrawTextFit(Localization.GetText("button_profiles"), Title.X + 80, getYPos(2) + 40, 320, "Black");

        DrawButton(Title.X, getYPos(3), 400, 80, "", "White");
		DrawImageResize("Icons/Preference.png", Title.X + 10, getYPos(3) + 10, 60, 60);
	    DrawTextFit(Localization.GetText("button_settings"), Title.X + 80, getYPos(3) + 40, 320, "Black");
    }

    //Clicks
    Click(): void {
        const data = DataManager.instance.data;
        if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height,)) {
            this.Exit();
        }
        if (MouseIn(CBEnable.Left, CBEnable.Top, CBEnable.Width, CBEnable.Height)) {
            data.settings.enable = !data.settings.enable;
        }
        if (MouseIn(1500, 830, 400, 80)) {
            window.open('https://github.com/dDeepLb/BC-Responsive/wiki/', '_blank')
        }
        if (MouseIn(Title.X, getYPos(1), 400, 80)) setSubscreen(new GUIResponses());
        if (MouseIn(Title.X, getYPos(2), 400, 80)) setSubscreen(new GUIProfiles());
        if (MouseIn(Title.X, getYPos(3), 400, 80)) setSubscreen(new GUISettings());
        if (MouseIn(1500, 730, 400, 80)) setSubscreen(new GUIReset());
        
        if (MouseIn(Title.X, 830, 80, 80) && DebugMode) setSubscreen(new GUIDebug());
    }

    Unload(): void {
    }
}