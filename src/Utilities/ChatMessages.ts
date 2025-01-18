import { sendActionMessage } from 'bc-deeplib';
import { ResponsesEntryModel } from '../Models/Responses';
import { PlayerStorage } from './Data';
import { getCharacter, getRandomInt } from './Other';

export function activityDeconstruct(dict: _ChatMessageDictionary): ActivityInfo | undefined {
  let SourceCharacter, TargetCharacter, ActivityGroup, ActivityName;
  for (const v of dict) {
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
    ChatRoomTargetMemberNumber == null &&
    !msg.startsWith('/') &&
    !msg.startsWith('(') &&
    !msg.startsWith('*') &&
    !msg.startsWith('!') &&
    !msg.startsWith('.') &&
    !msg.startsWith('@') &&
    !msg.startsWith('http')
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function chatRoomAutoInterceptMessage(cur_msg: string, msg?: string, source?: Character) {
  if (!msg) return;

  const data = PlayerStorage().GlobalModule;
  if (data.doMessageInterruption && isSimpleChat(cur_msg)) {
    return chatRoomInterceptMessage(cur_msg, msg);
  }

  return chatRoomNormalMessage(msg);
}

export function leaveMessage() {
  if (isSimpleChat(ElementValue('InputChat'))) chatRoomAutoInterceptMessage(ElementValue('InputChat'), ' ');
}

export function activityMessage(dict: ActivityInfo, entry: ResponsesEntryModel | undefined) {
  const source = getCharacter(dict.SourceCharacter.MemberNumber);
  if (entry === undefined) return;
  // FIXME
  // @ts-expect-error: shut up for now
  const response = typedResponse(entry?.response.map(res => res.content ?? '') || []);

  if (response.trim()[0] == '@') {
    return sendActionMessage(response.slice(1), source?.MemberNumber);
  }

  const finalMessage = response;

  chatRoomAutoInterceptMessage(ElementValue('InputChat'), finalMessage, source);
}

function chatRoomInterceptMessage(cur_msg: string, msg: string) {
  if (!msg) return;
  ElementValue('InputChat', cur_msg + '... ' + msg);
  ChatRoomSendChat();
}

function chatRoomNormalMessage(msg: string) {
  if (!msg) return;

  const backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
  ChatRoomSetTarget(-1);
  const oldmsg = ElementValue('InputChat');

  ElementValue('InputChat', msg);
  ChatRoomSendChat();
  ElementValue('InputChat', oldmsg);
  ChatRoomSetTarget(backupChatRoomTargetMemberNumber);
}

function replaceTemplate(msg: string, source?: Character) {
  const playerPronouns = CharacterPronounDescription(Player);
  const playerName = CharacterNickname(Player);

  const playerPronoun = playerPronouns === 'She/Her' ? 'she' : 'he';
  const playerPossessive = playerPronouns === 'She/Her' ? 'her' : 'his';
  const playerIntensive = playerPronouns === 'She/Her' ? 'her' : 'him';

  let sourceName = '';
  let sourcePronoun = '';
  let sourcePossessive = '';
  let sourceIntensive = '';
  if (source) {
    const sourcePronounItem = CharacterPronounDescription(source);
    sourceName = CharacterNickname(source);
  
    sourcePronoun = sourcePronounItem === 'She/Her' ? 'she' : 'he';
    sourcePossessive = sourcePronounItem === 'She/Her' ? 'her' : 'his';
    sourceIntensive =
      sourceName === playerName ? (playerPronouns === 'She/Her' ? 'herself' : 'himself') : sourcePronounItem === 'She/Her' ? 'her' : 'him';
  }

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

function typedResponse(responses: string[]) {
  return randomResponse(responses);
}
