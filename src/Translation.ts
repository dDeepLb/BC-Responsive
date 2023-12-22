import { DebugMode } from "./Utilities/Definition";
import { conDebug } from "./Utilities/Console";
import { ModVersion } from "./Utilities/Definition";

export class Localization {
  private static ENTextMap = new Map<string, string>([
    // Responsive Button
    ["infosheet.button.responsive_popup", "Responsive Settings"],

    // MainMenu
    ["mainmenu.title", `- BC Responsive v${ModVersion} -`],

    ["mainmenu.button.settings", "Settings"],
    ["mainmenu.button.responses", "Responses"],
    ["mainmenu.button.profiles", "Profiles"],

    // Settings
    ["settings.title", "- Settings -"],

    ["settings.setting.responsive_enabled.name", "Enable Responsive:"],
    ["settings.setting.responsive_enabled.desc", "Enables Responsive features."],

    ["settings.setting.responsesEnabled.name", "Enable responses:"],
    ["settings.setting.responsesEnabled.desc", "Enables responses. When someone does some actions on you, it activates responses. Configurable in Responses settings."],

    ["settings.setting.chartalk_enabled.name", "Enable Character Talk:"],
    ["settings.setting.chartalk_enabled.desc", "Enables mouth moving when talking."],

    ["settings.setting.interruption_enabled.name", "Enable interruption:"],
    ["settings.setting.interruption_enabled.desc", "Sends written message adding response to it. Happens when response triggers."],

    ["settings.setting.leave_message_enabled.name", "Enable leave message:"],
    ["settings.setting.leave_message_enabled.desc", "Sends message that you've been writing when you leashed out of room."],

    ["settings.setting.doAddMoansOnHighArousal.name", "Do add moans on high arousal:"],
    ["settings.setting.doAddMoansOnHighArousal.desc", "If enabled adds moans in end of responses. Moans defined on 2 page in Responses settings."],

    ["settings.setting.doPreventMessageIfBcxBlock.name", "Prevent messages if BCX rule blocks:"],
    ["settings.setting.doPreventMessageIfBcxBlock.desc", "If enabled will prevent message sending if certain BCX rules are active."],

    ["settings.setting.new_version_message_enabled.name", "Enable new version message:"],
    ["settings.setting.new_version_message_enabled.desc", "Shows you message about new version when it's out."],

    // Responses
    ["responses.title", "- Responses -"],

    ["responses.setting.self_trigger.name", "Self Trigger:"],
    ["responses.setting.self_trigger.desc", "Defines if response will be triggered when you are doing action on yourself."],

    ["responses.setting.master_set.name", "Master Set:"],
    ["responses.setting.master_set.desc", "If checked, responses will be changed for all action in the entry"],

    ["responses.setting.responses.name", "Responses:"],
    ["responses.setting.responses.desc", "Responses that will be send when action is done on you. Leave empty for no response for this action"],

    ["responses.setting.low_response.name", "Low Arousal Response:"],
    ["responses.setting.low_response.desc", "Responses that will be added to action response when arousal is more or equals 20 and less than 40"],

    ["responses.setting.light_response.name", "Light Arousal Response:"],
    ["responses.setting.light_response.desc", "Responses that will be added to action response when arousal is more or equals 40 and below 60"],

    ["responses.setting.medium_response.name", "Medium Arousal Response:"],
    ["responses.setting.medium_response.desc", "Responses that will be added to action response when arousal is more or equals 60 and below 80"],

    ["responses.setting.hot_response.name", "Hot Arousal Response:"],
    ["responses.setting.hot_response.desc", "Responses that will be added to action response when arousal is more or equals 80 and less than 100"],

    ["responses.setting.orgasm_response.name", "Orgasm Response:"],
    ["responses.setting.orgasm_response.desc", "Responses that will be send when you're orgasming. Leave empty for no response for this"],

    ["responses.other.syntax_error", ""],

    // Profiles
    ["profiles.title", "- Profiles -"],

    ["profiles.button.save", "Save"],
    ["profiles.button.load", "Load"],
    ["profiles.button.delete", "Delete"],

    ["profiles.prompt", "Please, enter profile name."],
    ["profiles.text.profile", "Profile"],
    ["profiles.text.has_been_saved", "has been saved!"],
    ["profiles.text.needs_to_be_saved", "needs to be saved first!"],
    ["profiles.text.has_been_loaded", "has been loaded!"],
    ["profiles.text.has_been_deleted", "has been deleted!"],
    ["profiles.text.not_saved_or_already_deleted", "is not saved or already deleted!"],

    // Reset
    ["reset.label.perma_reset_of_bcr_data", "- Permanent reset of ALL Responsive data -"],
    ["reset.label.warning", "- Warning -"],
    ["reset.label.if_u_confirm_perma_reset", "If you confirm, all Responsive data (including settings, responses and profiles) will be permanently reset!"],
    ["reset.label.youll_able_to_use_bcr", "You will be able to continue using Responsive, but all of your configuration will be reset to default!"],
    ["reset.label.action_cannot_be_undone", "This action cannot be undone!"],

    ["reset.button.confirm", "Confirm"],
    ["reset.button.cancel", "Cancel"],

    ["reset.setting.reset_for_manual_setting.text", "Do manual reset:"],
    ["reset.setting.reset_settings.text", "Do reset settings:"],
    ["reset.setting.reset_responses.text", "Do reset responses:"],
    ["reset.setting.reset_profiles.text", "Do reset profiles:"],

    ["reset.setting.reset_for_manual_setting.desc", "Resets everything to state that you could configure everything from the start."],
    ["reset.setting.reset_settings.desc", "Erases settings and then resets them to default ones."],
    ["reset.setting.reset_responses.desc", "Erases responses and then resets them to default ones."],
    ["reset.setting.reset_profiles.desc", "Erases profiles."],

    // Support
    ["support.title", "- Support -"],
    ["support.button.ko-fi", "Ko-fi"],
    ["support.button.patreon", "Patreon"],
    ["support.other.thankyou", "Thank you"]
  ]);

  private static CNTextMap = new Map<string, string>([]);

  private static RUTextMap = new Map<string, string>([]);

  static getText(srcTag: string) {
    if (DebugMode) Localization.logSrcTags(srcTag);
    return this[`${TranslationLanguage}TextMap`]?.get(srcTag) || this.ENTextMap?.get(srcTag) || srcTag || "";
  }

  static logSrcTags(srcTag: string) {
    if (!this[`${TranslationLanguage}TextMap`]?.get(srcTag)) {
      conDebug(`${srcTag} is not translated`);
    }
  }
}

export const getText = (string: string) => Localization.getText(string);
