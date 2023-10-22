import { CMD_BCR, MT } from "../Definition";
import { BCR_CMDS, BCR_CHANGELOG, BCR_VERSION_MSG, sendLocalSmart, BCR_TOGGLE_ENABLED, BCR_TOGGLE_DISABLED } from "./Messages";

export function loadCommands() {
  CommandCombine(
    {
      Tag: CMD_BCR,
      Description: ": To open the Responsive commands overview.",
      Action: (args: string) => {
        if (args === "") {
          sendLocalSmart(BCR_CMDS, MT.COMMANDS);
          return;
        }
        if (args === "toggle") {
          const data = Player.BCResponsive.GlobalModule;
          data.ResponsiveEnabled = !data.ResponsiveEnabled;
          if (data.ResponsiveEnabled) {
            sendLocalSmart(BCR_TOGGLE_ENABLED, MT.INFO);
          }
          if (!data.ResponsiveEnabled) {
            sendLocalSmart(BCR_TOGGLE_DISABLED, MT.INFO);
          }
          return;
        }
        if (args === "changelog") {
          sendLocalSmart(BCR_CHANGELOG, MT.CHANGELOG);
          return;
        }
        if (args === "version") {
          sendLocalSmart(BCR_VERSION_MSG, MT.INFO);
          return;
        }
      },
    },
  );
}
