import { DataManager } from "../Data";
import { Localization } from "../Lang";
import { BExit, getYPos, Title } from "./GUI";
import { setSubscreen } from "./GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUIResponses } from "./GUIResponses";
import { GUISubscreen } from "./GUISubscreen";

export class GUIProfiles extends GUISubscreen {
    Run(): void {
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        //Title Text
        DrawText(Localization.GetText("profiles_title"), Title.X, Title.Y, "Black", "Gray");

        DrawText(Localization.GetText("profile_text") + ' 1:', Title.X, getYPos(2), "Black", "Gray");
        DrawText(Localization.GetText("profile_text") + ' 2:', Title.X, getYPos(3), "Black", "Gray");
        DrawText(Localization.GetText("profile_text") + ' 3:', Title.X, getYPos(4), "Black", "Gray");

        MainCanvas.textAlign = "center";
        //Save Buttons
		DrawButton(Title.X + 250, getYPos(2) - 32, 200, 64, Localization.GetText("profile_save"), "White", undefined, undefined, true);
		DrawButton(Title.X + 250, getYPos(3) - 32, 200, 64, Localization.GetText("profile_save"), "White", undefined, undefined, true);
		DrawButton(Title.X + 250, getYPos(4) - 32, 200, 64, Localization.GetText("profile_save"), "White", undefined, undefined, true);
        //Load Buttons
        DrawButton(Title.X + 500, getYPos(2) - 32, 200, 64, Localization.GetText("profile_load"), "White", undefined, undefined, true);
        DrawButton(Title.X + 500, getYPos(3) - 32, 200, 64, Localization.GetText("profile_load"), "White", undefined, undefined, true);
        DrawButton(Title.X + 500, getYPos(4) - 32, 200, 64, Localization.GetText("profile_load"), "White", undefined, undefined, true);
        MainCanvas.textAlign = "left";
    }

    //Clicks
    Click(): void {
        if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height)) {
            setSubscreen(new GUIMainMenu());
        }

        if (MouseIn(Title.X + 250, getYPos(2) - 32, 200, 64)) {
            DataManager.instance.SaveProfileData("profile1")
        }
        if (MouseIn(Title.X + 250, getYPos(3) - 32, 200, 64)) {
            DataManager.instance.SaveProfileData("profile2")
        }
        if (MouseIn(Title.X + 250, getYPos(4) - 32, 200, 64)) {
            DataManager.instance.SaveProfileData("profile3")
        }
        if (MouseIn(Title.X + 500, getYPos(2) - 32, 200, 64)) {
            DataManager.instance.LoadProfileData("profile1")
        }
        if (MouseIn(Title.X + 500, getYPos(3) - 32, 200, 64)) {
            DataManager.instance.LoadProfileData("profile2")
        }
        if (MouseIn(Title.X + 500, getYPos(4) - 32, 200, 64)) {
            DataManager.instance.LoadProfileData("profile3")
        }
    }
    Unload(): void {
    }
}
