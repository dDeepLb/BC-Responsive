import { DataManager } from "../Data";
import { Localization } from "../Lang";
import { BExit, Title } from "./GUIMisc/GUIDefinition";
import { setSubscreen } from "./GUIMisc/GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUIMisc/GUISubscreen";

    let PreferenceText = "";
    let profileNames = ["", "", ""];

    function getYPos(ix: number) {
        return 200 + (100 * (ix + 1));
    }

export class GUIProfiles extends GUISubscreen {
    Load(): void {
        for (let i = 1; i < 4; i++) {
            if ( Player && Player.OnlineSettings ) {
                if ( Player.OnlineSettings.BCResponsive && !Player.OnlineSettings.BCResponsive.Profiles[i] ) {
                    Player.OnlineSettings.BCResponsive.Profiles[i] = { data: "", name: "" };
                }
                if ( Player.OnlineSettings.BCResponsive && Player.OnlineSettings.BCResponsive.Profiles[i]) {
                    profileNames[i - 1] = Player.OnlineSettings.BCResponsive.Profiles[i].name;
                }
            }
        }
    }
    Run(): void {
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        //Title Text
        DrawText(Localization.GetText("profiles_title"), Title.X, Title.Y, "Black", "Gray");

        for (let i = 1; i < 4; i++) {
            let profileName = profileNames[i - 1];
            if ( profileName === "" || profileName === undefined ) DrawText(Localization.GetText("profile_text") + ` ${i}`, Title.X, getYPos(i), "Black", "Gray");
            if ( profileName !== "" ) DrawText(profileName, Title.X, getYPos(i), "Black", "Gray");
        }

        DrawText(PreferenceText, Title.X + 250, Title.Y, "Black", "Gray");

        let prevAlign = MainCanvas.textAlign;
        MainCanvas.textAlign = "center";
        //Save Buttons
        for (let i = 1; i < 4; i++) {
		DrawButton(Title.X + 250, getYPos(i) - 32, 200, 64, Localization.GetText("profile_save"), "White", undefined, undefined, true);
        }
        //Load Buttons
        for (let i = 1; i < 4; i++) {
        DrawButton(Title.X + 500, getYPos(i) - 32, 200, 64, Localization.GetText("profile_load"), "White", undefined, undefined, true);
        }
        //Delete Buttons
        for (let i = 1; i < 4; i++) {
            DrawButton(Title.X + 750, getYPos(i) - 32, 200, 64, Localization.GetText("profile_delete"), "IndianRed", undefined, undefined, true);
            }
        MainCanvas.textAlign = prevAlign;
    }

    //Clicks
    Click(): void {
        if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height)) {
            setSubscreen(new GUIMainMenu());
        }
        //Saving
        for (let i = 1; i < 4; i++) {
            if (MouseIn(Title.X + 250, getYPos(i) - 32, 200, 64)) {
                let newProfName = prompt("Please, enter profile name.");
                if ( newProfName === "" ) {
                    DataManager.instance.SaveProfile(i, "")
                    PreferenceText = "Profile " + i + " has been saved!"
                }
                if ( newProfName !== null && newProfName !== "" ) {
                    DataManager.instance.SaveProfile(i, newProfName)
                    profileNames[ i - 1 ] = newProfName;
                    PreferenceText = `Profile "` + newProfName + `" has been saved!`
                }
                return;
            }
        }
        //Loading
        for (let i = 1; i < 4; i++) {
            let profileName = profileNames[i - 1];
            if (MouseIn(Title.X + 500, getYPos(i) - 32, 200, 64)) {
                if ( !DataManager.instance.LoadProfile(i)) PreferenceText = "Profile " + i + " needs to be saved first!"
                if ( profileName === "" || profileName === undefined ) PreferenceText = "Profile " + i + " has been loaded!"
                if ( profileName !== "" && profileName !== undefined ) PreferenceText = `Profile "` +profileName + `" has been loaded!`
                return;
            }
        }
        //Deleting
        for (let i = 1; i < 4; i++) {
            let profileName = profileNames[i - 1];
            if (MouseIn(Title.X + 750, getYPos(i) - 32, 200, 64)) {
                if ( DataManager.instance.DeleteProfile(i) ) {
                    if ( profileName !== "" && profileName !== undefined ) {
                        PreferenceText = `Profile "` + profileName + `" has been deleted!`
                        profileNames[i - 1] = "";
                        return;
                    }
                    if ( profileName === "" && profileName !== undefined ) {
                        PreferenceText = `Profile ` + i + ` has been deleted!`
                        return;
                    }
                }
                if ( !DataManager.instance.DeleteProfile(i)) {
                    PreferenceText = "Profile " + i + " is not saved or already deleted!";
                    return;
                }
                return;
            }
        }
    }
    Unload(): void {
        PreferenceText = ""
    }
}
