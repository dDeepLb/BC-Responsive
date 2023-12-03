import { BaseModule } from "../Base/BaseModule";
import { activityDeconstruct } from "../Utilities/ChatMessages";
import { activityHandle, leaveHandle, orgasmHandle } from "../Utilities/Handlers";
import { ResponsesEntryModel, ResponsesSettingsModel } from "../Models/Responses";
import { GuiResponses } from "../Screens/Responses";
import { Subscreen } from "../Base/SettingDefinitions";
import { conDebug } from "../Utilities/Console";
import { getDefaultResponsesEntries } from "../Utilities/DefaultResponsesEntries";
import { HookPriority, ModuleCategory, hookFunction, onActivity } from "../Utilities/SDK";

export class ResponsesModule extends BaseModule {
  static isOrgasm_CT: boolean = false;

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

    //Leave Message
    hookFunction(
      "ServerAccountBeep",
      HookPriority.AddBehavior,
      (args, next) => {
        let data = args[0];

        if (!data.ChatRoomName || !ChatRoomData || data.BeepType !== "Leash") return next(args);
        if (!Player.OnlineSharedSettings?.AllowPlayerLeashing) return next(args);

        leaveHandle(data);
        next(args);
      },
      ModuleCategory.Global
    );

    //Orgasm Handling
    hookFunction(
      "ActivityOrgasmStart",
      HookPriority.Observe,
      (args, next) => {
        ResponsesModule.isOrgasm_CT = true;
        orgasmHandle(args[0] as Character);
        next(args);
      },
      ModuleCategory.Global
    );
  }

  Run(): void {}

  getResponsesEntry(actName: string | undefined, grpName: string | undefined): ResponsesEntryModel | undefined {
    return this.settings.mainResponses.find((ent) => ent.actName === actName && ent.groupName.includes(grpName));
  }
}
