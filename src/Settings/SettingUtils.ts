import { BaseModule } from "../Base";
import { GuiSubscreen } from "./SettingBase";
import { GuiGlobal } from "./Global";
import { MainMenu } from "./MainMenu";
import { SETTING_NAME_PREFIX, Subscreen, setSubscreen } from "./SettingDefinitions";
import { modules } from "../Modules";
import { GlobalSettingsModel } from "./Models/Base";
import { DebugMode } from "../Definition";
import { HOOK_PRIORITY, SDK } from "../Utilities/SDK";
import { Localization } from "../Utilities/Translation";

export class GUI extends BaseModule {
  static instance: GUI | null = null;

  private _subscreens: GuiSubscreen[];
  private _mainMenu: MainMenu;
  private _currentSubscreen: GuiSubscreen | null = null;

  get subscreens(): GuiSubscreen[] {
    return this._subscreens;
  }

  get mainMenu(): MainMenu {
    return this._mainMenu;
  }

  get currentSubscreen(): GuiSubscreen | null {
    return this._currentSubscreen;
  }

  set currentSubscreen(subscreen: GuiSubscreen | string | null) {
    if (this._currentSubscreen) {
      this._currentSubscreen.Unload();
    }
    if (typeof subscreen === "string") {
      const scr = this._subscreens?.find((s) => s.name === subscreen);
      if (!scr) throw `Failed to find screen name ${subscreen}`;
      this._currentSubscreen = scr;
    } else {
      this._currentSubscreen = subscreen;
    }

    PreferenceMessage = "";
    PreferencePageCurrent = 1;

    let subscreenName = "";
    if (this._currentSubscreen) {
      subscreenName = SETTING_NAME_PREFIX + this._currentSubscreen?.name;
      this._currentSubscreen.Load();
    }

    // Get BC to render the new screen
    PreferenceSubscreen = subscreenName;
  }

  get currentCharacter(): Character {
    return Player;
  }

  get settingsScreen(): Subscreen | null {
    return GuiGlobal;
  }

  get settings(): GlobalSettingsModel {
    return super.settings as GlobalSettingsModel;
  }

  get settingsStorage(): string | null {
    return "GlobalModule";
  }

  constructor() {
    super();
    if (GUI.instance) {
      throw new Error("Duplicate initialization");
    }

    this._mainMenu = new MainMenu(this);
    this._subscreens = [this._mainMenu];

    GUI.instance = this;
  }

  get defaultSettings(): GlobalSettingsModel {
    return {
      ResponsiveEnabled: true,
      CharTalkEnabled: true,
      doLeaveMessage: true,
      doShowNewVersionMessage: true,
      doMessageInterruption: true,
    };
  }

  Load(): void {
    // At that point all other modules have been initialized, build the list of their screens
    for (const module of modules()) {
      if (!module.settingsScreen) continue;

      this._subscreens.push(new module.settingsScreen(module));
    }

    this._mainMenu.subscreens = this._subscreens;

    SDK.hookFunction("PreferenceRun", HOOK_PRIORITY.OVERRIDE_BEHAVIOR, (args, next) => {
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
        DrawButton(1815, 820, 90, 90, "", "White", "Icons/Arousal.png", Localization.GetText("button_mainmenu_popup"));
    });

    SDK.hookFunction("PreferenceClick", HOOK_PRIORITY.OVERRIDE_BEHAVIOR, (args, next) => {
      if (this._currentSubscreen) {
        this._currentSubscreen.Click();
        return;
      }

      if (PreferenceSubscreen === "") {
        if (MouseIn(1815, 820, 90, 90)) return setSubscreen(new MainMenu(this));
      }
      return next(args);
    });

    SDK.hookFunction("InformationSheetExit", HOOK_PRIORITY.OVERRIDE_BEHAVIOR, (args, next) => {
      if (this._currentSubscreen) {
        this._currentSubscreen.Exit();
        return;
      }
      return next(args);
    });
  }
}

export function drawTooltip(x: number, y: number, width: number, text: string, align: "left" | "center" | "right") {
  const canvas = MainCanvas;
  const bak = canvas.textAlign;
  canvas.textAlign = align;
  canvas.beginPath();
  canvas.rect(x, y, width, 65);
  canvas.fillStyle = "#FFFF88";
  canvas.fillRect(x, y, width, 65);
  canvas.fill();
  canvas.lineWidth = 2;
  canvas.strokeStyle = "black";
  canvas.stroke();
  canvas.closePath();
  DrawTextFit(text, align === "left" ? x + 3 : x + width / 2, y + 33, width - 6, "black");
  canvas.textAlign = bak;
}
