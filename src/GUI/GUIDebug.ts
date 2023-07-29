import { BExit, getXPos, getYPos } from "./GUI";
import { setSubscreen } from "./GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUISubscreen";

export class GUIDebug extends GUISubscreen {
    Run(): void {
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        DrawButton(getYPos(0), getXPos(0), 80, 80, "", "white", undefined, "Profiles Check")
        DrawButton(getYPos(0), getXPos(1), 80, 80, "", "white", undefined, " ")
    }
    Click(): void {
        if (MouseIn(getYPos(0), getXPos(0), 80, 80)) {
            if (Player && Player.OnlineSettings) {
                let encodedData = (Player.OnlineSettings as ModSetting).BCRProfile1;
                const decodedData = JSON.parse(LZString.decompressFromBase64(encodedData));
                console.debug(decodedData);
            }
        }
        if (MouseIn(getYPos(1), getXPos(1), 80, 80)) {
        }
        if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height)) {
            setSubscreen(new GUIMainMenu());
        }
    }
    Unload(): void {
        
    }
}