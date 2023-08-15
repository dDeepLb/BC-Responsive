import { DataManager } from "./Data";
import { MT } from "./Definition";
import { BCR_CHANGELOG, BCR_VERSION_MSG } from "./Version";

export const commandKey = "bcr";

export function loadCommands(cmmdKey: string) {
    CommandCombine([
		{
			Tag: cmmdKey,
			Description: ": To open the Responsive commands overview and info.",
			Action: (args: string) => {
				if (args === "") {
					ChatRoomSendLocal(
						`<p style='background-color:#202020; color: #eee; border: 2px solid #440171 !important; padding-left: 5px'><b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive</b>: Available commands (Clickable):\n` +
						`<a onClick='window.CommandSet(cmmdKey + " toggle")'><b style='color:#eee'>Toggle Responsive</b></a>\n` +
						// `<a onClick='window.CommandSet("bcr")'><b style='color:#eee'>Help</b></a>\n` +
						// `<a onClick='window.CommandSet("bcr")'><b style='color:#eee'>Red</b></a>\n` +
						`\n<a href='https://github.com/dDeepLb/BC-Responsive/wiki' target='_blank'><b style='color:#eee'>Open Wiki</b></a>\n` +
						`\n<a onClick='window.CommandSet(cmmdKey + " changelog")'><b style='color:#eee'>Show Changelog</b></a>\n` +
						`<a onClick='window.CommandSet(cmmdKey + " version")'><b style='color:#eee'>Show Version</b></a></p>`, MT.COMMANDS
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
                    `<p style='background-color:#202020; border: 2px solid #440171 !important; padding-left: 5px'>${BCR_CHANGELOG}</p>`, MT.CHANGELOG
					);
                    return;
				}
                if (args === "version") {
                    ChatRoomSendLocal(
                    `${BCR_VERSION_MSG}`, MT.INFO
                    );
					return;
				}
			},
		},
	]);
}