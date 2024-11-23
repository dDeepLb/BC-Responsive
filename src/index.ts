
import { GUI, Style, VersionModule, getText, initMod, setMainMenuOptions } from 'bc-deeplib';
import deeplib_style from 'lib_public/styles/DeepLib.css';
import gratitude_style from 'lib_public/styles/Gratitude.css';
import { DeepLibMigrator } from './Migrators/DeepLib';
import { CharTalkModule } from './Modules/CharTalk';
import { GlobalModule } from './Modules/Global';
import { ProfilesModule } from './Modules/Profiles';
import { ResponsesModule } from './Modules/Responses';
import { GuiReset } from './Screens/Reset';
import { loadCommands } from './Utilities/Commands';
import { BCR_CHANGELOG, BCR_NEW_VERSION } from './Utilities/Messages';
(() => {
  const initFunc = async () => {
    loadCommands();

    Style.inject('deeplib-style', deeplib_style);
    Style.inject('gratitude-style', gratitude_style);

    setMainMenuOptions('https://github.com/dDeepLb/BC-Responsive/wiki/', new GuiReset());

    VersionModule.registerMigrator(new DeepLibMigrator);
    VersionModule.setNewVersionMessage(BCR_NEW_VERSION + BCR_CHANGELOG);
  };

  const modules = [
    new VersionModule(),
    new CharTalkModule(),
    new GUI({
      Identifier: 'Responsive',
      ButtonText: () => getText('infosheet.button.mod_button_text'),
      Image: 'Icons/Arousal.png'
    }),
    new GlobalModule(),
    new ResponsesModule(),
    new ProfilesModule()
  ];

  const pathToTranslationsFolder = `${PUBLIC_URL}/public/i18n/`;

  initMod(initFunc, modules, pathToTranslationsFolder);
})();
