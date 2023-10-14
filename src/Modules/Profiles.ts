import { BaseModule } from "../Base";
import { ProfilesSettingsModel } from "../Settings/Models/Profiles";
import { ResponsesSettingsModel } from "../Settings/Models/Responses";
import { GuiProfiles } from "../Settings/Profiles";
import { GuiResponses } from "../Settings/Responses";
import { Subscreen } from "../Settings/SettingDefinitions";

export class ProfilesModule extends BaseModule {
    get settings(): ProfilesSettingsModel {
        return super.settings as ProfilesSettingsModel;
    }

    get settingsScreen(): Subscreen | null {
        return GuiProfiles;
    }

    get defaultSettings() {
        return <ProfilesSettingsModel><unknown>{
            profiles: {}
        };
    }

    Load(): void {

    }

    Run(): void {
    }
}