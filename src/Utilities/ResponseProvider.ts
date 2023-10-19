import { ExtraResponsesModel, ResponsesEntryModel } from "../Settings/Models/Responses";
import { GetRandomInt } from "./Other";
import { ChatRoomAutoInterceptMessage } from "./ChatMessages";

function RandomResponse(key: string[]) {
    const rnd = GetRandomInt(key.length);

    return key[rnd] as string;
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

function TypedResponse(responses: string[]) {
    return RandomResponse(responses);
}

function MixResponseWithMoan(C: Character, responses: string[] | undefined, act: string | undefined) {
    if (!C?.ArousalSettings) return;
    if (!responses) return;

    let actFactor = C.ArousalSettings.Activity.find((_) => _.Name === act)?.Self;
    if (!actFactor) return "";

    let threthold1 = Math.max(10, (4 - actFactor) * 25);
    let threthold2 = threthold1 + 40;
    let arousal = C.ArousalSettings.Progress;

    if (arousal <= threthold1) {
        return TypedResponse(responses);
    } else {
        if (!BaseMoan(arousal)) return TypedResponse(responses);
        else {
            if (arousal <= threthold2) {
                return TypedResponse(responses) + "♥" + BaseMoan(arousal) + "♥";
            } else {
                return "♥" + BaseMoan(arousal) + "♥";
            }
        }
    }
}

export function OrgasmMessage() {
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), TypedMoan("orgasm"), Player);
}

export function LeaveMessage() {
    if (!Player.BCResponsive.GlobalModule.doLeaveMessage) return;
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), "..");
}

export function ActivityMessage(entry: ResponsesEntryModel | undefined, target: Character | undefined, sender: Character | undefined) {
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), MixResponseWithMoan(Player, entry?.responses, entry?.name), target, sender);
}