import { ExtraResponsesModel, ResponsesEntryModel } from "../Settings/Models/Responses";
import { String } from "../Utilities/String";
import { ChatRoomAutoInterceptMessage } from "./ChatMessages";

function RandomResponse(key: string[]) {
    const Moans: string[] = String.Shuffle(key);

    return Moans[0] as string;
}

function TypedMoan(moanType: "low" | "light" | "medium" | "hot" | "orgasm") {
    return RandomResponse(Player.BCResponsive.ResponsesModule.extraResponses[moanType]);
}

function BaseMoan(arousal: number | undefined) {
    if (!arousal) return "";
    let factor = Math.floor(arousal / 20);
    if (factor < 0) factor = 0;
    if (factor > 5) factor = 5;
    const Tkeys: (keyof ExtraResponsesModel)[] = ["low", "low", "light", "medium", "hot", "hot"];
    let k = Tkeys[factor];
    return TypedMoan(k);
}

function EntryResponse(responses: string[]) {
    return RandomResponse(responses);
}

function MixResponseWithMoan(C: Character, responses: string[], act: string) {
    if (!C?.ArousalSettings) return;

    let actFactor = C.ArousalSettings.Activity.find((_) => _.Name === act)?.Self;
    if (!actFactor) return "";

    let threthold1 = Math.max(10, (4 - actFactor) * 25);
    let threthold2 = threthold1 + 40;
    let arousal = C.ArousalSettings.Progress;
    if (arousal <= threthold1) {
        return EntryResponse(responses);
    } else {
        if (!BaseMoan(arousal)) return EntryResponse(responses);
        else {
            if (arousal <= threthold2) {
                return EntryResponse(responses) + "♥" + BaseMoan(arousal) + "♥";
            } else {
                return "♥" + BaseMoan(arousal) + "♥";
            }
        }
    }
}

// function BaseMoanStepped(player: Character, act: string) {
//   if (player && player.ArousalSettings) {
//     let actFactor = player.ArousalSettings.Activity.find((_) => _.Name === act)?.Self;
//     if (!actFactor) return "";

//     let threthold1 = Math.max(10, (4 - actFactor) * 25);
//     let threthold2 = threthold1 + 40;
//     let arousal = player.ArousalSettings.Progress;
//     if (arousal <= threthold1) {
//       return BaseMoan(arousal, 1);
//     } else if (arousal <= threthold2) {
//       return BaseMoan(arousal, 0);
//     } else {
//       return BaseMoan(arousal, -1);
//     }
//   }
// }

// export function MasturbateMoan(player: Character, masturSrc: "MasturbateHand" | "MasturbateFist" | "MasturbateFoot" | "MasturbateItem" | "MasturbateTongue") {
//   ChatRoomAutoInterceptMessage(ElementValue("InputChat"), BaseMoanStepped(player, masturSrc));
// }

// export function PainMessage(player: Character, painSrc: "Bite" | "Slap" | "Pinch" | "Spank" | "SpankItem" | "ShockItem" | "Kick" | "LSCG_SharkBite", activityInfo: ActivityInfo) {
//   if (!DataManager.instance.data.pain) return;
//   if (activityInfo.ActivityName === "LSCG_SharkBite" && activityInfo.ActivityGroup === "ItemNose") return BoopMessage(player, "LSCG_SharkBite", activityInfo);
//   ChatRoomAutoInterceptMessage(ElementValue("InputChat"), MixMoan(player, MoanType.Pain, painSrc));
// }

export function OrgasmMessage() {
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), TypedMoan("orgasm"), Player);
}

export function LeaveMessage() {
    if (!Player.BCResponsive.GlobalModule.doLeaveMessage) return;
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), "..");
}

export function ActivityMessage(entry: ResponsesEntryModel | undefined, target: Character | undefined, sender: Character | undefined) {
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), EntryResponse(entry?.responses as string[]), target, sender);
}