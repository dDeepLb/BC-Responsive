type _ChatMessageDictionaryEntry = {
  [k: string]: any;
  Tag?: CommonChatTags | string;
  Text?: string;
  MemberNumber?: number;
};

type _ChatMessageDictionary = _ChatMessageDictionaryEntry[];

type ActivityInfo = {
  sourceCharacter: Character;
  targetCharacter: Character;
  groupName: string;
  activityName: string;
};
