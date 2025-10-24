import { BaseSettingsModel } from 'bc-deeplib/deeplib';

// #region Triggers
export type TriggerType = 'speech' | 'emote' | 'action' | 'activity';
export type TriggerDirection = 'incoming' | 'outgoing' | 'both';
export type TriggerConditions = {
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
  type: TriggerType;
  direction: TriggerDirection;
  conditions?: TriggerConditions;
};

interface SpeechTrigger extends BaseTrigger {
  type: 'speech';
  content: string | RegExp;
  direction: TriggerDirection;
  conditions?: TriggerConditions;
}

interface EmoteTrigger extends BaseTrigger {
  type: 'emote';
  content: string | RegExp;
  direction: TriggerDirection;
  conditions?: TriggerConditions;
}

interface ActionTrigger extends BaseTrigger {
  type: 'action';
  content: string | RegExp;
  direction: TriggerDirection;
  conditions?: TriggerConditions;
}

interface ActivityTrigger extends BaseTrigger {
  type: 'activity';
  groupName: AssetGroupItemName[] | undefined;
  activityName: ActivityName[] | undefined;
  direction: TriggerDirection;
  conditions?: TriggerConditions;
}

export type EntryTrigger = SpeechTrigger | EmoteTrigger | ActionTrigger | ActivityTrigger;
// #endregion Triggers

// #region Reactions
export type ReactionType = 'speech' | 'emote' | 'action';
export type ReactionRpMode = 'personal' | 'global';

type BaseReaction = {
  type: ReactionType;
  content?: string[];
  delayMs?: number;
};

interface SpeechReaction extends BaseReaction {
  type: 'speech';
  content: string[];
  delayMs?: number;
}

interface EmoteReaction extends BaseReaction {
  type: 'emote';
  mode: ReactionRpMode;
  content: string[];
  delayMs?: number;
}

interface ActionReaction extends BaseReaction {
  type: 'action';
  mode: ReactionRpMode;
  content: string[];
  delayMs?: number;
}

export type EntryReaction = SpeechReaction | EmoteReaction | ActionReaction;
// #endregion Reactions

export type BehaviorEntryModel = {
  name: string;
  readonly guid: string;
  isEnabled: boolean;
  priority: number;
  trigger: EntryTrigger[];
  reaction: EntryReaction[];
  conditions?: TriggerConditions;
};

export interface ResponsesSettingsModel extends BaseSettingsModel {
  behaviors: Record<string, BehaviorEntryModel>;
};

interface BehaviorRuntimeIndex {
  byType: Record<TriggerType, BehaviorEntryModel[]>;
}
