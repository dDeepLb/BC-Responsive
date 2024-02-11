import { Button, Setting } from '../../.types/setting';
import { GuiSubscreen } from '../Base/BaseSetting';
import { getText } from '../Translation';

export class GuiSupport extends GuiSubscreen {
  private static thankYouList: string[] = ['Ellena'];
  private static thankYouNext = 0;
  private static thankYou = '';

  get name(): string {
    return 'Support';
  }

  get structure(): Setting[] {
    return [
      <Button>{
        type: 'button',
        position: [GuiSubscreen.START_X, GuiSubscreen.START_Y],
        size: [405, 80],
        label: 'support.button.ko-fi',
        color: '#49225C',
        image: 'https://storage.ko-fi.com/cdn/nav-logo-stroke.png',
        disabled: false,
        callback() {
          window.open('https://ko-fi.com/monikka_bc', '_blank');
        }
      },
      <Button>{
        type: 'button',
        position: [GuiSubscreen.START_X, GuiSubscreen.START_Y + GuiSubscreen.Y_MOD + 20],
        size: [405, 80],
        label: 'support.button.patreon',
        color: '#49225C',
        image: 'https://c5.patreon.com/external/favicon/rebrand/favicon-32.png?v=af5597c2ef',
        disabled: false,
        callback() {
          window.open('https://patreon.com/monikka_bc', '_blank');
        }
      }
    ];
  }

  static getSupporter() {
    if (GuiSupport.thankYouNext < CommonTime()) GuiSupport.doNextThankYou();
    return `${getText('support.other.thankyou')}, ${GuiSupport.thankYou}`;
  }

  static doNextThankYou() {
    if (GuiSupport.thankYou && GuiSupport.thankYouList.length < 2) return;
    GuiSupport.thankYou = CommonRandomItemFromList(GuiSupport.thankYou, GuiSupport.thankYouList);
    GuiSupport.thankYouNext = CommonTime() + 4000;
  }

  Load() {
    GuiSupport.doNextThankYou();

    ElementCreateDiv('ResponsiveGratitude');
    let elm = document.getElementById('ResponsiveGratitude');
    ElementContent('ResponsiveGratitude', gratitudeHtml);

    const font =
      MainCanvas.canvas.clientWidth <= MainCanvas.canvas.clientHeight * 2
        ? MainCanvas.canvas.clientWidth / 50
        : MainCanvas.canvas.clientHeight / 25;

    Object.assign(elm.style, {
      fontFamily: CommonGetFontName(),
      fontSize: font + 'px'
    });

    super.Load();
  }

  Run() {
    super.Run();

    let tmp = GuiSubscreen.START_X;
    GuiSubscreen.START_X = 550;

    DrawText(GuiSupport.getSupporter(), GuiSubscreen.START_X + 300, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, 'Black', '#D7F6E9');

    GuiSubscreen.START_X = tmp;
  }

  Click() {
    super.Click();
  }

  Exit() {
    ElementRemove('ResponsiveGratitude');
    super.Exit();
  }
}

const gratitudeHtml = /*html*/ `
<h1 class="ResponsiveH">Dear Supporters!</h1>
<p class="ResponsiveP">
  I want to take a moment to express my heartfelt gratitude for considering supporting me. Your willingness to stand by
  my side in this creative journey means the world to me, and I am truly humbled by your generosity.
</p>
<p class="ResponsiveP">
  Your support goes far beyond the financial contributions; it represents belief in my work and a shared passion for
  what I do. Your encouragement inspires me to continue developing.
</p>
<p class="ResponsiveP">
  Your support not only helps me sustain and grow as a developer, but also enables me to dedicate more time and
  resources to producing high-quality mods. It allows me to explore new ideas, enhance my skills, and bring even more
  meaningful and enjoyable content to you.
</p>
<p class="ResponsiveP">Thank you all~</p>
<p class="ResponsiveP">With love, Monikka♥</p>
`;
