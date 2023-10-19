import { CMDS, MT } from "../Definition";
import { BCR_CMDS, BCR_CHANGELOG, BCR_VERSION_MSG, SendLocalSmart, BCR_TOGGLE_ENABLED, BCR_TOGGLE_DISABLED } from "./Messages";

export function LoadCommands() {
  CommandCombine(
    {
      Tag: CMDS.BCR,
      Description: ": To open the Responsive commands overview.",
      Action: (args: string) => {
        if (args === "") {
          SendLocalSmart(BCR_CMDS, MT.COMMANDS);
          return;
        }
        if (args === "toggle") {
          const data = Player.BCResponsive.GlobalModule;
          data.ResponsiveEnabled = !data.ResponsiveEnabled;
          if (data.ResponsiveEnabled) {
            SendLocalSmart(BCR_TOGGLE_ENABLED, MT.INFO);
          }
          if (!data.ResponsiveEnabled) {
            SendLocalSmart(BCR_TOGGLE_DISABLED, MT.INFO);
          }
          return;
        }
        if (args === "changelog") {
          SendLocalSmart(BCR_CHANGELOG, MT.CHANGELOG);
          return;
        }
        if (args === "version") {
          SendLocalSmart(BCR_VERSION_MSG, MT.INFO);
          return;
        }
      },
    },
  );
}
