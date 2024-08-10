import { bcSdkMod } from 'bc-deeplib';
import { FullModName, ModName, ModRepository } from './Definition';
import { getCharacter } from './Other';

export const SDK = new bcSdkMod(
  {
    name: ModName,
    fullName: FullModName,
    version: MOD_VERSION,
    repository: ModRepository
  },
  {
    allowReplace: false
  }
);

export enum ModuleCategory {
  Core = -1,
  Global = 0,
  Responses = 1,
  Profiles = 2,
  CharTalk = 3
}

export enum HookPriority {
  Observe = 0,
  AddBehavior = 1,
  ModifyBehavior = 5,
  OverrideBehavior = 10,
  Top = 100
}

export function onActivity(
  priority: HookPriority,
  module: ModuleCategory,
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, metadata: ChatMessageDictionary) => void
) {
  SDK.hookFunction(
    'ChatRoomMessage',
    priority,
    (args, next) => {
      const data = args[0];
      const sender = getCharacter(data.Sender);
      if (data.Type === 'Activity' && data.Dictionary) callback(data, sender, data.Content, data.Dictionary);
      next(args);
    },
    module
  );
}
