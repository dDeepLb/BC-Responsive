import { BaseModule } from "../Base/BaseModule";
import { animateSpeech } from "../CharTalk";
import { MT } from "../Definition";
import { GuiGlobal } from "../Settings/Global";
import { GlobalSettingsModel } from "../Models/Base";
import { Subscreen } from "../Base/SettingDefinitions";
import { isSimpleChat } from "../Utilities/ChatMessages";
import { leaveHandle, orgasmHandle } from "../Utilities/Handles";
import { BCR_NEW_VERSION, sendLocalSmart } from "../Utilities/Messages";
import { hookFunction, HookPriority, ModVersion, ModuleCategory } from "../Utilities/SDK";

export class GlobalModule extends BaseModule {

    isItNewVersion: boolean = false;

    isOrgasm: boolean = false;
    doAnimate: boolean = true;

    get settingsScreen(): Subscreen | null {
        return GuiGlobal;
    }

    get settings(): GlobalSettingsModel {
        return super.settings as GlobalSettingsModel;
    }

    get defaultSettings() {
        return <GlobalSettingsModel>{
            ResponsiveEnabled: true,
            CharTalkEnabled: true,
            doShowNewVersionMessage: true,
            doLeaveMessage: true,
            doMessageInterruption: true,
        }
    };

    Load(): void {
        //Leave Message
        hookFunction("ServerAccountBeep", HookPriority.AddBehavior, (args, next) => {
            let data = args[0];
            leaveHandle(data);
            next(args);
        }, ModuleCategory.Global);

        //Orgasm Handling
        hookFunction("ActivityOrgasmStart", HookPriority.Observe, (args, next) => {
            this.isOrgasm = true;
            orgasmHandle(args[0] as Character);
            next(args);
        }, ModuleCategory.Global);

        //Character Talk
        hookFunction("ChatRoomSendChat", HookPriority.AddBehavior, (args, next) => {
            const charTalkEnabled = Player.BCResponsive.GlobalModule.CharTalkEnabled;
            const inputChat = ElementValue("InputChat").trim();
            const isSimpleChat2 = isSimpleChat(inputChat);

            if (!charTalkEnabled) {
                next(args);
                return;
            }

            if (isSimpleChat2 && this.doAnimate && !this.isOrgasm) {
                animateSpeech(inputChat);
            }

            if (!isSimpleChat2 && inputChat !== "") {
                this.doAnimate = false;
                next(args);
                return;
            }

            if (isSimpleChat2 && !this.doAnimate) {
                this.doAnimate = true;
            }

            if (this.isOrgasm) {
                this.isOrgasm = false;
            }

            next(args);
        }, ModuleCategory.Global);

        hookFunction("ChatRoomSync", HookPriority.Observe, (args, next) => {
            next(args);
            this.sendNewVersionMessage();
        }, ModuleCategory.Global);
    }

    Run(): void {
    }

    isNewVersion(current: string | undefined, candidate: string) {
        if (current !== undefined) {
            const CURRENT_ = current.split("."),
                CANDIDATE_ = candidate.split(".");
            for (let i = 0; i < 3; i++) {
                if (CURRENT_[i] === CANDIDATE_[i]) {
                    continue;
                }
                return CANDIDATE_[i] > CURRENT_[i];
            }
        }
        if (current === undefined || current === "" || !current) {
            return true;
        }
        return false;
    }

    sendNewVersionMessage() {
        if (Player.BCResponsive.GlobalModule.doShowNewVersionMessage && this.isItNewVersion) {
            sendLocalSmart(BCR_NEW_VERSION, MT.CHANGELOG);
        }
    }

    saveVersion() {
        if (Player.BCResponsive) {
            Player.BCResponsive.Version = ModVersion;
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        }
    }

    loadVersion() {
        if (Player?.BCResponsive?.Version) {
            return Player.BCResponsive.Version;
        }
        return;
    }

    checkIfNewVersion() {
        let LoadedVersion = this.loadVersion();
        if (this.isNewVersion(LoadedVersion, ModVersion)) {
            this.isItNewVersion = true;
            this.saveVersion();
        }
    }
}