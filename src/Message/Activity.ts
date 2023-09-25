import { DataManager } from "../Utilities/Data";
import { ActivityDeconstruct, ActivityInfo } from "./ChatMessages";
import { BoopMessage, MasturbateMoan, PainMessage, TickleMessage } from "./ResponsesProvider";

const ActivityDict = new Map<string, (player: Character, sender: Character, activityInfo: ActivityInfo) => void>([
  ["Pet", (player, sender, activityInfo) => BoopMessage(player, sender, "Pet", activityInfo)],
  ["LSCG_SharkBite", (player, sender, activityInfo) => BoopMessage(player, sender, "LSCG_SharkBite", activityInfo)],

  ["Slap", (player, sender, activityInfo) => PainMessage(player, sender, "Slap", activityInfo)],
  ["Bite", (player, sender, activityInfo) => PainMessage(player, sender, "Bite", activityInfo)],
  ["Spank", (player, sender, activityInfo) => PainMessage(player, sender, "Spank", activityInfo)],
  ["Kick", (player, sender, activityInfo) => PainMessage(player, sender, "Kick", activityInfo)],
  ["Pinch", (player, sender, activityInfo) => PainMessage(player, sender, "Pinch", activityInfo)],
  ["SpankItem", (player, sender, activityInfo) => PainMessage(player, sender, "SpankItem", activityInfo)],
  ["ShockItem", (player, sender, activityInfo) => PainMessage(player, sender, "ShockItem", activityInfo)],
  ["LSCG_SharkBite", (player, sender, activityInfo) => PainMessage(player, sender, "LSCG_SharkBite", activityInfo)],

  ["Tickle", (player, sender, activityInfo) => TickleMessage(player, sender, "Tickle", activityInfo)],
  ["TickleItem", (player, sender, activityInfo) => TickleMessage(player, sender, "TickleItem", activityInfo)],

  ["MasturbateItem", (player, sender) => MasturbateMoan(player, sender, "MasturbateItem")],
  ["MasturbateHand", (player, sender) => MasturbateMoan(player, sender, "MasturbateHand")],
  ["MasturbateFist", (player, sender) => MasturbateMoan(player, sender, "MasturbateFist")],
  ["MasturbateFoot", (player, sender) => MasturbateMoan(player, sender, "MasturbateFoot")],
  ["MasturbateTongue", (player, sender) => MasturbateMoan(player, sender, "MasturbateTongue")],
]);

export function ActivityHandle(player: Character, sender: Character, data: IChatRoomMessage) {
  if (!DataManager.instance.data.settings.enable) return;
  if (!data.Dictionary) return;
  let activityInfo = ActivityDeconstruct(data.Dictionary);
  if (activityInfo == undefined) return;
  if (activityInfo.TargetCharacter.MemberNumber !== player.MemberNumber) return;

  let f = ActivityDict.get(activityInfo.ActivityName);
  if (f !== undefined) f(player, sender, activityInfo);
}
