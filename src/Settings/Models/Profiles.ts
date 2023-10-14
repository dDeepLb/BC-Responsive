import { BaseSettingsModel, GlobalSettingsModel } from "./Base";
import { ResponsesSettingsModel } from "./Responses";

export interface ProfilesSettingsModel extends BaseSettingsModel {
    [index: number]: string
    index: ProfileEntryModel[];
}

export interface ProfileEntryModel {
    [index: number]: ProfileEntryModel;
    name: string;
    data: object;
}

export interface ProfileSaveModel {
    GlobalModule: GlobalSettingsModel;
    ResponsesModule: ResponsesSettingsModel;
}