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
        ["mainmenu_title", "- BC Responsive -"],
        ["responses_title", "- Responses Settings -"],
        ["profiles_title", "- Profiles -"],
        ["settings_title", "- Settings -"],
        //mainmenu buttons and shit
        ["responsive_enable", "Toggle Responsive"],
        ["mainnemu_button_popup", "BC Responsive Settings"],
        ["responses_button", "Responses"],
        ["profiles_button", "Profiles"],
        ["settings_button", "Settings"],
        //profiles stuff
        ["profile_text", "Profile"],
        ["profile_save", "Save"],
        ["profile_load", "Load"],
        ["profile_delete", "Delete"],
        //settings section
        ["doShowNewVersion", "Show new version message?"],
        ["isLeaveMessageEnabled", "Enable leave message?"],
        ["isSharkBiteEnabled", "Enable LSCG Shark Bite Reaction?"],
        ["doInterceptMessage", "Enable message interruption?"],

        //inputs
        ["input_title_low", "Low"],
        ["input_title_light", "Light"],
        ["input_title_medium", "Medium"],
        ["input_title_hot", "Hot"],
        ["input_title_orgasm", "Orgasm"],
        ["input_title_pain", "Pain"],
        ["input_title_tickle", "Tickle"],
        ["input_title_boop", "Boop"],
        ["invalid_input", "Syntax Error"],
    ]);

    private static RUTextMap = new Map<string, string>([
        ["responsive_title", "- BC Responsive -"],
        ["setting_button_popup", "Настройки Responsive"],
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
            return this.CNTextMap.get(srcTag) || "";
        }
        else if (TranslationLanguage === 'RU') {
            return this.RUTextMap.get(srcTag) || "";
        }

        return this.ENTextMap.get(srcTag) || "";
    }
}