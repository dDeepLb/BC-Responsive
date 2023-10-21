import { BaseModule } from "../Base";
import { AnimateSpeech } from "../CharTalk";
import { MT } from "../Definition";
import { GlobalSettingsModel } from "../Settings/Models/Base";
import { IsSimpleChat } from "../Utilities/ChatMessages";
import { LeaveHandle, OrgasmHandle } from "../Utilities/Handles";
import { BCR_NEW_VERSION, SendLocalSmart } from "../Utilities/Messages";
import { HookFunction, HookPriority, ModVersion, ModuleCategory } from "../Utilities/SDK";

export class GlobalModule extends BaseModule {

    isItNewVersion: boolean = false;

    isOrgasm: boolean = false;
    doAnimate: boolean = true;

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
        HookFunction("ServerAccountBeep", HookPriority.AddBehavior, (args, next) => {
            let data = args[0];
            LeaveHandle(data);
            next(args);
        }, ModuleCategory.Global);

        //Orgasm Handling
        HookFunction("ActivityOrgasmStart", HookPriority.Observe, (args, next) => {
            this.isOrgasm = true;
            OrgasmHandle(args[0] as Character);
            next(args);
        }, ModuleCategory.Global);

        //Character Talk
        HookFunction("ChatRoomSendChat", HookPriority.AddBehavior, (args, next) => {
            const charTalkEnabled = Player.BCResponsive.GlobalModule.CharTalkEnabled;
            const inputChat = ElementValue("InputChat").trim();
            const isSimpleChat = IsSimpleChat(inputChat);

            if (!charTalkEnabled) {
                next(args);
                return;
            }

            if (isSimpleChat && this.doAnimate && !this.isOrgasm) {
                AnimateSpeech(inputChat);
            }

            if (!isSimpleChat && inputChat !== "") {
                this.doAnimate = false;
                next(args);
                return;
            }

            if (isSimpleChat && !this.doAnimate) {
                this.doAnimate = true;
            }

            if (this.isOrgasm) {
                this.isOrgasm = false;
            }

            next(args);
        }, ModuleCategory.Global);

        HookFunction("ChatRoomSync", HookPriority.Observe, (args, next) => {
            next(args);
            this.SendNewVersionMessage();
        }, ModuleCategory.Global);
    }

    Run(): void {
    }

    IsNewVersion(current: string | undefined, candidate: string) {
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

    SendNewVersionMessage() {
        if (Player.BCResponsive.GlobalModule.doShowNewVersionMessage && this.isItNewVersion) {
            SendLocalSmart(BCR_NEW_VERSION, MT.CHANGELOG);
        }
    }

    SaveVersion() {
        if (Player.BCResponsive) {
            Player.BCResponsive.Version = ModVersion;
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        }
    }

    LoadVersion() {
        if (Player?.BCResponsive?.Version) {
            return Player.BCResponsive.Version;
        }
        return;
    }

    CheckIfNewVersion() {
        let LoadedVersion = this.LoadVersion();
        if (this.IsNewVersion(LoadedVersion, ModVersion)) {
            this.isItNewVersion = true;
            this.SaveVersion();
        }
    }
}