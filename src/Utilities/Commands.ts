import { CMD_BCR, MT } from "./Definition";
import { BCR_CMDS, BCR_CHANGELOG, BCR_VERSION_MSG, sendLocalSmart, BCR_TOGGLE_ENABLED, BCR_TOGGLE_DISABLED } from "./Messages";

export function loadCommands() {
  CommandCombine({
    Tag: CMD_BCR,
    Description: ": To open the Responsive commands overview.",
    Action: (args: string) => {
      switch (args) {
        case "toggle":
          const data = Player.BCResponsive.GlobalModule;
          data.ResponsiveEnabled = !data.ResponsiveEnabled;
          if (data.ResponsiveEnabled) {
            sendLocalSmart("bcr_toggle_enb", BCR_TOGGLE_ENABLED, MT.INFO);
          }
          if (!data.ResponsiveEnabled) {
            sendLocalSmart("bcr_toggle_dis", BCR_TOGGLE_DISABLED, MT.INFO);
          }
          break;

        case "changelog":
          sendLocalSmart("bcr_clog", BCR_CHANGELOG);
          break;

        case "version":
          sendLocalSmart("bcr_ver", BCR_VERSION_MSG, MT.INFO);
          break;

        default:
          sendLocalSmart("bcr_cmds", BCR_CMDS, MT.COMMANDS);
          break;
      }
    }
  });
}
