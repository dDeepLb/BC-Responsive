import { ExtraResponsesModel, ResponsesEntryModel } from "../Models/Responses";
import { PlayerStorage } from "./Data";
import { getCharacter, getRandomInt } from "./Other";

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
    ChatRoomTargetMemberNumber == -1 &&
    !msg.startsWith("/") &&
    !msg.startsWith("(") &&
    !msg.startsWith("*") &&
    !msg.startsWith("!") &&
    !msg.startsWith(".") &&
    !msg.startsWith("@") &&
    !msg.startsWith("http")
  );
}

export function chatRoomAutoInterceptMessage(cur_msg: string, msg?: string, source?: Character) {
  if (!msg) return;

  const data = PlayerStorage().GlobalModule;
  if (data.doMessageInterruption && isSimpleChat(cur_msg)) {
    return chatRoomInterceptMessage(cur_msg, msg);
  }

  return chatRoomNormalMessage(msg);
}

export function orgasmMessage() {
  chatRoomAutoInterceptMessage(ElementValue("InputChat"), typedMoan("orgasm"), Player);
}

export function leaveMessage() {
  if (isSimpleChat(ElementValue("InputChat"))) chatRoomAutoInterceptMessage(ElementValue("InputChat"), " ");
}

export function activityMessage(dict: ActivityInfo, entry: ResponsesEntryModel | undefined) {
  const source = getCharacter(dict.SourceCharacter.MemberNumber);
  const response = typedResponse(entry?.responses);

  if (response.trim()[0] == "@") {
    return sendAction(response.slice(1), source);
  }

  const finalMessage = response/*  + moanDependingOnActivity(Player, entry?.responses, dict.ActivityName) */;

  chatRoomAutoInterceptMessage(ElementValue("InputChat"), finalMessage, source);
}

export function sendAction(action: string, sender: Character | null = null) {
  let msg = replaceTemplate(action, sender);
  ServerSend("ChatRoomChat", {
    Content: "Beep",
    Type: "Action",
    Dictionary: [
      { Tag: 'Beep', Text: 'msg' },
      { Tag: '发送私聊', Text: 'msg' },
      { Tag: '發送私聊', Text: 'msg' },
      { Tag: 'Biep', Text: 'msg' },
      { Tag: 'Sonner', Text: 'msg' },
      { Tag: 'Звуковой сигнал', Text: 'msg' },
      { Tag: "msg", Text: msg }
    ]
  });
}

function chatRoomInterceptMessage(cur_msg: string, msg: string) {
  if (!msg) return;
  ElementValue("InputChat", cur_msg + "... " + msg);
  ChatRoomSendChat();
}

function chatRoomNormalMessage(msg: string) {
  if (!msg) return;

  let backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
  ChatRoomSetTarget(-1);
  let oldmsg = ElementValue("InputChat");

  ElementValue("InputChat", msg);
  ChatRoomSendChat();
  ElementValue("InputChat", oldmsg);
  ChatRoomSetTarget(backupChatRoomTargetMemberNumber);
}

function replaceTemplate(msg: string, source?: Character) {
  const playerPronouns = CharacterPronounDescription(Player);
  const playerName = CharacterNickname(Player);

  const playerPronoun = playerPronouns === "She/Her" ? "she" : "he";
  const playerPossessive = playerPronouns === "She/Her" ? "her" : "his";
  const playerIntensive = playerPronouns === "She/Her" ? "her" : "him";

  const sourcePronounItem = CharacterPronounDescription(source);
  const sourceName = CharacterNickname(source);

  const sourcePronoun = sourcePronounItem === "She/Her" ? "she" : "he";
  const sourcePossessive = sourcePronounItem === "She/Her" ? "her" : "his";
  const sourceIntensive =
    sourceName === playerName ? (playerPronouns === "She/Her" ? "herself" : "himself") : sourcePronounItem === "She/Her" ? "her" : "him";

  return msg
    .replaceAll(/%TARGET%|Player/g, playerName)
    .replaceAll(/%TARGET_PRONOUN%|Pronoun/g, playerPronoun)
    .replaceAll(/%TARGET_POSSESIVE%|Possessive/g, playerPossessive)
    .replaceAll(/%TARGET_INTENSIVE%|Intensive/g, playerIntensive)
    .replaceAll(/%SOURCE%|Source/g, sourceName)
    .replaceAll(/%SOURCE_PRONOUN%|SourcePronoun/g, sourcePronoun)
    .replaceAll(/%SOURCE_POSSESIVE%|SourcePossessive/g, sourcePossessive)
    .replaceAll(/%SOURCE_INTENSIVE%|SourceIntensive/g, sourceIntensive);
}

function randomResponse(key: string[]) {
  const rnd = getRandomInt(key.length);

  return key[rnd] as string;
}

function typedMoan(moanType: "low" | "light" | "medium" | "hot" | "orgasm") {
  return randomResponse(PlayerStorage().ResponsesModule.extraResponses[moanType]);
}

function baseMoan(arousal: number | undefined) {
  if (!arousal) return "";
  let factor = Math.floor(arousal / 20);
  if (factor < 1) return ""; // skip wnen arousal is >=0 && < 20. too low as for me.
  if (factor > 4) return ""; // Skip when arousal is 100, cause that's orgasm
  const Tkeys: (keyof ExtraResponsesModel)[] = ["low", "low", "light", "medium", "hot", "hot"];
  let k = Tkeys[factor];

  return typedMoan(k);
}

function typedResponse(responses: string[]) {
  return randomResponse(responses);
}

/* function moanDependingOnActivity(C: Character, responses: string[] | undefined, act: string | undefined) {
  if (!C?.ArousalSettings) return;
  if (!responses) return;

  const doAddMoans = PlayerStorage().GlobalModule.doAddMoansOnHighArousal;
  if (!doAddMoans) return "";

  let actFactor = C.ArousalSettings.Activity.find((_) => _.Name === act)?.Self;
  if (!actFactor) return "";

  let threthold1 = Math.max(10, (4 - actFactor) * 25);
  let threthold2 = threthold1 + 40;
  let arousal = C.ArousalSettings.Progress;

  if (arousal <= threthold1) {
    return "";
  } else {
    if (!baseMoan(arousal)) return "";
    else {
      return "♥" + baseMoan(arousal) + "♥";
    }
  }
} */
