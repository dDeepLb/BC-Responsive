export type BaseSettingsModel = {
  ResponsiveEnabled: boolean;
};

export type GlobalSettingsModel = BaseSettingsModel & {
  responsesEnabled: boolean;
  CharTalkEnabled: boolean;
  doShowNewVersionMessage: boolean;
  doLeaveMessage: boolean;
  doMessageInterruption: boolean;
};
