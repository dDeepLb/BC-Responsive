import { ExtraResponsesModel, ResponsesEntryModel } from "../Models/Responses";
import { getRandomInt, getCharacter } from "./Other";

export function activityDeconstruct(dict: _ChatMessageDictionary): ActivityInfo | undefined {
  let SourceCharacter, TargetCharacter, ActivityGroup, ActivityName;
  for (let v of dict) {
    if (v.TargetCharacter) TargetCharacter = { MemberNumber: v.TargetCharacter };
    else if (v.SourceCharacter) SourceCharacter = { MemberNumber: v.SourceCharacter };
    else if (v.FocusGroupName) ActivityGroup = v.FocusGroupName;
    else if (v.ActivityName) ActivityName = v.ActivityName;
  }
  if (SourceCharacter === undefined || TargetCharacter === undefined || ActivityGroup === undefined || ActivityName === undefined)
    return undefined;
  return { SourceCharacter, TargetCharacter, ActivityGroup, ActivityName };
}

export function isSimpleChat(msg: string) {
  return (
    msg.trim().length > 0 &&
    !msg.startsWith("/") &&
    !msg.startsWith("(") &&
    !msg.startsWith("*") &&
    !msg.startsWith("!") &&
    !msg.startsWith(".") &&
    !msg.startsWith("@") &&
    !msg.startsWith("https")
  );
}

function chatRoomInterceptMessage(cur_msg: string, msg: string) {
  if (!msg) return;
  ElementValue("InputChat", cur_msg + "... " + msg);
  ChatRoomSendChat();
}

function chatRoomNormalMessage(msg: string) {
  if (!msg) return;
  let backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
  ChatRoomTargetMemberNumber = null;
  let oldmsg = ElementValue("InputChat");
  ElementValue("InputChat", msg);
  ChatRoomSendChat();
  ElementValue("InputChat", oldmsg);
  ChatRoomTargetMemberNumber = backupChatRoomTargetMemberNumber;
}

export function chatRoomAutoInterceptMessage(cur_msg: string, msg?: string, target?: Character, source?: Character) {
  if (!msg) return;
  msg = replaceTemplate(msg, target, source);

  const data = Player.BCResponsive.GlobalModule;
  if (data.doMessageInterruption && isSimpleChat(cur_msg) && ChatRoomTargetMemberNumber == null) {
    return chatRoomInterceptMessage(cur_msg, msg);
  }

  chatRoomNormalMessage(msg);
}

function replaceTemplate(msg: string, target?: Character, source?: Character) {
  if (!target || !source) {
    return msg;
  }

  const targetPronouns = CharacterPronounDescription(target);
  const senderPronouns = CharacterPronounDescription(source);

  const targetName = target.Nickname ?? target.Name;
  const sourceName = source.Nickname ?? source.Name;

  const targetPronoun = targetPronouns === "She/Her" ? "she" : "he";
  const sourcePronoun = senderPronouns === "She/Her" ? "she" : "he";
  const targetPossessive = targetPronouns === "She/Her" ? "her" : "his";
  const sourcePossessive = senderPronouns === "She/Her" ? "her" : "his";
  const targetIntensive = targetPronouns === "She/Her" ? "her" : "him";
  const sourceIntensive =
    sourceName === targetName ? (targetPronouns === "She/Her" ? "herself" : "himself") : targetPronouns === "She/Her" ? "her" : "him";

  return msg
    .replaceAll("%TARGET%", targetName)
    .replaceAll("%TARGET_PRONOUN%", targetPronoun)
    .replaceAll("%TARGET_POSSESIVE%", targetPossessive)
    .replaceAll("%TARGET_INTENSIVE%", targetIntensive)
    .replaceAll("%SOURCE%", sourceName)
    .replaceAll("%SOURCE_PRONOUN%", sourcePronoun)
    .replaceAll("%SOURCE_POSSESIVE%", sourcePossessive)
    .replaceAll("%SOURCE_INTENSIVE%", sourceIntensive);
}

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
  chatRoomAutoInterceptMessage(ElementValue("InputChat"), "..");
}

export function activityMessage(dict: ActivityInfo, entry: ResponsesEntryModel | undefined) {
  const target = getCharacter(dict.TargetCharacter.MemberNumber);
  const source = getCharacter(dict.SourceCharacter.MemberNumber);
  chatRoomAutoInterceptMessage(ElementValue("InputChat"), mixResponseWithMoan(Player, entry?.responses, dict.ActivityName), target, source);
}
