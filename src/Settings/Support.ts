import { Button, Setting } from "../../.types/setting";
import { GuiSubscreen } from "../Base/BaseSetting";
import { getText } from "../Utilities/Translation";

export class GuiSupport extends GuiSubscreen {
  private static thankYouList: string[] = [];
  private static thankYouNext = 0;
  private static thankYou = "";

  get name(): string {
    return "support";
  }

  get structure(): Setting[] {
    return [
      <Button>{
        type: "button",
        position: [GuiSubscreen.START_X, GuiSubscreen.START_Y],
        size: [405, 80],
        label: "screen.support.button.ko-fi",
        color: "#49225C",
        image: "https://storage.ko-fi.com/cdn/nav-logo-stroke.png",
        disabled: false,
        callback() {
          window.open("https://ko-fi.com/monikka_bc", "_blank");
        }
      },
      <Button>{
        type: "button",
        position: [GuiSubscreen.START_X, GuiSubscreen.START_Y + GuiSubscreen.Y_MOD + 20],
        size: [405, 80],
        label: "screen.support.button.patreon",
        color: "#49225C",
        image: "https://c5.patreon.com/external/favicon/rebrand/favicon-32.png?v=af5597c2ef",
        disabled: false,
        callback() {
          window.open("https://patreon.com/monikka_bc", "_blank");
        }
      }
    ];
  }

  static getSupporter() {
    if (!GuiSupport.thankYouList.length) return "";
    if (GuiSupport.thankYouNext < CommonTime()) GuiSupport.doNextThankYou();
    return `${getText("screen.support.other.thankyou")}, ${GuiSupport.thankYou}`;
  }

  static doNextThankYou() {
    GuiSupport.thankYou = CommonRandomItemFromList(GuiSupport.thankYou, GuiSupport.thankYouList);
    GuiSupport.thankYouNext = CommonTime() + 4000;
  }

  Load() {
    GuiSupport.doNextThankYou();

    const style = document.createElement("style");
    style.id = "bcr_gratitude_style";
    style.innerHTML = bcr_gratitude_style;
    document.head.appendChild(style);

    ElementCreateDiv("bcr_gratitude");
    let elm = document.getElementById("bcr_gratitude");
    ElementContent("bcr_gratitude", bcr_gratitude_html);

    const font =
      MainCanvas.canvas.clientWidth <= MainCanvas.canvas.clientHeight * 2
        ? MainCanvas.canvas.clientWidth / 50
        : MainCanvas.canvas.clientHeight / 25;

    Object.assign(elm.style, {
      fontFamily: CommonGetFontName(),
      fontSize: font + "px"
    });

    super.Load();
  }

  Run() {
    super.Run();

    let tmp = GuiSubscreen.START_X;
    GuiSubscreen.START_X = 550;

    DrawText(GuiSupport.getSupporter(), GuiSubscreen.START_X + 300, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "#D7F6E9");

    GuiSubscreen.START_X = tmp;
  }

  Click() {
    super.Click();
  }

  Exit() {
    ElementRemove("bcr_gratitude");
    ElementRemove("bcr_gratitude_style");
    super.Exit();
  }
}

const bcr_gratitude_html = /*html*/ `
<h1 class="bcr_h">Dear Supporters!</h1>
<p class="bcr_p">
  I want to take a moment to express my heartfelt gratitude for considering supporting me. Your willingness to stand by
  my side in this creative journey means the world to me, and I am truly humbled by your generosity.
</p>
<p class="bcr_p">
  Your support goes far beyond the financial contributions; it represents belief in my work and a shared passion for
  what I do. Your encouragement inspires me to continue developing.
</p>
<p class="bcr_p">
  Your support not only helps me sustain and grow as a developer, but also enables me to dedicate more time and
  resources to producing high-quality mods. It allows me to explore new ideas, enhance my skills, and bring even more
  meaningful and enjoyable content to you.
</p>
<p class="bcr_p">Thank you all~</p>
<p class="bcr_p">With love, Monikka♥</p>
`;

const bcr_gratitude_style = /* css */ `
#bcr_gratitude {
  position: fixed;
  width: 25%;
  height: 50%;
  top: 15%;
  left: 50%;
}

.bcr_h {
  font-size: 1em;
  color: #333;
}

.bcr_p {
  font-size: 0.6em;
  color: #555;
  line-height: 1.5;
}

.bcr_p:last-child {
  font-size: 0.8em;
  color: #ff69b4;
}
`;
