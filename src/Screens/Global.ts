import { GlobalModule } from '_/Modules/Global';
import { BaseSubscreen, getModule, getText, SubscreenOptions } from 'bc-deeplib/deeplib';
import { GlobalSettingsModel } from '../Models/Base';
import { SettingElement } from 'bc-deeplib/base/elements_typings';

export class GuiGlobal extends BaseSubscreen {
  protected static override subscreenOptions: SubscreenOptions = {
    name: 'settings',
    icon: 'Icons/Preference.png',
  };

  get settings(): GlobalSettingsModel {
    return super.settings as GlobalSettingsModel;
  }

  get pageStructure(): SettingElement[][] {
    const defaults = getModule<GlobalModule>('GlobalModule').defaultSettings;

    return [Object.entries(this.settings).map(([key, value]) => {
      const typedKey = key as keyof GlobalSettingsModel;

      return {
        id: `responsive-global-${key}`,
        type: 'checkbox',
        label: getText(`settings.setting.${typedKey}.name`),
        description: getText(`settings.setting.${typedKey}.desc`),
        setElementValue: () => value ?? defaults?.[typedKey],
        setSettingValue: (val: boolean) => (this.settings[typedKey] = val),
      };
    })];
  }

  load(): void {
    super.load();
  }
}
