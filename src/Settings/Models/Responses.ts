import { BaseSettingsModel } from "./Base";

export interface ResponsesSettingsModel extends BaseSettingsModel {
  mainResponses: ResponsesEntryModel[];
  extraResponses: ExtraResponsesModel;
}

export interface ResponsesEntryModel {
  name: string;
  group: string;
  responses: string[];
  selfTrigger?: boolean;
}

export interface ExtraResponsesModel {
  low: string[];
  light: string[];
  medium: string[];
  hot: string[];
  orgasm: string[];
}