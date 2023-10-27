import { BaseSettingsModel } from "./Base";

export type ResponsesSettingsModel = BaseSettingsModel & {
  mainResponses: ResponsesEntryModel[];
  extraResponses: ExtraResponsesModel;
};

export type ResponsesEntryModel = {
  name: string;
  group: string[];
  responses: string[];
  selfTrigger?: boolean;
};

export type ExtraResponsesModel = {
  low: string[];
  light: string[];
  medium: string[];
  hot: string[];
  orgasm: string[];
};
