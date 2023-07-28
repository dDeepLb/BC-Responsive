import { DataManager } from "../Data";
import { DebugMode, ModVersion } from "../Definition";
import { Localization } from "../Lang";
import { BExit, Title, CBEnable, getYPos } from "./GUI";
import { GUIDebug } from "./GUIDebug";
import { setSubscreen } from "./GUIHelper";
import { GUIProfiles } from "./GUIProfiles";
import { GUIResponses } from "./GUIResponses";
import { GUISubscreen } from "./GUISubscreen"

const data = DataManager.instance.data;

export class GUIMainMenu extends GUISubscreen {
    Run(): void {
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        if (DebugMode) {
            DrawButton(Title.X, 830, 80, 80, "", "White", undefined);
            DrawImageResize("Icons/Visibility.png", 150 + 10, 840, 60, 60);
        }
        
        DrawText(Localization.GetText("mainmenu_title") + ` v${ModVersion}`, Title.X, Title.Y, "Black", "Gray");

        DrawCheckbox(CBEnable.Left, CBEnable.Top, CBEnable.Width, CBEnable.Height, Localization.GetText("responsive_enable"), data.settings.enable);

        DrawButton(1500, 830, 400, 80, "", "White");
		DrawImageResize("Icons/Introduction.png", 1610, 840, 60, 60);
	    DrawTextFit("Wiki", 1680, 870, 320, "Black");

        DrawButton(Title.X, getYPos(1), 400, 80, "", "White");
		DrawImageResize("Icons/Chat.png", Title.X + 10, getYPos(1) + 10, 60, 60);
	    DrawTextFit(Localization.GetText("responses_button"), Title.X + 80, getYPos(1) + 40, 320, "Black");

        DrawButton(Title.X, getYPos(2), 400, 80, "", "White");
		DrawImageResize("Icons/Title.png", Title.X + 10, getYPos(2) + 10, 60, 60);
	    DrawTextFit(Localization.GetText("profiles_button"), Title.X + 80, getYPos(2) + 40, 320, "Black");
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
        if (MouseIn(Title.X, getYPos(1), 400, 80)) {
            setSubscreen(new GUIResponses());
        }
        if (MouseIn(Title.X, getYPos(2), 400, 80)) {
            setSubscreen(new GUIProfiles());
        }
        if (MouseIn(Title.X, 830, 80, 80)) {
            setSubscreen(new GUIDebug());
        }
    }

    Unload(): void {
    }
}