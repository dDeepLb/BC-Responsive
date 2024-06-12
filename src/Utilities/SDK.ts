import { getCharacter } from './Other';
import { ModName, FullModName, ModVersion, ModRepository } from './Definition';
import { bcSdkMod } from 'bc-deeplib';

export const SDK = new bcSdkMod(
  {
    name: ModName,
    fullName: FullModName,
    version: ModVersion,
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
  priority: any,
  module: ModuleCategory,
  callback: (data: any, sender: Character | undefined, msg: string, metadata: ChatMessageDictionary) => void
) {
  SDK.hookFunction(
    'ChatRoomMessage',
    priority,
    (args, next) => {
      const data = args[0];
      const sender = getCharacter(data.Sender);
      if (data.Type == 'Activity') callback(data, sender, data.Content, data.Dictionary);
      next(args);
    },
    module
  );
}
