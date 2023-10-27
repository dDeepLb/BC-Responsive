import { BaseModule } from "../Base/BaseModule";
import { activityDeconstruct } from "../Utilities/ChatMessages";
import { activityHandle } from "../Utilities/Handlers";
import { ResponsesEntryModel, ResponsesSettingsModel } from "../Models/Responses";
import { GuiResponses } from "../Settings/Responses";
import { Subscreen } from "../Base/SettingDefinitions";
import { conDebug } from "../Utilities/Console";
import { getDefaultResponsesEntries } from "../Utilities/DefaultResponsesEntries";
import { HookPriority, ModuleCategory, onActivity } from "../Utilities/SDK";

export class ResponsesModule extends BaseModule {
  get settings(): ResponsesSettingsModel {
    return super.settings as ResponsesSettingsModel;
  }

  get settingsScreen(): Subscreen | null {
    return GuiResponses;
  }

  get defaultSettings() {
    return getDefaultResponsesEntries();
  }

  Load(): void {
    onActivity(HookPriority.Observe, ModuleCategory.Responses, (data, sender, msg, metadata) => {
      const dict = activityDeconstruct(metadata);
      if (!dict) return;
      let entry = this.getResponsesEntry(dict?.ActivityName, dict?.ActivityGroup);

      activityHandle(dict, entry);
      conDebug(dict);
    });
  }

  Run(): void {}

  getResponsesEntry(actName: string | undefined, grpName: string | undefined): ResponsesEntryModel | undefined {
    return this.settings.mainResponses.find((a) => a.name.includes(actName) && a.group.includes(grpName));
  }
}
