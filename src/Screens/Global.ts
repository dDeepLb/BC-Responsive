import { GlobalModule } from '_/Modules/Global';
import { BaseSubscreen, getModule } from 'bc-deeplib';
import { SettingElement } from 'lib_types/elements';
import { GlobalSettingsModel } from '../Models/Base';

export class GuiGlobal extends BaseSubscreen {
  get name(): string {
    return 'settings';
  }

  get icon(): string {
    return 'Icons/Preference.png';
  }

  get settings(): GlobalSettingsModel {
    return super.settings as GlobalSettingsModel;
  }

  get pageStructure(): SettingElement[][] {
    const defaults = getModule<GlobalModule>('GlobalModule').defaultSettings;
    
    return [Object.keys(this.settings).map((key) =>
      ({
        id: key,
        type: 'checkbox',
        label: `settings.setting.${key}.name`,
        description: `settings.setting.${key}.desc`,
        getSettingValue: () => this.settings?.[key] ?? defaults?.[key],
        setSettingValue: (val) => (this.settings[key] = val),
      })
    )];
  }

  load(): void {
    super.load();
  }
}
