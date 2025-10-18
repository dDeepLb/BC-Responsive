import { DeepLibMigrator } from './migrators/deeplib';
import { CharTalkModule } from './modules/char_talk';
import { GlobalModule } from './modules/global';
import { ProfilesModule } from './modules/profiles';
import { ResponsesModule } from './modules/responses';
import { GuiReset } from './screens/reset';
import { getText, GUI, GuiImportExport, initMod, Style, VersionModule } from 'bc-deeplib/deeplib';
import { ModRepository } from './utilities/definition';
import { CommandsModule } from './modules/commands';

(async () => {
  const initFunction = async () => {
    Style.injectEmbed('responsive-style', `${PUBLIC_URL}/styles/responses.css`);
  };

  const changelog = await fetch(`${PUBLIC_URL}/text/changelog.txt`)
    .then((res) => res.text())
    .then((text) => text.replace(/\r\n/g, '\n'));

  const modules = [
    new VersionModule({
      newVersionMessage: changelog
    }),
    new CharTalkModule(),
    new GUI({
      identifier: 'Responsive',
      buttonText: () => getText('infosheet.button.mod_button_text'),
      image: 'Icons/Arousal.png'
    }),
    new CommandsModule(),
    new GlobalModule(),
    new ResponsesModule(),
    new ProfilesModule()
  ];

  initMod({
    initFunction,
    modules,
    modInfo: {
      info: {
        name: 'Responsive',
        fullName: 'Responsive',
        version: MOD_VERSION,
        repository: ModRepository
      },
    },
    migrators: [new DeepLibMigrator()],
    mainMenuOptions: {
      wikiLink: 'https://github.com/dDeepLb/BC-Responsive/wiki/',
      resetSubscreen: new GuiReset(),
      storageFullnessIndicator: true,
      importExportSubscreen: new GuiImportExport({
        customFileExtension: 'bcrsp'
      })
    },
    translationOptions: {
      pathToTranslationsFolder: `${PUBLIC_URL}/i18n/`
    }
  });
})();
