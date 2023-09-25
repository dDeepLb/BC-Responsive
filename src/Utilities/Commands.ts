import { DataManager } from "../Data";
import { CMDS, MT } from "../Definition";
import { BCR_CMDS, BCR_CHANGELOG, BCR_VERSION_MSG } from "./Messages";

export function LoadCommands() {
    CommandCombine([
		{
			Tag: CMDS.BCR,
			Description: ": To open the Responsive commands overview.",
			Action: (args: string) => {
				if (args === "") {
					ChatRoomSendLocal(
						`${BCR_CMDS}`.replaceAll('\n', ''), MT.COMMANDS
					);
					return;
				}
                if (args === "toggle") {
                    const data = DataManager.instance.data;
                    data.settings.enable = !data.settings.enable;
                    if (data.settings.enable) {
                        ChatRoomSendLocal(
                        `<p style='background-color:#202020; border: 2px solid #440171 !important; padding-left: 5px'><b>BC Responsive</b> has been enabled</p>\n`, MT.INFO
                        );
                    }
                    if (!data.settings.enable) {
                        ChatRoomSendLocal(
                        `<p style='background-color:#202020; border: 2px solid #440171 !important; padding-left: 5px'><b>BC Responsive</b> has been disabled</p>\n`, MT.INFO
                        );
                    }
					return;
				}
                if (args === "changelog") {
                    ChatRoomSendLocal(
                    `${BCR_CHANGELOG}`.replaceAll('\n', ''), MT.CHANGELOG
					);
                    return;
				}
                if (args === "version") {
                    ChatRoomSendLocal(
                    `${BCR_VERSION_MSG}`.replaceAll('\n', ''), MT.INFO
                    );
					return;
				}
			},
		},
	]);
}