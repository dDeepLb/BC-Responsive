import { ExtraResponsesModel, ResponsesEntryModel } from "../Models/Responses";
import { getCharacter, getRandomInt } from "./Other";
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
  if (factor < 1) factor = 1; // skip wnen arousal is >=0 && < 20. too low as for me.
  if (factor > 4) factor = 4; // Skip when arousal is 100, cause that's orgasm
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

export function activityMessage(dict: ActivityInfo, entry: ResponsesEntryModel | undefined) {
  const target = getCharacter(dict.TargetCharacter.MemberNumber);
  const source = getCharacter(dict.SourceCharacter.MemberNumber);
  chatRoomAutoInterceptMessage(ElementValue("InputChat"), mixResponseWithMoan(Player, entry?.responses, dict.ActivityName), target, source);
}
