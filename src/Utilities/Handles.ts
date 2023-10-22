import { ResponsesEntryModel } from "../Models/Responses";
import { activityMessage, leaveMessage, orgasmMessage } from "./ResponseProvider";

export const orgasmHandle = (C: Character) => {
    if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
    if (CurrentScreen !== "ChatRoom" || !Player) return;
    if (Player.MemberNumber !== C.MemberNumber) return;
    if (!Player.BCResponsive.ResponsesModule.extraResponses.orgasm) return;
    if (ActivityOrgasmRuined) return;

    orgasmMessage();
};

export const activityHandle = (entry: ResponsesEntryModel | undefined, target: Character | undefined, source: Character | undefined) => {
    if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
    if (CurrentScreen !== "ChatRoom" || !Player) return;
    if (target !== Player) return;
    if (!entry || !entry?.responses) return;
    if (!entry.selfTrigger && target === source) return;

    activityMessage(entry, target, source);
};

export const leaveHandle = (data: any) => {
    if (!Player) return;
    if (data.BeepType !== "Leash") return;
    if (!Player?.OnlineSharedSettings?.AllowPlayerLeashing) return;
    if (!data.ChatRoomName) return;
    if (CurrentScreen != "ChatRoom") return;
    if (!ChatRoomData) return;
    if (!(CurrentScreen == "ChatRoom" && ChatRoomData.Name != data.ChatRoomName)) return;

    leaveMessage();
}
