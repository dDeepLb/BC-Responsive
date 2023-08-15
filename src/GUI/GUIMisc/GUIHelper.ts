import { GUISetting } from "../GUI";
import { GUISubscreen } from "./GUISubscreen";

export function getCurrentSubscreen(): GUISubscreen | null {
    return GUISetting.instance && GUISetting.instance.currentSubscreen;
}

export function setSubscreen(subscreen: GUISubscreen | null): void {
    if (GUISetting.instance) {
        GUISetting.instance.currentSubscreen = subscreen;
    }
}

/* For future maybe...

export class GUI extends GUISubscreen {

    Run(): void {
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        //Title Text
        DrawText(Localization.GetText("_title"), Title.X, Title.Y, "Black", "Gray");
    }

    Click(): void {
        if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height)) {
            setSubscreen(new GUIMainMenu());
        }
    }

    Unload(): void {
    }
}

*/