import { GlobalSettingsModel } from "./Base";
import { ProfileEntryModel } from "./Profiles";
import { ResponsesSettingsModel } from "./Responses";

export type SettingsModel = {
    [x: string]: any;
    Version: string;
    GlobalModule: GlobalSettingsModel;
    ResponsesModule: ResponsesSettingsModel;
    ProfilesModule: ProfileEntryModel[];
}