import { DebugMode } from "../Definition";
import { conDebug, conLog } from "./Console";
import { ModVersion } from "./SDK";

export class Localization {
    private static ENTextMap = new Map<string, string>([
        /*
        ["", ""],
        */
        // Responsive Button
        ["screen.infosheet.button.responsive_popup", "Responsive Settings"],
        // MainMenu
        ["screen.mainmenu.title", `- BC Responsive v${ModVersion} -`],
        ["screen.mainmenu.button.settings", "Settings"],
        ["screen.mainmenu.button.responses", "Responses"],
        ["screen.mainmenu.button.profiles", "Profiles"],
        // Settings
        ["screen.settings.title", "- Settings -"],
        ["screen.settings.setting.responsive_enabled.name", "Enable Responsive:"],
        ["screen.settings.setting.responsive_enabled.desc", "Enables Responsive features."],
        ["screen.settings.setting.chartalk_enabled.name", "Enable Character Talk:"],
        ["screen.settings.setting.chartalk_enabled.desc", "Enables mouth moving when talking."],
        ["screen.settings.setting.interruption_enabled.name", "Enable interruption:"],
        ["screen.settings.setting.interruption_enabled.desc", "Sends written message adding response to it. Happens when response triggers."],
        ["screen.settings.setting.leave_message_enabled.name", "Enable leave message:"],
        ["screen.settings.setting.leave_message_enabled.desc", "Sends message that you've been writing when you leashed out of room."],
        ["screen.settings.setting.new_version_message_enabled.name", "Enable new version message:"],
        ["screen.settings.setting.new_version_message_enabled.desc", "Shows you message about new version when it's out."],
        // Responses
        ["screen.responses.title", "- Responses -"],
        ["screen.responses.setting.self_trigger.name", "Self Trigger:"],
        ["screen.responses.setting.self_trigger.desc", "Defines if response will be triggered when you are doing action on yourself."],
        ["screen.responses.setting.responses.name", "Responses:"],
        ["screen.responses.setting.responses.desc", "Responses that will be send when action is done on you. Leave empty for no response for this action"],
        ["screen.responses.setting.low_response.name", "Low Arousal Response:"],
        ["screen.responses.setting.low_response.desc", "Responses that will be added to action response when arousal is more or equals 20 and less than 40"],
        ["screen.responses.setting.light_response.name", "Light Arousal Response:"],
        ["screen.responses.setting.light_response.desc", "Responses that will be added to action response when arousal is more or equals 40 and below 60"],
        ["screen.responses.setting.medium_response.name", "Medium Arousal Response:"],
        ["screen.responses.setting.medium_response.desc", "Responses that will be added to action response when arousal is more or equals 60 and below 80"],
        ["screen.responses.setting.hot_response.name", "Hot Arousal Response:"],
        ["screen.responses.setting.hot_response.desc", "Responses that will be added to action response when arousal is more or equals 80 and less than 100"],
        ["screen.responses.setting.orgasm_response.name", "Orgasm Response:"],
        ["screen.responses.setting.orgasm_response.desc", "Responses that will be send when you're orgasming. Leave empty for no response for this"],
        ["screen.responses.other.syntax_error", ""],

        // Profiles
        ["screen.profiles.title", "- Profiles -"],
        ["screen.profiles.text.profile", "Profile"],
        ["screen.profiles.button.save", "Save"],
        ["screen.profiles.button.load", "Load"],
        ["screen.profiles.button.delete", "Delete"],

        ["screen.profiles.prompt", "Please, enter profile name."],
        // Reset
        ["screen.reset.label.perma_reset_of_bcr_data", "- Permanent reset of ALL Responsive data -"],
        ["screen.reset.label.warning", "- Warning -"],
        ["screen.reset.label.if_u_confirm_perma_reset", "If you confirm, all Responsive data (including settings, responses and profiles) will be permanently reset!"],
        ["screen.reset.label.youll_able_to_use_bcr", "You will be able to continue using Responsive, but all of your configuration will be reset to default!"],
        ["screen.reset.label.action_cannot_be_undone", "This action cannot be undone!"],
        ["screen.reset.button.confirm", "Confirm"],
        ["screen.reset.button.cancel", "Cancel"],
        ["screen.reset.setting.reset_settings", "Do reset settings:"],
        ["screen.reset.setting.reset_responses", "Do reset responses:"],
        ["screen.reset.setting.reset_profiles", "Do reset profiles:"],
        // Support
        ["screen.support.title", "- Support -"],
        ["screen.support.button.ko-fi", "Ko-fi"],
        ["screen.support.button.patreon", "Patreon"],
        ["screen.support.other.thankyou", "Thank you"],
    ]);

    private static CNTextMap = new Map<string, string>([
    ]);

    private static RUTextMap = new Map<string, string>([
    ]);

    static getText(srcTag: string) {
        if (DebugMode) Localization.logSrcTags(srcTag);
        return this[`${TranslationLanguage}TextMap`].get(srcTag) || this.ENTextMap.get(srcTag) || srcTag;
    }

    static logSrcTags(srcTag: string) {
        if (!this[`${TranslationLanguage}TextMap`].get(srcTag)) {
            conDebug(`${srcTag} is not translated`)
        }
    }
}

export const getText = (string: string) => Localization.getText(string)
