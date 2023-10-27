import { AnimateSpeech } from "../CharTalk";
import { DataManager } from "../Data";
import { HOOK_PRIORITY, ResponsiveMod } from "../Definition";
import { IsSimpleChat } from "../Message/ChatMessages";
import { chatMessageHandler, OrgasmHandle } from "../Message/MessageHandler";
import { LeaveMessage } from "../Message/ResponsesProvider";
import { onLogin, sendNewVersion } from "./Utilities";

export function LoadHooks() {
	ResponsiveMod.hookFunction(
		"ChatRoomMessage",
		HOOK_PRIORITY.OVERRIDE_BEHAVIOR,
		(args, next) => {
			next(args);
			chatMessageHandler.Run(Player, args[0] as IChatRoomMessage);
		}
	);

	ResponsiveMod.hookFunction(
		"ActivityOrgasmStart",
		HOOK_PRIORITY.OVERRIDE_BEHAVIOR,
		(args, next) => {
			//isOrgasm = true;
			OrgasmHandle(args[0] as Character);
			next(args);
		}
	);

	ResponsiveMod.hookFunction(
		"LoginResponse",
		HOOK_PRIORITY.ADD_BEHAVIOR,
		(args, next) => {
			next(args);
			onLogin();
		}
	);

	ResponsiveMod.hookFunction(
		"ChatRoomSync",
		HOOK_PRIORITY.OBSERVE,
		(args, next) => {
			next(args);
			sendNewVersion();
		}
	);
	ResponsiveMod.hookFunction(
		"ChatRoomLeave",
		HOOK_PRIORITY.ADD_BEHAVIOR,
		(args, next) => {
			LeaveMessage();
			next(args);
		}
	);

	ResponsiveMod.hookFunction(
		"ServerAccountBeep",
		HOOK_PRIORITY.ADD_BEHAVIOR,
		(args, next) => {
			let data = args[0];
			if (data.BeepType == "Leash" && data.ChatRoomName && Player) {
				if (
					Player.OnlineSharedSettings &&
					Player.OnlineSharedSettings.AllowPlayerLeashing != false &&
					(CurrentScreen != "ChatRoom" ||
						!ChatRoomData ||
						(CurrentScreen == "ChatRoom" &&
							ChatRoomData.Name != data.ChatRoomName))
				) {
					LeaveMessage();
				}
			}
			next(args);
		}
	);

	//Character Talk
	// let doAnimate = true;
	// let isOrgasm = false;
	// ResponsiveMod.hookFunction("ChatRoomSendChat", HOOK_PRIORITY.ADD_BEHAVIOR, (args, next) => {
	// 	if (!DataManager.instance.modData.modSettings?.doEnableCharTalk) {
	// 		next(args);
	// 		return;
	// 	}

	// 	const msg = ElementValue("InputChat").trim();
	// 	if (IsSimpleChat(ElementValue("InputChat")) && doAnimate && !isOrgasm) AnimateSpeech(msg);
	// 	if (!IsSimpleChat(ElementValue("InputChat")) && msg !== "") {
	// 		doAnimate = false;
	// 		next(args);
	// 		return;
	// 	}
	// 	if (IsSimpleChat(ElementValue("InputChat")) && !doAnimate) doAnimate = true;
	// 	if (isOrgasm) isOrgasm = false;
	// 	next(args);
	// });
}
