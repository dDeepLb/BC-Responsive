import { BaseSettingsModel, GlobalSettingsModel } from "./Base";
import { ProfileEntryModel, ProfilesSettingsModel } from "./Profiles";
import { ResponsesSettingsModel } from "./Responses";

export interface SettingsModel {
    [x: string]: any;
    Version: string;
    GlobalModule: GlobalSettingsModel;
    ResponsesModule: ResponsesSettingsModel;
    ProfilesModule: ProfileEntryModel[];
}