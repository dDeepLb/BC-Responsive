export interface BaseSettingsModel {
  ResponsiveEnabled: boolean;
}

export interface GlobalSettingsModel extends BaseSettingsModel {
  CharTalkEnabled: boolean;
  doShowNewVersionMessage: boolean;
  doLeaveMessage: boolean;
  doMessageInterruption: boolean;
}
