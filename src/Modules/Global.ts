import { BaseModule } from "../Base";
import { AnimateSpeech } from "../CharTalk";
import { MT } from "../Definition";
import { IsSimpleChat } from "../Message/ChatMessages";
import { OrgasmHandle } from "../Message/Handles";
import { LeaveMessage } from "../Message/ResponseProvider";
import { GlobalSettingsModel } from "../Settings/Models/Base";
import { OnLogin } from "../Utilities/Login";
import { BCR_NEW_VERSION } from "../Utilities/Messages";
import { SDK, HOOK_PRIORITY, HookFunction, ModuleCategory, ResponsiveVersion } from "../Utilities/SDK";
import { sendNewVersion } from "../Utilities/Versions";

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
        HookFunction("ServerAccountBeep", HOOK_PRIORITY.ADD_BEHAVIOR, (args, next) => {
            let data = args[0];
            if (data.BeepType == "Leash" && data.ChatRoomName && Player) {
                if (
                    Player.OnlineSharedSettings &&
                    Player.OnlineSharedSettings.AllowPlayerLeashing != false &&
                    (CurrentScreen != "ChatRoom" || !ChatRoomData || (CurrentScreen == "ChatRoom" && ChatRoomData.Name != data.ChatRoomName))
                ) {
                    LeaveMessage();
                }
            }
            next(args);
        }, ModuleCategory.Global);

        //Orgasm Handling
        HookFunction("ActivityOrgasmStart", HOOK_PRIORITY.OBSERVE, (args, next) => {
            this.isOrgasm = true;
            OrgasmHandle(args[0] as Character);
            next(args);
        }, ModuleCategory.Global);

        //Character Talk
        HookFunction("ChatRoomSendChat", HOOK_PRIORITY.ADD_BEHAVIOR, (args, next) => {
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


        // ResponsiveMod.hookFunction("LoginResponse", HOOK_PRIORITY.OBSERVE, (args, next) => {
        //     next(args);
        //     OnLogin();
        // });

        HookFunction("ChatRoomSync", HOOK_PRIORITY.OBSERVE, (args, next) => {
            next(args);
            sendNewVersion();
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

    sendNewVersion() {
        if (Player.BCResponsive.GlobalModule.doShowNewVersion && this.isItNewVersion) {
            ChatRoomSendLocal(`${BCR_NEW_VERSION}`.replaceAll("\n", ""), MT.CHANGELOG);
        }
    }

    SaveVersion() {
        if (Player.OnlineSettings.BCResponsive) {
            Player.OnlineSettings.BCResponsive.Version = ResponsiveVersion;
            ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
        }
    }

    LoadVersion() {
        if (Player?.OnlineSettings?.BCResponsive?.Version) {
            return Player.BCResponsive.Version;
        }
        return;
    }
}