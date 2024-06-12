import { getText } from 'bc-deeplib';
import { dataErase, dataResetForManual } from '../Utilities/Data';
import { BaseSubscreen } from 'bc-deeplib';
import { setSubscreen } from 'bc-deeplib';

export class GuiReset extends BaseSubscreen {
  get name(): string {
    return 'reset';
  }

  get icon(): string {
    return '';
  }

  private allowedConfirmTime: number | null = 0;

  private doResetForManualSettings: boolean = false;

  private doResetSettings: boolean = true;
  private doResetResponses: boolean = true;
  private doResetProfiles: boolean = false;

  Load() {
    this.allowedConfirmTime = Date.now() + 10_000;
    super.Load();
  }

  Run() {

    DrawText(getText('reset.label.perma_reset_of_bcr_data'), 1000, 125, 'Black');

    DrawText(getText('reset.label.warning'), 1000, 225, 'Black', 'Black');
    DrawText(getText('reset.label.if_u_confirm_perma_reset'), 1000, 325, 'Black');

    DrawText(getText('reset.label.youll_able_to_use_bcr'), 1000, 375, 'Gray');

    DrawText(getText('reset.label.action_cannot_be_undone'), 1000, 425, 'Red', 'Black');

    const now = Date.now();
    if (now < this.allowedConfirmTime) {
      DrawButton(
        1000,
        690,
        200,
        80,
        `${getText('reset.button.confirm')} (${Math.floor((this.allowedConfirmTime - now) / 1000)})`,
        '#ddd',
        undefined,
        undefined,
        true
      );
    } else {
      DrawButton(1000, 690, 200, 80, getText('reset.button.confirm'), 'White');
    }

    DrawButton(1520, 690, 200, 80, getText('reset.button.cancel'), 'White');

    MainCanvas.textAlign = 'left';

    // this.drawCheckbox(
    //   'reset.setting.reset_for_manual_setting.text',
    //   'reset.setting.reset_for_manual_setting.desc',
    //   this.doResetForManualSettings,
    //   4
    // );
    // this.drawCheckbox(
    //   'reset.setting.reset_settings.text',
    //   'reset.setting.reset_settings.desc',
    //   this.doResetSettings,
    //   6,
    //   this.doResetForManualSettings
    // );
    // this.drawCheckbox(
    //   'reset.setting.reset_responses.text',
    //   'reset.setting.reset_responses.desc',
    //   this.doResetResponses,
    //   7,
    //   this.doResetForManualSettings
    // );
    // this.drawCheckbox(
    //   'reset.setting.reset_profiles.text',
    //   'reset.setting.reset_profiles.desc',
    //   this.doResetProfiles,
    //   8,
    //   this.doResetForManualSettings
    // );

  }

  Click() {
    if (this.allowedConfirmTime === null) return;

    if (MouseIn(1520, 690, 200, 80)) return this.Exit();

    if (MouseIn(1000, 690, 200, 80) && Date.now() >= this.allowedConfirmTime) return this.Confirm();

  }

  Confirm() {
    this.allowedConfirmTime = null;
    if (this.doResetForManualSettings) {
      dataResetForManual();
    } else {
      dataErase(this.doResetSettings, this.doResetResponses, this.doResetProfiles);
    }
    setSubscreen(null);
  }
}
