import { BaseSettingsModel } from 'bc-deeplib';

export type ResponsesSettingsModel = BaseSettingsModel & ResponsesEntryModel[];

export type EntryTriggerType = 'Speech' | 'Emote' | 'Action' | 'Event';
export type EntryResponseType = 'Speech' | 'Emote' | 'Action' | 'EmoteSelf' | 'ActionSelf' | 'Animation' | 'ApiCall' | 'Notification';
export type EntryTriggerDirection = 'Incoming' | 'Outgoing' | 'Both';
export type EntryTriggerKnownMetadata = 'Activity' | 'Group';

export type EntryTrigger = {
  type: EntryTriggerType;
  content?: string;
  direction: EntryTriggerDirection;
};

export type EntryResponse = {
  type: EntryResponseType;
  content?: string;
  delayMs?: number;
};

export type ResponsesEntryModel = {
  name: string;
  guid: string;
  isEnabled: boolean;
  trigger: EntryTrigger[];
  response: EntryResponse[];
  metadata?: Record<EntryTriggerKnownMetadata | string, any>;
};
