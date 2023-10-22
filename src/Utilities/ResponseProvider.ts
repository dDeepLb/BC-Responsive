import { ExtraResponsesModel, ResponsesEntryModel } from "../Models/Responses";
import { getRandomInt } from "./Other";
import { chatRoomAutoInterceptMessage } from "./ChatMessages";

function randomResponse(key: string[]) {
    const rnd = getRandomInt(key.length);

    return key[rnd] as string;
}

function typedMoan(moanType: "low" | "light" | "medium" | "hot" | "orgasm") {
    return randomResponse(Player.BCResponsive.ResponsesModule.extraResponses[moanType]);
}

function baseMoan(arousal: number | undefined) {
    if (!arousal) return "";
    let factor = Math.floor(arousal / 20);
    if (factor < 0) factor = 0;
    if (factor > 5) factor = 5;
    const Tkeys: (keyof ExtraResponsesModel)[] = ["low", "low", "light", "medium", "hot", "hot"];
    let k = Tkeys[factor];
    return typedMoan(k);
}

function typedResponse(responses: string[]) {
    return randomResponse(responses);
}

function mixResponseWithMoan(C: Character, responses: string[] | undefined, act: string | undefined) {
    if (!C?.ArousalSettings) return;
    if (!responses) return;

    let actFactor = C.ArousalSettings.Activity.find((_) => _.Name === act)?.Self;
    if (!actFactor) return "";

    let threthold1 = Math.max(10, (4 - actFactor) * 25);
    let threthold2 = threthold1 + 40;
    let arousal = C.ArousalSettings.Progress;

    if (arousal <= threthold1) {
        return typedResponse(responses);
    } else {
        if (!baseMoan(arousal)) return typedResponse(responses);
        else {
            if (arousal <= threthold2) {
                return typedResponse(responses) + "♥" + baseMoan(arousal) + "♥";
            } else {
                return "♥" + baseMoan(arousal) + "♥";
            }
        }
    }
}

export function orgasmMessage() {
    chatRoomAutoInterceptMessage(ElementValue("InputChat"), typedMoan("orgasm"), Player);
}

export function leaveMessage() {
    if (!Player.BCResponsive.GlobalModule.doLeaveMessage) return;
    chatRoomAutoInterceptMessage(ElementValue("InputChat"), "..");
}

export function activityMessage(entry: ResponsesEntryModel | undefined, target: Character | undefined, sender: Character | undefined) {
    chatRoomAutoInterceptMessage(ElementValue("InputChat"), mixResponseWithMoan(Player, entry?.responses, entry?.name), target, sender);
}