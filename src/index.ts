
import deeplib_style from 'Static/DeepLib.css';
import gratitude_style from 'Static/Gratitude.css';
import { GUI, Localization, Style, VersionModule, dataTake, getText, modules, registerModule, setMainMenuOptions } from 'bc-deeplib';
import { DeepLibMigrator } from './Migrators/DeepLib';
import { CharTalkModule } from './Modules/CharTalk';
import { GlobalModule } from './Modules/Global';
import { ProfilesModule } from './Modules/Profiles';
import { ResponsesModule } from './Modules/Responses';
import { GuiReset } from './Screens/Reset';
import { loadCommands } from './Utilities/Commands';
import { logger } from './Utilities/Definition';
import { BCR_CHANGELOG, BCR_NEW_VERSION } from './Utilities/Messages';
import { SDK } from './Utilities/SDK';

function initWait() {
  logger.log('Init wait');
  if (CurrentScreen == null || CurrentScreen === 'Login') {
    SDK.hookFunction('LoginResponse', 0, (args, next) => {
      logger.log('Init! LoginResponse caught: ', args);
      next(args);
      const response = args[0];
      if (response === 'InvalidNamePassword') return next(args);
      if (response && typeof response.Name === 'string' && typeof response.AccountName === 'string') {
        init();
      }
    });
  } else {
    logger.log('Already logged in, init');
    init();
  }
}

export async function init() {
  if (window.ResponsiveLoaded) return;

  new Localization({ pathToTranslationsFolder: `${PUBLIC_URL}/public/i18n/` });
  await Localization.init();

  Style.inject('deeplib-style', deeplib_style);
  Style.inject('gratitude-style', gratitude_style);

  dataTake();
  loadCommands();

  if (!initModules()) {
    unload();
    return;
  }

  setMainMenuOptions('https://github.com/dDeepLb/BC-Responsive/wiki/', new GuiReset());

  VersionModule.registerMigrator(new DeepLibMigrator);
  VersionModule.setNewVersionMessage(BCR_NEW_VERSION + BCR_CHANGELOG);
  VersionModule.checkVersionUpdate();
  VersionModule.checkVersionMigration();

  window.ResponsiveLoaded = true;
  logger.log(`Loaded! Version: ${MOD_VERSION}`);
}

function initModules(): boolean {
  registerModule(new VersionModule());
  registerModule(new CharTalkModule());
  registerModule(new GUI({
    Identifier: 'Responsive', 
    ButtonText: getText('infosheet.button.mod_button_text'), 
    Image: 'Icons/Arousal.png'
  }));
  registerModule(new GlobalModule());
  registerModule(new ResponsesModule());
  registerModule(new ProfilesModule());

  for (const module of modules()) {
    module.init();
  }

  for (const module of modules()) {
    module.load();
  }

  for (const module of modules()) {
    module.run();
  }

  logger.log('Modules Loaded.');
  return true;
}

export function unload(): true {
  unloadModules();

  delete window.ResponsiveLoaded;
  logger.log('Unloaded.');
  return true;
}

function unloadModules() {
  for (const module of modules()) {
    module.unload();
  }
}

initWait();
