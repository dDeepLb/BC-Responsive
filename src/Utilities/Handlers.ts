import { animateSpeech } from "./CharTalk";
import { ResponsesEntryModel } from "../Models/Responses";
import { GlobalModule } from "../Modules/Global";
import { isSimpleChat } from "./ChatMessages";
import { activityMessage, leaveMessage, orgasmMessage } from "./ChatMessages";
import { ModName } from "./Definition";

const doesBcxAllowsTalking = () => {
  const isRuleWorking = (ruleName: string) => {
    const rule = window.bcx.getModApi(ModName).getRuleState(ruleName);

    return rule.inEffect && rule.isEnforced;
  };

  if (
    isRuleWorking("speech_forbid_open_talking") ||
    isRuleWorking("speech_limit_open_talking") ||
    isRuleWorking("speech_specific_sound") ||
    isRuleWorking("speech_mandatory_words")
  ) {
    return false;
  }
  return true;
};

export const orgasmHandle = (c: Character) => {
  if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
  if (!Player.BCResponsive.GlobalModule.responsesEnabled) return;
  if (CurrentScreen !== "ChatRoom" || !Player) return;
  if (Player.MemberNumber !== c.MemberNumber) return;
  if (!Player.BCResponsive.ResponsesModule.extraResponses.orgasm) return;
  if (ActivityOrgasmRuined) return;
  if (window.bcx && !doesBcxAllowsTalking()) return;

  orgasmMessage();
};

export const activityHandle = (dict: ActivityInfo, entry: ResponsesEntryModel) => {
  if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
  if (!Player.BCResponsive.GlobalModule.responsesEnabled) return;
  if (CurrentScreen !== "ChatRoom" || !Player) return;
  if (dict.TargetCharacter.MemberNumber !== Player.MemberNumber) return;
  if (!entry || !entry?.responses) return;
  if (!entry.selfTrigger && dict.TargetCharacter === dict.SourceCharacter) return;
  if (window.bcx && !doesBcxAllowsTalking()) return;

  activityMessage(dict, entry);
};

export const leaveHandle = (data: any) => {
  if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
  if (!Player.BCResponsive.GlobalModule.doLeaveMessage) return;
  if (CurrentScreen !== "ChatRoom" || !Player) return;
  if (!data.ChatRoomName || !ChatRoomData || data.BeepType !== "Leash") return;
  if (!Player?.OnlineSharedSettings?.AllowPlayerLeashing) return;
  if (!(CurrentScreen == "ChatRoom" && ChatRoomData.Name != data.ChatRoomName)) return;
  if (window.bcx && !doesBcxAllowsTalking()) return;

  leaveMessage();
};

export const charTalkHandle = (c: Character, msg: string) => {
  if (!Player.BCResponsive.GlobalModule.ResponsiveEnabled) return;
  if (!Player.BCResponsive.GlobalModule.CharTalkEnabled) return;
  if (!c) return;

  const fIsSimpleChat = !!isSimpleChat(msg);

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
