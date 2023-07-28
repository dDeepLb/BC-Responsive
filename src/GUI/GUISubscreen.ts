import { setSubscreen } from "./GUIHelper";


export abstract class GUISubscreen {
    Load() { }
    Run() { }
    Click() { }
    Exit() { setSubscreen(null); }
    Unload() { }
}