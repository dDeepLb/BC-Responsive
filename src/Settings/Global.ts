import { getModule } from "../Modules";
import { GlobalSettingsModel } from "./Models/Base";
import { GuiSubscreen, Setting } from "./SettingBase";

export class GuiGlobal extends GuiSubscreen {

    get name(): string {
        return "Settings";
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
                label: "Enable Responsive:",
                description: "Enable Responsive Features.",
                setting: () => this.settings.ResponsiveEnabled ?? false,
                setSetting: (val) => this.settings.ResponsiveEnabled = val
            }, <Setting>{
                type: "checkbox",
                label: "Enable Character Talk:",
                description: "Enables mouth moving when talking.",
                setting: () => this.settings.CharTalkEnabled ?? false,
                setSetting: (val) => this.settings.CharTalkEnabled = val
            }, <Setting>{
                type: "checkbox",
                label: "Interrupt messages:",
                description: "Sends written message adding response to it. Happens when response triggers.",
                setting: () => this.settings.doMessageInterruption ?? false,
                setSetting: (val) => this.settings.doMessageInterruption = val
            }, <Setting>{
                type: "checkbox",
                label: "Enable leave message:",
                description: "Sends message that you been writing when you leashed out of room.",
                setting: () => this.settings.doLeaveMessage ?? false,
                setSetting: (val) => this.settings.doLeaveMessage = val
            }, <Setting>{
                type: "checkbox",
                label: "Show new version message:",
                description: "Shows you message about new version when it's out.",
                setting: () => this.settings.doShowNewVersionMessage ?? false,
                setSetting: (val) => this.settings.doShowNewVersionMessage = val
            }
        ]
    }

    Load(): void {
        super.Load();
    }
}