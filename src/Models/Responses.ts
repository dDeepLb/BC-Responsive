import { BaseSettingsModel } from 'bc-deeplib';

// #region Triggers
export type EntryTriggerType = 'speech' | 'emote' | 'action' | 'activity';
export type EntryTriggerDirection = 'incoming' | 'outgoing' | 'both';
export type EntryTriggerConditions = {
  mode: 'all' | 'any' | 'none';
  room?: {
    name: string[] | undefined;
    inverted: boolean;
  },
  role?: {
    role: ('owner' | 'lover' | 'sub' | 'friend' | 'whitelist' | 'dominant')[] | undefined;
    inverted: boolean;
  },
  member?: {
    memberNumber: number[] | undefined;
    inverted: boolean;
  },
  arousal: {
    moreThan: number | undefined;
    lessThan: number | undefined;
  };
};

type BaseTrigger = {
  type: EntryTriggerType;
  direction: EntryTriggerDirection;
  conditions?: EntryTriggerConditions;
};

interface SpeechTrigger extends BaseTrigger {
  type: 'speech';
  content: string | RegExp;
  direction: EntryTriggerDirection;
  conditions?: EntryTriggerConditions;
}

interface EmoteTrigger extends BaseTrigger {
  type: 'emote';
  content: string | RegExp;
  direction: EntryTriggerDirection;
  conditions?: EntryTriggerConditions;
}

interface ActionTrigger extends BaseTrigger {
  type: 'action';
  content: string | RegExp;
  direction: EntryTriggerDirection;
  conditions?: EntryTriggerConditions;
}

interface ActivityTrigger extends BaseTrigger {
  type: 'activity';
  groupName: string[];
  activityName: string[];
  direction: EntryTriggerDirection;
  conditions?: EntryTriggerConditions;
}

export type EntryTrigger = SpeechTrigger | EmoteTrigger | ActionTrigger | ActivityTrigger;
// #endregion Triggers

// #region Responses
export type EntryResponseType = 'speech' | 'emote' | 'action';
export type ResponseRpMode = 'personal' | 'global';

type BaseResponse = {
  type: EntryResponseType;
  content?: string[];
  delayMs?: number;
};

interface SpeechResponse extends BaseResponse {
  type: 'speech';
  content: string[];
  delayMs?: number;
}

interface EmoteResponse extends BaseResponse {
  type: 'emote';
  mode: ResponseRpMode;
  content: string[];
  delayMs?: number;
}

interface ActionResponse extends BaseResponse {
  type: 'action';
  mode: ResponseRpMode;
  content: string[];
  delayMs?: number;
}

export type EntryResponse = SpeechResponse | EmoteResponse | ActionResponse;
// #endregion Responses

export type ResponsesEntryModel = {
  name: string;
  readonly guid: string;
  isEnabled: boolean;
  priority: number;
  trigger: EntryTrigger[];
  response: EntryResponse[];
  conditions?: EntryTriggerConditions;
};

export type ResponsesSettingsModel = BaseSettingsModel & ResponsesEntryModel[];
