import { DataManager } from "../Data";
import { setSubscreen } from "./GUIHelper";
import { GUIMainMenu } from "./GUIMainMenu";
import { GUISubscreen } from "./GUISubscreen";

export class GUIReset extends GUISubscreen {
    Run(): void {
        MainCanvas.textAlign = "center";

		DrawText(`- Permanent reset of Responses -`, 1000, 125, "Black");

		DrawText("- Warning -", 1000, 225, "Black", "Black");

		DrawText("If you confirm, all Responses will be permanently reset!", 1000, 325, "Black");

		DrawText("This action cannot be undone!", 1000, 625, "Red", "Black");

		DrawButton(300, 720, 200, 80, "Confirm", "White");

		DrawButton(1520, 720, 200, 80, "Cancel", "White");
    }

    Click(): void {
		if (MouseIn(300, 720, 200, 80)) {
            DataManager.instance.FullReset();
            this.Exit();
        }
        if (MouseIn(1520, 720, 200, 80)) {
            setSubscreen(new GUIMainMenu());
        }
    }

    Unload(): void {
    }
}