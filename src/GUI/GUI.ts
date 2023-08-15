import { ModSDKModAPI } from "bondage-club-mod-sdk";
import { DebugMode, HOOK_PRIORITY } from "../Definition";
import { Localization } from "../Lang";
import { setSubscreen } from "./GUIMisc/GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUIMisc/GUISubscreen";

export class GUISetting {
    static instance: GUISetting | null = null;

    private _currentSubscreen: GUISubscreen | null = null;

    get currentSubscreen(): GUISubscreen | null {
        return this._currentSubscreen;
    }

    set currentSubscreen(subscreen: GUISubscreen | null) {
        if (this._currentSubscreen) {
            this._currentSubscreen.Unload();
        }
        this._currentSubscreen = subscreen;
        if (this._currentSubscreen) {
            this._currentSubscreen.Load();
        }
    }

    constructor() {
        GUISetting.instance = this;
    }

    load(mod: ModSDKModAPI<any>) {
        mod.hookFunction("PreferenceRun", HOOK_PRIORITY.OVERRIDE_BEHAVIOR, (args, next) => {
            if (this._currentSubscreen) {
                MainCanvas.textAlign = "left";
                this._currentSubscreen.Run();
                MainCanvas.textAlign = "center";

                if (DebugMode) {
                    if (MouseX > 0 || MouseY > 0) {
                        MainCanvas.save();
                        MainCanvas.lineWidth = 1;
                        MainCanvas.strokeStyle = "red";
                        MainCanvas.beginPath();
                        MainCanvas.moveTo(0, MouseY);
                        MainCanvas.lineTo(2000, MouseY);
                        MainCanvas.moveTo(MouseX, 0);
                        MainCanvas.lineTo(MouseX, 1000);
                        MainCanvas.stroke();
                        MainCanvas.fillStyle = "black";
                        MainCanvas.strokeStyle = "white";
                        MainCanvas.fillRect(0, 950, 250, 50);
                        MainCanvas.strokeRect(0, 950, 250, 50);
                        DrawText(`X: ${MouseX} Y: ${MouseY}`, 125, 975, "white");
                        MainCanvas.restore();
                    }
                }

                return;
            }

            next(args);
            //Responsive Button
            if (PreferenceSubscreen === "")
                DrawButton(1815, 820, 90, 90, "", "White", "Icons/Arousal.png", Localization.GetText("setting_button_popup"));
        });

        mod.hookFunction("PreferenceClick", HOOK_PRIORITY.OVERRIDE_BEHAVIOR, (args, next) => {
            if (this._currentSubscreen) {
                this._currentSubscreen.Click();
                return;
            }

            if (MouseIn(1815, 820, 90, 90) && PreferenceSubscreen === "") {
                setSubscreen(new GUIMainMenu());
            } 
            else {
                return next(args);
            }
        });

        mod.hookFunction("InformationSheetExit", HOOK_PRIORITY.OVERRIDE_BEHAVIOR, (args, next) => {
            if (this._currentSubscreen) {
                this._currentSubscreen.Exit();
                return;
            }

            return next(args);
        });
    }
}