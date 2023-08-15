import { commandKey, loadCommands } from "./Commands";
import { DataManager } from "./Data";
import { BCRVersion, HOOK_PRIORITY, mod } from "./Definition";
import { chatMessageHandler, OrgasmHandle } from "./Handlers";
import { LeaveMessage } from "./Message/ResponsesProvider";
import { LoadAndMessage } from "./utils";
import { isNewVersion, sendNewVersion, setFalseVersionShown } from "./Version";

export function LoadHooks() {
    mod.hookFunction('ChatRoomMessage', HOOK_PRIORITY.OVERRIDE_BEHAVIOR, (args, next) => {
        next(args);
        chatMessageHandler.Run(Player, args[0] as IChatRoomMessage);
    });

    mod.hookFunction('ActivityOrgasmStart', HOOK_PRIORITY.OVERRIDE_BEHAVIOR, (args, next) => {
        OrgasmHandle(args[0] as Character);
        next(args);
    });

    mod.hookFunction('LoginResponse', HOOK_PRIORITY.ADD_BEHAVIOR, (args, next) => {
        next(args);
        LoadAndMessage();
        loadCommands(commandKey);
        setFalseVersionShown();
        DataManager.instance.CheckNewThingies();
    });

    mod.hookFunction('ChatRoomSync', HOOK_PRIORITY.OBSERVE, (args, next) => {
        next(args);
        if ( window.BCR_Version ) {
            if ( isNewVersion( window.BCR_Version, BCRVersion ) ) {
                sendNewVersion();
            }
        }
    });
    mod.hookFunction('ChatRoomLeave', HOOK_PRIORITY.ADD_BEHAVIOR, (args, next) => {
        LeaveMessage();
        setFalseVersionShown();
        next(args);
    });

    mod.hookFunction("ServerAccountBeep", HOOK_PRIORITY.ADD_BEHAVIOR, (args, next) => {
        let data = args[0];
        if (data.BeepType == "Leash" && data.ChatRoomName && Player) {
            if (Player.OnlineSharedSettings && Player.OnlineSharedSettings.AllowPlayerLeashing != false && ( CurrentScreen != "ChatRoom" || !ChatRoomData || (CurrentScreen == "ChatRoom" && ChatRoomData.Name != data.ChatRoomName))) {
                LeaveMessage();
            }
        }
        next(args);
    });
}