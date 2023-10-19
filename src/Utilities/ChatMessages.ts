export function ActivityDeconstruct(dict: _ChatMessageDictionary): ActivityInfo | undefined {
  let SourceCharacter, TargetCharacter, ActivityGroup, ActivityName;
  for (let v of dict) {
    if (v.TargetCharacter) TargetCharacter = { MemberNumber: v.TargetCharacter };
    else if (v.SourceCharacter) SourceCharacter = { MemberNumber: v.SourceCharacter };
    else if (v.FocusGroupName) ActivityGroup = v.FocusGroupName;
    else if (v.ActivityName) ActivityName = v.ActivityName;
  }
  if (SourceCharacter === undefined || TargetCharacter === undefined || ActivityGroup === undefined || ActivityName === undefined) return undefined;
  return { SourceCharacter, TargetCharacter, ActivityGroup, ActivityName };
}

export function IsSimpleChat(msg: string) {
  return (
    msg.trim().length > 0 && !msg.startsWith("/") && !msg.startsWith("(") && !msg.startsWith("*") && !msg.startsWith("!") && !msg.startsWith(".") && !msg.startsWith("@") && !msg.startsWith("https")
  );
}

function ChatRoomInterceptMessage(cur_msg: string, msg: string) {
  if (!msg) return;
  ElementValue("InputChat", cur_msg + "... " + msg);
  ChatRoomSendChat();
}

function ChatRoomNormalMessage(msg: string) {
  if (!msg) return;
  let backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
  ChatRoomTargetMemberNumber = null;
  let oldmsg = ElementValue("InputChat");
  ElementValue("InputChat", msg);
  ChatRoomSendChat();
  ElementValue("InputChat", oldmsg);
  ChatRoomTargetMemberNumber = backupChatRoomTargetMemberNumber;
}

export function ChatRoomAutoInterceptMessage(cur_msg: string, msg: string | undefined, target?: Character, sender?: Character) {
  if (!msg) return;
  msg = ReplaceTemplate(msg, target, sender);

  const data = Player.BCResponsive.GlobalModule;
  if (data.doMessageInterruption && IsSimpleChat(cur_msg) && ChatRoomTargetMemberNumber == null) {
    return ChatRoomInterceptMessage(cur_msg, msg);
  }

  ChatRoomNormalMessage(msg);
}

function ReplaceTemplate(msg: string, target: Character | undefined, source: Character | undefined) {
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
  const sourceIntensive = sourceName === targetName
    ? (targetPronouns === "She/Her" ? "herself" : "himself")
    : (targetPronouns === "She/Her" ? "her" : "him");


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