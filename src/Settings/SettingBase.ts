import { BaseSettingsModel } from "./Models/Base";
import { SETTING_FUNC_NAMES, SETTING_FUNC_PREFIX, SETTING_NAME_PREFIX, setSubscreen } from "./SettingDefinitions";
import { BaseModule } from "../Base";
import { drawTooltip as DrawTooltip, GUI } from "./SettingUtils";
import { Localization } from "../Utilities/Translation";
import { GuiResponses } from "./Responses";
import { ConDebug } from "../Utilities/Console";
import { DataStore } from "../Utilities/Data";

export interface Setting {
  type: "checkbox" | "text" | "number" | "label" | "button";
  id: string;
  disabled: boolean;
  label: string;
  description: string;
  setting(): any;
  setSetting(val: any): void;
}

export abstract class GuiSubscreen {
  static START_X: number = 180;
  static START_Y: number = 205;
  static X_MOD: number = 950;
  static Y_MOD: number = 75;
  readonly module: BaseModule;

  constructor(module: BaseModule) {
    this.module = module;

    // create each handler for a new preference subscreen
    SETTING_FUNC_NAMES.forEach((name) => {
      const fName = SETTING_FUNC_PREFIX + SETTING_NAME_PREFIX + this.name + name;
      if (typeof (<any>this)[name] === "function" && typeof (<any>window)[fName] !== "function")
        (<any>window)[fName] = () => {
          (<any>this)[name]();
        };
    });
  }

  get name(): string {
    return "UNKNOWN";
  }

  get icon(): string {
    return "";
  }

  get label(): string {
    return "UNDEFINED SETTING SCREEN";
  }

  get message(): string {
    return PreferenceMessage;
  }

  set message(message: string) {
    PreferenceMessage = message;
  }

  get SubscreenName(): string {
    return SETTING_NAME_PREFIX + this.constructor.name;
  }

  setSubscreen(screen: GuiSubscreen | string | null) {
    return setSubscreen(screen);
  }

  get settings(): BaseSettingsModel {
    return this.module.settings as BaseSettingsModel;
  }

  get multipageStructure(): Setting[][] {
    return [[]];
  }

  get structure(): Setting[] {
    return this.multipageStructure[Math.min(PreferencePageCurrent - 1, this.multipageStructure.length - 1)];
  }

  get character(): Character {
    return GUI.instance?.currentCharacter as Character;
  }

  getYPos(ix: number) {
    return GuiSubscreen.START_Y + GuiSubscreen.Y_MOD * (ix % 9);
  }

  getXPos(ix: number) {
    return GuiSubscreen.START_X + GuiSubscreen.X_MOD * Math.floor(ix / 9);
  }

  HideElements() {
    this.multipageStructure.forEach((s, ix, arr) => {
      if (ix != PreferencePageCurrent - 1) {
        s.forEach((setting) => {
          if (setting.type == "text" || setting.type == "number") this.ElementHide(setting.id);
        });
      }
    });
  }

  Load() {
    ConDebug(`Loading ${PreferenceSubscreen}`)
    this.multipageStructure.forEach((s) =>
      s.forEach((item) => {
        switch (item.type) {
          case "text":
            let input = ElementCreateInput(item.id, "text", item.setting(), "255");
            input.setAttribute('autocomplete', 'off');
            break;
          case "number":
            ElementCreateInput(item.id, "number", item.setting(), "255");
            break;
        }
      })
    );

    CharacterAppearanceForceUpCharacter = Player.MemberNumber ?? -1;
  }

  Run() {
    let tmp = GuiSubscreen.START_X;
    var prev = MainCanvas.textAlign;

    GuiSubscreen.START_X = 550;
    MainCanvas.textAlign = "left";

    DrawCharacter(Player, 50, 50, 0.9, false);
    DrawText("- " + Localization.GetText(this.name) + " -", GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
    DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png", "Responsive Main Menu");

    if (this.multipageStructure.length > 1) {
      MainCanvas.textAlign = "center";
      PreferencePageChangeDraw(1595, 75, this.multipageStructure.length);
      MainCanvas.textAlign = "left";
    }

    this.HideElements();

    this.structure.forEach((item, ix, arr) => {
      switch (item.type) {
        case "checkbox":
          this.DrawCheckbox(item.label, item.description, item.setting(), ix, item.disabled);
          break;
        case "text":
        case "number":
          this.ElementPosition(item.id, item.label, item.description, ix, item.disabled);
          break;
        case "label":
          this.DrawLabel(item.label, item.description, ix);
          break;
      }
    });

    GuiSubscreen.START_X = tmp;
    MainCanvas.textAlign = prev;
  }

  Click() {
    if (MouseIn(1815, 75, 90, 90)) return this.Exit();
    if (this.multipageStructure.length > 1) PreferencePageChangeClick(1595, 75, this.multipageStructure.length);

    this.structure.forEach((item, ix, arr) => {
      switch (item.type) {
        case "checkbox":
          if (MouseIn(this.getXPos(ix) + 600, this.getYPos(ix) - 32, 64, 64) && !item.disabled) {
            item.setSetting(!item.setting());
          }
          break;
      }
    });
  }

  Exit() {
    this.multipageStructure.forEach((s) =>
      s.forEach((item) => {
        switch (item.type) {
          case "number":
            if (!CommonIsNumeric(ElementValue(item.id))) {
              ElementRemove(item.id);
              break;
            }
          case "text":
            item.setSetting(ElementValue(item.id));
            ElementRemove(item.id);
            break;
        }
      })
    );

    CharacterAppearanceForceUpCharacter = -1;
    CharacterLoadCanvas(Player);

    setSubscreen("MainMenu");
    DataStore();
  }

  Unload() {
    // Empty
  }

  Tooltip(text: string) {
    DrawTooltip(300, 850, 1400, text, "left");
  }

  DrawCheckbox(label: string, description: string, value: boolean, order: number, disabled: boolean = false) {
    var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
    DrawTextFit(label, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
    DrawCheckbox(this.getXPos(order) + 600, this.getYPos(order) - 32, 64, 64, "", value ?? false, disabled);
    if (isHovering) this.Tooltip(description);
  }

  DrawButton(label: string, color: string, order: number, XOffset: number, disabled: boolean = false) {
    var isHovering = MouseIn(this.getXPos(order) + XOffset, this.getYPos(order) - 32, 200, 64);
    DrawButton(this.getXPos(order) + XOffset, this.getYPos(order) - 32, 200, 64, "", color, "", "", disabled)
    DrawTextFit(label, this.getXPos(order) + XOffset + 58, this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
  }

  ElementHide(elementId: string) {
    ElementPosition(elementId, -999, -999, 1, 1);
  }

  ElementPosition(elementId: string, label: string, description: string, order: number, disabled: boolean = false) {
    var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
    DrawTextFit(`${Localization.GetText(label)}`, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
    ElementPosition(elementId, this.getXPos(order) + 750 + 225, this.getYPos(order), 800, 64);
    if (disabled) ElementSetAttribute(elementId, "disabled", "true");
    if (!disabled) document.getElementById(elementId)?.removeAttribute("disabled");
    if (isHovering) this.Tooltip(description);
  }

  DrawLabel(name: string, description: string, order: number) {
    var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
    DrawTextFit(name, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
    if (isHovering) this.Tooltip(description);
  }
}
