import { DataManager } from "../Data";
import { sendNewVersion, setFalseVersionShown } from "../Version";
import { BExit, getXPos, getYPos } from "./GUIMisc/GUIDefinition";
import { setSubscreen } from "./GUIMisc/GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUIMisc/GUISubscreen";

export class GUIDebug extends GUISubscreen {
    Run(): void {
        DrawButton( BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png" );
        DrawButton( getXPos(0), getYPos(0), 80, 80, "", "white", undefined, "Profiles Check" )
        DrawButton( getXPos(1), getYPos(0), 80, 80, "", "white", undefined, "sendNewVersion()" )
        DrawButton( getXPos(2), getYPos(0), 80, 80, "", "white", undefined, "changeVersion" )
        DrawButton( getXPos(0), getYPos(1), 80, 80, "", "white", undefined, "CheckNewData()" )
        DrawButton( getXPos(1), getYPos(1), 80, 80, "", "white", undefined, " " )
        DrawButton( getXPos(2), getYPos(1), 80, 80, "", "white", undefined, " " )
    }
    Click(): void {
        if (MouseIn(getXPos(0), getYPos(0), 80, 80)) {
        }
        if (MouseIn(getXPos(1), getYPos(0), 80, 80)) {
            sendNewVersion();
        }
        if (MouseIn(getXPos(2), getYPos(0), 80, 80)) {
            window.BCR_Version = '0.4.5'
        }
        if (MouseIn(getXPos(0), getYPos(1), 80, 80)) {
            DataManager.instance.CheckNewThingies();
        }
        if (MouseIn(getXPos(1), getYPos(1), 80, 80)) {
            setFalseVersionShown();
        }
        if (MouseIn(getXPos(2), getYPos(1), 80, 80)) {
            DataManager.instance.setInitFromNoDataToFalse();
        }

        if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height)) {
            setSubscreen(new GUIMainMenu());
        }
    }
    Unload(): void {
        
    }
}