import { GlobalSettingsModel } from '_/models/base';
import { BaseModule, getText, modStorage } from 'bc-deeplib/deeplib';

export class CommandsModule extends BaseModule {
  load(): void {
    CommandCombine({
      Tag: 'rsp',
      Description: ': To open the Responsive commands overview.',
      Action: () => {
      },
      Subcommands: [
        {
          Tag: 'toggle',
          Description: ': Toggle Responsive on/off.',
          Action: () => {
            const data = modStorage.playerStorage.GlobalModule as GlobalSettingsModel;
            data.modEnabled = !data.modEnabled;
            if (data.modEnabled) {
              getText('commands.modEnabled');
            } else {
              getText('commands.modDisabled');
            }
          }
        },
        // {
        //   Tag: 'changelog',
        //   Description: ': Show Responsive changelog.',
        //   Action: () => {
        //     sendLocalMessage('bcr-clog', BCR_CHANGELOG);
        //   }
        // },
        {
          Tag: 'version',
          Description: ': Show Responsive version.',
          Action: () => {
            CommonStringPartitionReplace(getText('commands.currentVersion'),{
              $currentVersion$: MOD_VERSION
            });
          }
        }
      ]
    });
  }
}
