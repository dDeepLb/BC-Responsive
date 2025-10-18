import { GlobalSettingsModel } from './base';
import { ResponsesSettingsModel } from './responses';
import { BaseSettingsModel } from 'bc-deeplib/deeplib';

export type ProfilesSettingsModel = BaseSettingsModel & {
  [index: number]: ProfileEntryModel[];
};

export type ProfileEntryModel = {
  [index: number]: ProfileEntryModel;
  name: string;
  data: ProfileSaveModel;
};

export type ProfileSaveModel = {
  GlobalModule: GlobalSettingsModel;
  ResponsesModule: ResponsesSettingsModel;
};

export type ProfileNames = {
  [index: number]: string | null;
};
