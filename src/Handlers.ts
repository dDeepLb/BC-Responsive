import { DataManager } from "./Data";
import { ActivityHandle } from "./Message/Activity";
import { ChatMessageHandler } from "./Message/ChatMessageHandler";
import { OrgasmMessage } from "./Message/ResponsesProvider";

    export const OrgasmHandle = (C: Character) => {
        if (!DataManager.instance.data.settings.enable) return;
        if (CurrentScreen !== 'ChatRoom' || !Player) return;
        if (Player.MemberNumber !== C.MemberNumber) return;
        OrgasmMessage(Player);
    };

    export const chatMessageHandler = new ChatMessageHandler;
    chatMessageHandler.Register('Activity', ActivityHandle);