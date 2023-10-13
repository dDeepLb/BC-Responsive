import { ResponsiveVersion } from "./SDK";

export class Localization {
    private static CNTextMap = new Map<string, string>([
        ["responsive_setting_title", "- BC Responsive 设置 -"],
        ["setting_button_popup", "BC Responsive 设置"],
        ["setting_enable", "启用 Responsive"],
        ["setting_title_low", "低性奋"],
        ["setting_title_light", "微弱性奋"],
        ["setting_title_medium", "中等性奋"],
        ["setting_title_hot", "热烈性奋"],
        ["setting_title_orgasm", "高潮"],
        ["setting_title_pain", "痛苦"],
        ["setting_title_tickle", "瘙痒"],
        ["setting_input_invalid", "格式错误"],
    ]);

    private static ENTextMap = new Map<string, string>([
        /*
        ["", ""],
        */
        //titles
        ["title_mainmenu", `- BC Responsive v${ResponsiveVersion} -`],
        ["title_responses", "- Responses Settings -"],
        ["title_profiles", "- Profiles -"],
        ["title_settings", "- Settings -"],
        //mainmenu buttons and shit
        ["responsive_enable", "Enable Responsive?"],
        ["button_mainmenu_popup", "BC Responsive Settings"],
        ["button_responses", "Responses"],
        ["button_profiles", "Profiles"],
        ["button_settings", "Settings"],
        //profiles stuff
        ["profile_text", "Profile"],
        ["label_profile_save", "Save"],
        ["label_profile_load", "Load"],
        ["label_profile_delete", "Delete"],
        //settings section
        ["setting_doShowNewVersion", "Show new version message?"],
        ["setting_isLeaveMessageEnabled", "Enable leave message?"],
        ["setting_isSharkBiteEnabled", "Enable LSCG Shark Bite Reaction?"],
        ["setting_doInterceptMessage", "Enable message interruption?"],
        ["setting_doEnableCharTalk", "Enable Character Talk?"],
        //inputs
        ["input_title_low", "Low"],
        ["input_title_light", "Light"],
        ["input_title_medium", "Medium"],
        ["input_title_hot", "Hot"],
        ["input_title_orgasm", "Orgasm"],
        ["input_title_pain", "Pain"],
        ["input_title_tickle", "Tickle"],
        ["input_title_boop", "Boop"],
        ["input_invalid", "Syntax Error"],
    ]);

    private static RUTextMap = new Map<string, string>([
        ["mainmenu_title", "- BC Responsive -"],
        ["setting_button_popup", "Настройки Responsive"],
        ["responsive_enable", "Toggle Responsive"],
        ["mainmenu_button_popup", "BC Responsive Settings"],
        ["responses_button", "Ответы"],
        ["profiles_button", "Профили"],
        ["settings_button", "Settings"],
        ["setting_enable", "Включить Responsive"],
        ["setting_input_low", "Низк."],
        ["setting_input_light", "Легк."],
        ["setting_input_medium", "Средн."],
        ["setting_input_hot", "Высок."],
        ["setting_input_orgasm", "Оргазм"],
        ["setting_input_pain", "Боль"],
        ["setting_input_tickle", "Щекотка"],
        ["setting_input_invalid", "Синтакс. ошибка"],
    ]);

    static GetText(srcTag: string) {
        if (TranslationLanguage === 'CN') {
            return this.CNTextMap.get(srcTag) || this.ENTextMap.get(srcTag) as string;
        }

        else if (TranslationLanguage === 'RU') {
            return this.RUTextMap.get(srcTag) || this.ENTextMap.get(srcTag) as string;
        }

        return this.ENTextMap.get(srcTag) || srcTag;
    }
}