import { modStorage, sendActionMessage } from 'bc-deeplib/deeplib';
import { BehaviorEntryModel } from '../models/behaviours';
import { getCharacter, getRandomInt } from './other';
import { GlobalSettingsModel } from '_/models/base';

type ActivityInfo = {
  SourceCharacter: number;
  TargetCharacter: number;
  ActivityGroup: string;
  ActivityName: string;
};

export function isSimpleChat(msg: string) {
  return (
    msg.trim().length > 0 &&
    ChatRoomTargetMemberNumber === -1 &&
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

  const data = modStorage.playerStorage.GlobalModule as GlobalSettingsModel;
  if (data.doMessageInterruption && isSimpleChat(cur_msg)) {
    return chatRoomInterceptMessage(cur_msg, msg);
  }

  return chatRoomNormalMessage(msg);
}

export function leaveMessage() {
  if (isSimpleChat(ElementValue('InputChat'))) chatRoomAutoInterceptMessage(ElementValue('InputChat'), ' ');
}

export function activityMessage(dict: ActivityInfo, entry: BehaviorEntryModel | undefined) {
  const source = getCharacter(dict.SourceCharacter);
  if (entry === undefined) return;
  // FIXME
  // @ts-expect-error: shut up for now
  const response = typedResponse(entry?.reaction.map(res => res.content ?? '') || []);

  if (response.trim()[0] === '@') {
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

export function onActivity(
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, dictionary: IChatRoomMessageMetadata | undefined) => void
) {
  ChatRoomRegisterMessageHandler({
    Priority: 500,
    Callback(data, sender, msg, metadata) {
      if (data.Type === 'Activity')
        callback(data, sender, msg, metadata);

      return false;
    },
  });
}

export function onWhisper(
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, dictionary: IChatRoomMessageMetadata | undefined) => void
) {
  ChatRoomRegisterMessageHandler({
    Priority: 500,
    Callback(data, sender, msg, metadata) {
      if (data.Type === 'Whisper')
        callback(data, sender, msg, metadata);

      return false;
    },
  });
}

export function onChat(
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, dictionary: IChatRoomMessageMetadata | undefined) => void
) {
  ChatRoomRegisterMessageHandler({
    Priority: 500,
    Callback(data, sender, msg, metadata) {
      if (data.Type === 'Chat')
        callback(data, sender, msg, metadata);

      return false;
    },
  });
}

export function onChatOrWhisper(
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, dictionary: IChatRoomMessageMetadata | undefined) => void
) {
  ChatRoomRegisterMessageHandler({
    Priority: 500,
    Callback(data, sender, msg, metadata) {
      if (data.Type === 'Chat' || data.Type === 'Whisper')
        callback(data, sender, msg, metadata);

      return false;
    },
  });
}

export function onAction(
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, dictionary: IChatRoomMessageMetadata | undefined) => void
) {
  ChatRoomRegisterMessageHandler({
    Priority: 500,
    Callback(data, sender, msg, metadata) {
      if (data.Type === 'Action')
        callback(data, sender, msg, metadata);

      return false;
    },
  });
}

export function onEmote(
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, dictionary: IChatRoomMessageMetadata | undefined) => void
) {
  ChatRoomRegisterMessageHandler({
    Priority: 500,
    Callback(data, sender, msg, metadata) {
      if (data.Type === 'Emote')
        callback(data, sender, msg, metadata);

      return false;
    },
  });
}

export function onActionOrEmote(
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, dictionary: IChatRoomMessageMetadata | undefined) => void
) {
  ChatRoomRegisterMessageHandler({
    Priority: 500,
    Callback(data, sender, msg, metadata) {
      if (data.Type === 'Action' || data.Type === 'Emote')
        callback(data, sender, msg, metadata);

      return false;
    },
  });
}