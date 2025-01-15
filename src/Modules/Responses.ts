
import { BaseModule, Subscreen } from 'bc-deeplib';
import { ResponsesEntryModel, ResponsesSettingsModel } from '../Models/Responses';
import { GuiResponses } from '../Screens/Responses';
import { activityDeconstruct } from '../Utilities/ChatMessages';
import { getDefaultResponsesEntries } from '../Utilities/DefaultResponsesEntries';
import { HookPriority, ModuleCategory, SDK, onActivity } from '../Utilities/SDK';
import { Guid } from 'js-guid';

export class ResponsesModule extends BaseModule {
  static instance: ResponsesModule;

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
    ResponsesModule.instance = this;

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

  findEntryByName(name: string) {
    return ResponsesModule.instance.settings.find((e) => e.name === name);
  }

  findEntryByGuid(guid: string) {
    return ResponsesModule.instance.settings.find((e) => e.guid === guid);
  }

  addEntry(entry: ResponsesEntryModel) {
    if (ResponsesModule.instance.findEntryByName(entry.name)) return false;

    ResponsesModule.instance.settings.unshift(entry);

    return true;
  }

  removeEntry(entry: ResponsesEntryModel) {
    ResponsesModule.instance.settings.splice(ResponsesModule.instance.settings.indexOf(entry), 1);
  }
  
  createNewEntry(): ResponsesEntryModel {
    return <ResponsesEntryModel>{
      name: 'New Entry',
      guid: Guid.newGuid().toString(),
      isEnabled: true,
      priority: 0,
      trigger: [{
        type: 'activity',
        direction: 'incoming',
        activityName: [],
        groupName: [],
      }],
      response: [{
        type: 'speech',
        content: [],
      }],
    };
  }

  run(): void { }
}
