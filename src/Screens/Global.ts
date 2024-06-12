import { Checkbox, SettingElement } from '@Types/elements';
import { BaseSubscreen } from 'bc-deeplib';
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
    return [[
      <Checkbox>{
        id: 'modEnabled',
        type: 'checkbox',
        label: 'settings.setting.modEnabled.name',
        description: 'settings.setting.modEnabled.desc',
        setElementValue: () => this.settings?.modEnabled ?? true,
        setSettingValue: (val) => (this.settings.modEnabled = val)
      },
      <Checkbox>{
        id: 'responsesEnabled',
        type: 'checkbox',
        label: 'settings.setting.responsesEnabled.name',
        description: 'settings.setting.responsesEnabled.desc',
        setElementValue: () => this.settings?.responsesEnabled ?? true,
        setSettingValue: (val) => (this.settings.responsesEnabled = val)
      },
      <Checkbox>{
        id: 'charTalkEnabled',
        type: 'checkbox',
        label: 'settings.setting.charTalkEnabled.name',
        description: 'settings.setting.charTalkEnabled.desc',
        setElementValue: () => this.settings?.charTalkEnabled ?? true,
        setSettingValue: (val) => (this.settings.charTalkEnabled = val)
      },
      <Checkbox>{
        id: 'doMessageInterruption',
        type: 'checkbox',
        label: 'settings.setting.doMessageInterruption.name',
        description: 'settings.setting.doMessageInterruption.desc',
        setElementValue: () => this.settings?.doMessageInterruption ?? true,
        setSettingValue: (val) => (this.settings.doMessageInterruption = val)
      },
      <Checkbox>{
        id: 'doLeaveMessage',
        type: 'checkbox',
        label: 'settings.setting.doLeaveMessage.name',
        description: 'settings.setting.doLeaveMessage.desc',
        setElementValue: () => this.settings?.doLeaveMessage ?? true,
        setSettingValue: (val) => (this.settings.doLeaveMessage = val)
      },
      /* <Checkbox>{
        type: 'checkbox',
        label: 'settings.setting.doAddMoansOnHighArousal.name',
        description: 'settings.setting.doAddMoansOnHighArousal.desc',
        setElementValue: () => this.settings?.doAddMoansOnHighArousal ?? true,
        setSettingValue: (val) => (this.settings.doAddMoansOnHighArousal = val)
      }, */
      <Checkbox>{
        id: 'doPreventMessageIfBcxBlock',
        type: 'checkbox',
        label: 'settings.setting.doPreventMessageIfBcxBlock.name',
        description: 'settings.setting.doPreventMessageIfBcxBlock.desc',
        setElementValue: () => this.settings?.doPreventMessageIfBcxBlock ?? false,
        setSettingValue: (val) => (this.settings.doPreventMessageIfBcxBlock = val)
      },
      <Checkbox>{
        id: 'doShowNewVersionMessage',
        type: 'checkbox',
        label: 'settings.setting.doShowNewVersionMessage.name',
        description: 'settings.setting.doShowNewVersionMessage.desc',
        setElementValue: () => this.settings?.doShowNewVersionMessage ?? true,
        setSettingValue: (val) => (this.settings.doShowNewVersionMessage = val)
      }
    ]];
  }

  Load(): void {
    super.Load();
  }
}
