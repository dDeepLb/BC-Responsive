import { animateSpeech } from "../CharTalk";
import { ResponsesEntryModel } from "../Models/Responses";
import { GlobalModule } from "../Modules/Global";
import { isSimpleChat } from "./ChatMessages";
import { activityMessage, leaveMessage, orgasmMessage } from "./ChatMessages";

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

export const charTalkHandle = (c: Character, msg: string) => {
  const charTalkEnabled = Player.BCResponsive.GlobalModule.CharTalkEnabled;
  const fIsSimpleChat = !!isSimpleChat(msg);

  if (!charTalkEnabled) return;
  if (!c) return;

  if (fIsSimpleChat && GlobalModule.doAnimate_CT && !GlobalModule.isOrgasm_CT) {
    animateSpeech(c, msg);
  }

  if (!fIsSimpleChat && msg !== "") {
    GlobalModule.doAnimate_CT = false;
    return;
  }

  if (fIsSimpleChat && !GlobalModule.doAnimate_CT) {
    GlobalModule.doAnimate_CT = true;
    animateSpeech(c, msg);
  }

  if (GlobalModule.isOrgasm_CT) {
    GlobalModule.isOrgasm_CT = false;
  }
};
