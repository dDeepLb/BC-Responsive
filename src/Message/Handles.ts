import { ResponsesEntryModel } from "../Settings/Models/Responses";
import { ActivityMessage, OrgasmMessage } from "./ResponseProvider";


export const OrgasmHandle = (C: Character) => {
    if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
    if (CurrentScreen !== "ChatRoom" || !Player) return;
    if (Player.MemberNumber !== C.MemberNumber) return;
    if (!Player.BCResponsive.ResponsesModule.extraResponses.orgasm) return;
    if (ActivityOrgasmRuined) return;
    OrgasmMessage();
};

export const ActivityHandle = (entry: ResponsesEntryModel | undefined, target: Character | undefined, sender: Character | undefined) => {
    if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
    if (CurrentScreen !== "ChatRoom" || !Player) return;
    if (!entry || !entry?.responses) return;
    if (!entry.selfTrigger && target === sender) return;
    ActivityMessage(entry, target, sender);
};