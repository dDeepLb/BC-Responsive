import { getCharacter } from './Other';
import { sdk, HookPriority } from 'bc-deeplib/deeplib';


export enum ModuleCategory {
  Core = -1,
  Global = 0,
  Responses = 1,
  Profiles = 2,
  CharTalk = 3
}

export function onActivity(
  priority: typeof HookPriority[keyof typeof HookPriority],
  module: ModuleCategory,
  callback: (data: ServerChatRoomMessage, sender: Character | undefined, msg: string, metadata: ChatMessageDictionary) => void
) {
  sdk.hookFunction(
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
