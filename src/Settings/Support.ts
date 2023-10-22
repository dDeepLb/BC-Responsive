import { Button, Setting } from "../../.types/setting";
import { GuiSubscreen } from "../Base/BaseSetting";
import { getText } from "../Utilities/Translation";

export class GuiSupport extends GuiSubscreen {
    private static thankYouList: string[] = [

    ];
    private static thankYouNext = 0;
    private static thankYou = "";

    get name(): string {
        return "support"
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
                    window.open('https://ko-fi.com/monikka_bc', '_blank');
                },
            }, <Button>{
                type: "button",
                position: [GuiSubscreen.START_X, GuiSubscreen.START_Y + GuiSubscreen.Y_MOD + 20],
                size: [405, 80],
                label: "screen.support.button.patreon",
                color: "#49225C",
                image: "https://c5.patreon.com/external/favicon/rebrand/favicon-32.png?v=af5597c2ef",
                disabled: false,
                callback() {
                    window.open('https://patreon.com/monikka_bc', '_blank');
                },
            }
        ]
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
        super.Exit();
    }
}