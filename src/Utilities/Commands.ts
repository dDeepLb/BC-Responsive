import { sendLocalMessage } from 'bc-deeplib';
import { PlayerStorage } from './Data';
import { CMD_BCR, MT } from './Definition';
import { BCR_CHANGELOG, BCR_CMDS, BCR_TOGGLE_DISABLED, BCR_TOGGLE_ENABLED, BCR_VERSION_MSG } from './Messages';

export function loadCommands() {
  CommandCombine({
    Tag: CMD_BCR,
    Description: ': To open the Responsive commands overview.',
    Action: (args: string) => {
      const data = PlayerStorage().GlobalModule;
      switch (args) {
        case 'toggle':
          data.modEnabled = !data.modEnabled;
          if (data.modEnabled) {
            sendLocalMessage('bcr-toggle-enb', BCR_TOGGLE_ENABLED, MT.INFO);
          } else {
            sendLocalMessage('bcr-toggle-dis', BCR_TOGGLE_DISABLED, MT.INFO);
          }
          break;

        case 'changelog':
          sendLocalMessage('bcr-clog', BCR_CHANGELOG);
          break;

        case 'version':
          sendLocalMessage('bcr-ver', BCR_VERSION_MSG, MT.INFO);
          break;

        case 'debug-data':
          navigator.clipboard.writeText(LZString.compressToBase64(JSON.stringify(Player.Responsive)));
          break;

        default:
          sendLocalMessage('bcr_cmds', BCR_CMDS, MT.COMMANDS);
          break;
      }
    }
  });
}
