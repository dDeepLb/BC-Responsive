import { BaseSettingsModel } from "./Base";

export interface ProfilesSettingsModel extends BaseSettingsModel {
    profiles: ProfileEntryModel[];
}

export interface ProfileEntryModel {
    name: string;
    data: string;
}