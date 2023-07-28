import { DataManager } from "../Data";
import { BExit, getXPos, getYPos } from "./GUI";
import { setSubscreen } from "./GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUIResponses } from "./GUIResponses";
import { GUISubscreen } from "./GUISubscreen";

export class GUIDebug extends GUISubscreen {
    Run(): void {
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        DrawButton(getYPos(0), getXPos(0), 80, 80, "", "white", undefined, "Input Check")
        DrawButton(getYPos(0), getXPos(1), 80, 80, "", "white", undefined, "Data Check")
    }
    Click(): void {
        if (MouseIn(getYPos(0), getXPos(0), 80, 80)) {
            
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