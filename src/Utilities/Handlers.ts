import { ResponsesEntryModel } from "../Models/Responses";
import { activityMessage, leaveMessage, orgasmMessage } from "./ResponseProvider";

export const orgasmHandle = (c: Character) => {
  if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
  if (CurrentScreen !== "ChatRoom" || !Player) return;
  if (Player.MemberNumber !== c.MemberNumber) return;
  if (!Player.BCResponsive.ResponsesModule.extraResponses.orgasm) return;
  if (ActivityOrgasmRuined) return;

  orgasmMessage();
};

export const activityHandle = (dict: ActivityInfo, entry: ResponsesEntryModel) => {
  if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
  if (CurrentScreen !== "ChatRoom" || !Player) return;
  if (dict.TargetCharacter.MemberNumber !== Player.MemberNumber) return;
  if (!entry || !entry?.responses) return;
  if (!entry.selfTrigger && dict.TargetCharacter === dict.SourceCharacter) return;

  activityMessage(dict, entry);
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
};
