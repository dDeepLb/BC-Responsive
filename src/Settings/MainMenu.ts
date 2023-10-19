import { GuiSubscreen } from "./SettingBase";
import { GUI } from "./SettingUtils";
import { GetText, Localization } from "../Utilities/Translation";
import { ConDebug } from "../Utilities/Console";

export class MainMenu extends GuiSubscreen {
  subscreens: GuiSubscreen[] = [];

  get name(): string {
    return "MainMenu";
  }

  constructor(module: GUI) {
    super(module);

    this.subscreens = module.subscreens;
  }

  Load(): void {
    ConDebug("Loading MainMenu GUI");
    if (!GUI.instance?.currentSubscreen) {
      this.setSubscreen(this);
      return;
    }

    super.Load();
  }

  Run() {
    let tmp = GuiSubscreen.START_X;
    var prev = MainCanvas.textAlign;

    GuiSubscreen.START_X = 550;
    MainCanvas.textAlign = "left";

    DrawCharacter(Player, 50, 50, 0.9, false);
    DrawText(GetText("title_mainmenu"), GuiSubscreen.START_X, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");
    DrawButton(1815, 75, 90, 90, "", "White", "Icons/Exit.png");

    MainCanvas.textAlign = "center";
    let i = 0;
    for (const screen of this.subscreens) {
      const PX = Math.floor(i / 6);
      const PY = i % 6;

      if (screen.name == "MainMenu") continue;

      DrawButton(GuiSubscreen.START_X + 430 * PX, 190 + 120 * PY, 450, 90, "", "White", "", "");
      DrawImageResize(screen.icon, GuiSubscreen.START_X + 430 * PX + 10, 190 + 120 * PY + 10, 70, 70);

      MainCanvas.textAlign = "left";
      DrawTextFit(GetText(screen.name), GuiSubscreen.START_X + 100 + 430 * PX, 235 + 120 * PY, 340, "Black");
      MainCanvas.textAlign = "center";

      i++;

      MainCanvas.textAlign = "left";

      DrawButton(1500, 630, 405, 80, "", "IndianRed");
      DrawImageResize("Icons/ServiceBell.png", 1510, 640, 60, 60);
      DrawTextFit("Reset", 1580, 670, 320, "Black");

      DrawButton(1500, 730, 405, 80, "", "#BDA203", "", "Open Responsive Wiki on GitHub.", false);
      DrawImageResize("Icons/Introduction.png", 1510, 740, 60, 60);
      DrawTextFit("Wiki", 1580, 770, 320, "Black");

      DrawButton(1500, 830, 405, 80, "", "#49225C");
      DrawImageResize("https://storage.ko-fi.com/cdn/nav-logo-stroke.png", 1510, 840, 60, 60);
      DrawTextFit("Support Me❤", 1580, 870, 320, "Black");
    }
    GuiSubscreen.START_X = tmp;
    MainCanvas.textAlign = prev;
  }

  Click() {
    if (MouseIn(1815, 75, 90, 90)) return this.Exit();

    let tmp = GuiSubscreen.START_X;
    GuiSubscreen.START_X = 550;
    let i = 0;
    for (const screen of this.subscreens) {
      const PX = Math.floor(i / 6);
      const PY = i % 6;

      if (screen.name == "MainMenu") continue;

      if (MouseIn(GuiSubscreen.START_X + 430 * PX, 190 + 120 * PY, 450, 90)) {
        this.setSubscreen(screen);
        return;
      }

      i++;
    }
    GuiSubscreen.START_X = tmp;

    //if (MouseIn(1500, 620, 400, 80)) this.setSubscreen(new GuiReset(getModule<CoreModule>("CoreModule")));
    //if (MouseIn(1500, 730, 400, 80)) this.setSubscreen(new GUIReset());

    if (MouseIn(1500, 730, 400, 80) && PreferenceSubscreen === "BCRMainMenu" as PreferenceSubscreenName) window.open('https://github.com/dDeepLb/BC-Responsive/wiki/', '_blank')
    if (MouseIn(1500, 830, 400, 80) && PreferenceSubscreen === "BCRMainMenu" as PreferenceSubscreenName) window.open('https://ko-fi.com/ddeeplb', '_blank')
  }

  Exit(): void {
    CharacterAppearanceForceUpCharacter = -1;
    CharacterLoadCanvas(Player);
    this.setSubscreen(null);
  }
}
