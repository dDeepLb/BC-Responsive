import { BaseSettingsModel } from 'bc-deeplib/deeplib';

export type GlobalSettingsModel = BaseSettingsModel & {
  responsesEnabled: boolean;
  charTalkEnabled: boolean;
  doLeaveMessage: boolean;
  doAddMoansOnHighArousal: boolean;
  doPreventMessageIfBcxBlock: boolean;
  doMessageInterruption: boolean;
};
