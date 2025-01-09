
import { BaseModule, Subscreen } from 'bc-deeplib';
import { ResponsesSettingsModel } from '../Models/Responses';
import { GuiResponses } from '../Screens/Responses';
import { activityDeconstruct } from '../Utilities/ChatMessages';
import { getDefaultResponsesEntries } from '../Utilities/DefaultResponsesEntries';
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
    });

    SDK.hookFunction(
      'ServerAccountBeep',
      HookPriority.AddBehavior,
      (args, next) => {
        const data = args[0];

        if (!data.ChatRoomName || !ChatRoomData || data.BeepType !== 'Leash') return next(args);
        if (!Player.OnlineSharedSettings?.AllowPlayerLeashing) return next(args);

        next(args);
      },
      ModuleCategory.Global
    );

    SDK.hookFunction(
      'ActivityOrgasmStart',
      HookPriority.Observe,
      (args, next) => {
        next(args);
      },
      ModuleCategory.Global
    );
  }

  run(): void { }
}
