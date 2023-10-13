import { BaseSettingsModel, GlobalSettingsModel } from "./Base";
import { ProfilesSettingsModel } from "./Profiles";
import { ResponsesSettingsModel } from "./Responses";

export interface SettingsModel {
    Version: string;
    GlobalModule: GlobalSettingsModel;
    ResponsesModule: ResponsesSettingsModel;
    ProfilesModule: ProfilesSettingsModel;
}
