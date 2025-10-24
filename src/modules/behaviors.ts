
import { BaseModule, HookPriority, sdk, sendActionMessage, Subscreen } from 'bc-deeplib/deeplib';
import { BehaviorEntryModel, ResponsesSettingsModel, TriggerDirection, TriggerType } from '../models/behaviours';
import { GuiResponses } from '../screens/behaviors';
import { onActivity } from '../utilities/chat_messages';
import { getDefaultResponsesEntries } from '../utilities/default_responses_entries';
import { ModuleCategory } from '../utilities/sdk';
import { Guid } from 'js-guid';
import { BehaviorIndex } from '_/utilities/behavior_index';

export class ResponsesModule extends BaseModule {
  static instance: ResponsesModule;
  static index = new BehaviorIndex();

  get settings(): ResponsesSettingsModel {
    return super.settings as ResponsesSettingsModel;
  }

  set settings(value) {
    super.settings = value;
  }

  get settingsScreen(): Subscreen | null {
    return GuiResponses;
  }

  load(): void {
    ResponsesModule.instance = this;

    onActivity((data, sender, msg, metadata) => {
      const response = Object.values(this.settings.behaviors).find(e => e.isEnabled && e.reaction.find(r => r.type === 'speech')?.content);
      if (response) {
        sendActionMessage(response.reaction.find(r => r.type === 'speech')?.content.join(' ') || '');
      }
    });

    sdk.hookFunction(
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

    sdk.hookFunction(
      'ActivityOrgasmStart',
      HookPriority.Observe,
      (args, next) => {
        next(args);
      },
      ModuleCategory.Global
    );
  }

  findByGuid(guid: string) {
    return ResponsesModule.instance.settings.behaviors[guid];
  }

  addEntry(entry: BehaviorEntryModel) {
    if (ResponsesModule.index.findByName(entry.name)) return false;

    ResponsesModule.instance.settings.behaviors[entry.guid] = entry;
    ResponsesModule.index.add(entry);

    return true;
  }

  removeEntry(entry: BehaviorEntryModel) {
    ResponsesModule.index.remove(entry);
    delete ResponsesModule.instance.settings.behaviors[entry.guid];

    return true;
  }

  createNewEntry(): BehaviorEntryModel {
    return <BehaviorEntryModel>{
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
      reaction: [{
        type: 'speech',
        content: [],
      }],
    };
  }

  run(): void { }
}