import { GlobalSettingsModel } from './base';
import { ProfileEntryModel } from './personalities';
import { ResponsesSettingsModel } from './behaviours';

export type SettingsModel = {
  [x: string]: any;
  Version: string;
  GlobalModule: GlobalSettingsModel;
  ResponsesModule: ResponsesSettingsModel;
  ProfilesModule: ProfileEntryModel[];
};
