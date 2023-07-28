import { GUISetting } from "./GUI";
import { GUISubscreen } from "./GUISubscreen";

export function getCurrentSubscreen(): GUISubscreen | null {
    return GUISetting.instance && GUISetting.instance.currentSubscreen;
}

export function setSubscreen(subscreen: GUISubscreen | null): void {
    if (GUISetting.instance) {
        GUISetting.instance.currentSubscreen = subscreen;
    }
}