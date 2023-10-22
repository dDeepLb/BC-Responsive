export type BaseSettingsModel = {
  ResponsiveEnabled: boolean;
}

export type GlobalSettingsModel = BaseSettingsModel & {
  CharTalkEnabled: boolean;
  doShowNewVersionMessage: boolean;
  doLeaveMessage: boolean;
  doMessageInterruption: boolean;
}
