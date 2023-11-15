import { BaseModule } from "./BaseModule";
import { DebugMode } from "../Utilities/Definition";
import { modules } from "./Modules";
import { RibbonMenu } from "../Utilities/RibbonMenu";
import { hookFunction, HookPriority } from "../Utilities/SDK";
import { getText } from "../Translation";
import { MainMenu } from "../Screens/MainMenu";
import { GuiSubscreen } from "./BaseSetting";
import { setSubscreen, SETTING_NAME_PREFIX } from "./SettingDefinitions";

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
    PreferenceSubscreen = subscreenName as PreferenceSubscreenName;
  }

  get currentCharacter(): Character {
    return Player;
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

  get defaultSettings(): null {
    return null;
  }

  Load(): void {
    // At that point all other modules have been initialized, build the list of their screens
    for (const module of modules()) {
      if (!module.settingsScreen) continue;

      this._subscreens.push(new module.settingsScreen(module));
    }

    this._mainMenu.subscreens = this._subscreens;

    let modIndex = RibbonMenu.getModIndex("Responsive");

    hookFunction("PreferenceRun", HookPriority.OverrideBehavior, (args, next) => {
      if (this._currentSubscreen) {
        MainCanvas.textAlign = "left";
        this._currentSubscreen.Run();
        MainCanvas.textAlign = "center";

        this.drawDebug();

        return;
      }

      next(args);

      RibbonMenu.drawModButton(modIndex, (modIndex) => {
        DrawButton(
          1815,
          RibbonMenu.getYPos(modIndex),
          90,
          90,
          "",
          "White",
          "Icons/Arousal.png",
          getText("screen.infosheet.button.responsive_popup")
        );
      });
    });

    hookFunction("PreferenceClick", HookPriority.OverrideBehavior, (args, next) => {
      if (this._currentSubscreen) {
        this._currentSubscreen.Click();
        return;
      }

      next(args);

      RibbonMenu.handleModClick(modIndex, (modIndex) => {
        setSubscreen(new MainMenu(this));
      });
    });

    hookFunction("InformationSheetExit", HookPriority.OverrideBehavior, (args, next) => {
      if (this._currentSubscreen) {
        this._currentSubscreen.Exit();
        return;
      }
      return next(args);
    });
  }

  drawDebug() {
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
  }
}
