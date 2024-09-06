
import { BaseModule, Subscreen } from 'bc-deeplib';
import { ResponsesEntryModel, ResponsesSettingsModel } from '../Models/Responses';
import { GuiResponses } from '../Screens/Responses';
import { activityDeconstruct } from '../Utilities/ChatMessages';
import { getDefaultResponsesEntries } from '../Utilities/DefaultResponsesEntries';
import { activityHandle, leaveHandle, orgasmHandle } from '../Utilities/Handlers';
import { HookPriority, ModuleCategory, SDK, onActivity } from '../Utilities/SDK';

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

  load(): void {
    onActivity(HookPriority.Observe, ModuleCategory.Responses, (data, sender, msg, metadata) => {
      const dict = activityDeconstruct(metadata);
      if (!dict) return;
      const entry = this.getResponsesEntry(dict?.ActivityName, dict?.ActivityGroup);

      activityHandle(dict, entry);
    });

    SDK.hookFunction(
      'ServerAccountBeep',
      HookPriority.AddBehavior,
      (args, next) => {
        const data = args[0];

        if (!data.ChatRoomName || !ChatRoomData || data.BeepType !== 'Leash') return next(args);
        if (!Player.OnlineSharedSettings?.AllowPlayerLeashing) return next(args);

        leaveHandle(data);
        next(args);
      },
      ModuleCategory.Global
    );

    SDK.hookFunction(
      'ActivityOrgasmStart',
      HookPriority.Observe,
      (args, next) => {
        orgasmHandle(args[0] as Character);
        next(args);
      },
      ModuleCategory.Global
    );
  }

  run(): void { }

  getResponsesEntry(actName: string | undefined, grpName: string | undefined): ResponsesEntryModel | undefined {
    if (!actName || !grpName) return;
    
    return this.settings.mainResponses.find((ent) => ent.actName === actName && ent.groupName.includes(grpName));
  }
}
