import { getCurrentSubscreen } from "./GUIHelper";

//Functions
export function getYPos(ix: number) {
    return 200 + (100 * ix);
}
export function getXPos(ix: number) {
    return 200 + (100 * ix);
}
// export function GUIBack() {
//     let currentSubscreenName = getCurrentSubscreenName()
//     switch ( currentSubscreenName ) {
//         case "Profiles":
//     }
// }

//Variables
export const enum BExit {
    Left = 1815,
    Top = 75,
    Width = 90,
    Height = 90
}
export const enum Title {
    X = 150,
    Y = 125
}
export enum CBEnable {
    Left = Title.X,
    Top = getYPos(0),
    Width = 64,
    Height = 64
}