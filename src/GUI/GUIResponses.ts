import { DataManager } from "../Data";
import { Localization } from "../Utilities/Lang";
import { BExit, getYPos, Title } from "./GUIMisc/GUIDefinition";
import { setSubscreen } from "./GUIMisc/GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUIMisc/GUISubscreen";

export class GUIResponses extends GUISubscreen {
    public static keys: (keyof ResponsiveSetting)[] = ['low', 'light', 'medium', 'hot', 'orgasm', 'pain', 'tickle', 'boop'];

    public static ElementID = (k: keyof ResponsiveSolidSetting) => `BCResponsive_Input${k}`;
    private static StringListShow = (p: string[]) => {
        if (p.length === 0) return "";
        let result = JSON.stringify(p);
        return result.substring(1, result.length - 1);
    }

    private static ValidateInput = (input: string) => {
        let raw = `[${input}]`;

        const ValidateStringList = (input: any) => {
            if (!Array.isArray(input)) return undefined;
            if (!(input as any[]).every(_ => typeof _ === 'string')) return undefined;
            return input as string[];
        }

        try {
            let d = JSON.parse(raw);
            return ValidateStringList(d);
        } catch {
            return undefined;
        }
    }
    Run(): void {
        const data = DataManager.instance.data;
        DrawButton(BExit.Left, BExit.Top, BExit.Width, BExit.Height, "", "White", "Icons/Exit.png");
        //Title Text
        DrawText(Localization.GetText("title_responses"), Title.X, Title.Y, "Black", "Gray");

        const inputBaseX = Title.X + 700;
        const buttonBaseX = 1350;

        for (let i = 0; i < GUIResponses.keys.length; i++) {
            const k = GUIResponses.keys[i];
            const tY = getYPos(i);
            DrawText(Localization.GetText(`input_title_${k}`), Title.X, tY, "Black", "Gray");
            let input = document.getElementById(GUIResponses.ElementID(k)) as HTMLInputElement | undefined;
            if (!input) {
                input = ElementCreateInput(GUIResponses.ElementID(k), "text", GUIResponses.StringListShow(data[k]), "256");
            }
            if (input) {
                ElementPosition(GUIResponses.ElementID(k), inputBaseX, tY, 1000, 64);
                DrawButton(buttonBaseX, tY - 27, 64, 64, "", "IndianRed");
                DrawImageResize("Icons/Reset.png", buttonBaseX, tY - 27, 64, 64);
                if (!GUIResponses.ValidateInput(input.value)) {
                    DrawText(Localization.GetText(`input_invalid`), inputBaseX + 600, tY, "Red", "Gray");
                }
            }
        }
    }

    
    Click(): void {
        const buttonBaseX = 1350;
        if (MouseIn(BExit.Left, BExit.Top, BExit.Width, BExit.Height)) {
            for (let i = 0; i < GUIResponses.keys.length; i++) {
                const k = GUIResponses.keys[i];
                let input = document.getElementById(GUIResponses.ElementID(k)) as HTMLInputElement | undefined;
                if (input) {
                    let newL = GUIResponses.ValidateInput(input.value);
                    if (newL)
                        DataManager.instance.data[k] = newL;
                }
            }
            DataManager.instance.ServerStoreData();
            setSubscreen(new GUIMainMenu());
        }
        
        for (let i = 0; i < GUIResponses.keys.length; i++) {
            const k = GUIResponses.keys[i];
            const tY = getYPos(i);
            if (MouseIn(buttonBaseX, tY - 27, 64, 64)) {
                DataManager.instance.SingleReset(k)
            }
        }
    }

    Unload(): void {
        GUIResponses.keys.forEach(_ => ElementRemove(GUIResponses.ElementID(_)));
    }
}