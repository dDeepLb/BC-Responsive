import { Setting } from "../../.types/setting";
import { GuiSubscreen } from "../Base/BaseSetting";
import { GlobalSettingsModel } from "../Models/Base";

export class GuiGlobal extends GuiSubscreen {

    get name(): string {
        return "settings";
    }

    get icon(): string {
        return "Icons/Preference.png";
    }

    get settings(): GlobalSettingsModel {
        return super.settings as GlobalSettingsModel;
    }

    get structure(): Setting[] {
        return [
            <Setting>{
                type: "checkbox",
                label: "screen.settings.setting.responsive_enabled.name",
                description: "screen.settings.setting.responsive_enabled.desc",
                setting: () => this.settings?.ResponsiveEnabled ?? true,
                setSetting: (val) => this.settings.ResponsiveEnabled = val
            }, <Setting>{
                type: "checkbox",
                label: "screen.settings.setting.chartalk_enabled.name",
                description: "screen.settings.setting.chartalk_enabled.desc",
                setting: () => this.settings?.CharTalkEnabled ?? true,
                setSetting: (val) => this.settings.CharTalkEnabled = val
            }, <Setting>{
                type: "checkbox",
                label: "screen.settings.setting.interruption_enabled.name",
                description: "screen.settings.setting.interruption_enabled.desc",
                setting: () => this.settings?.doMessageInterruption ?? true,
                setSetting: (val) => this.settings.doMessageInterruption = val
            }, <Setting>{
                type: "checkbox",
                label: "screen.settings.setting.leave_message_enabled.name",
                description: "screen.settings.setting.leave_message_enabled.desc",
                setting: () => this.settings?.doLeaveMessage ?? true,
                setSetting: (val) => this.settings.doLeaveMessage = val
            }, <Setting>{
                type: "checkbox",
                label: "screen.settings.setting.new_version_message_enabled.name",
                description: "screen.settings.setting.new_version_message_enabled.desc",
                setting: () => this.settings?.doShowNewVersionMessage ?? true,
                setSetting: (val) => this.settings.doShowNewVersionMessage = val
            }
        ]
    }

    Load(): void {
        super.Load();
    }
}