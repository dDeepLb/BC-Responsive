import { DataManager } from "../Utilities/Data";
import { MoanType } from "../Definition";
import { ShuffleStr } from "../Utilities/ShuffleStr";
import { ActivityInfo, ChatRoomAutoInterceptMessage } from "./ChatMessages";

let ShiftingMoans: ResponsiveSetting = {
  hot: [],
  medium: [],
  light: [],
  low: [],
  orgasm: [],
  pain: [],
  tickle: [],
  boop: [],
};

function NextMoanString(key: keyof ResponsiveSetting) {
  if (ShiftingMoans[key].length === 0) {
    let r = DataManager.instance.data[key];
    if (r.length > 0) ShiftingMoans[key] = ShuffleStr(r);
  }

  if (ShiftingMoans[key].length > 0) {
    return ShiftingMoans[key].shift() as string;
  }

  return "";
}

function TypedMoan(t: MoanType) {
  let k: keyof ResponsiveSetting | undefined;
  if (t === MoanType.Orgasm) k = "orgasm";
  else if (t === MoanType.Pain) k = "pain";
  else if (t === MoanType.Tickle) k = "tickle";
  else if (t === MoanType.Boop) k = "boop";
  if (!k) return "";
  return NextMoanString(k);
}

function BaseMoan(Arousal: number, shift?: number) {
  let factor = Math.floor(Arousal / 20);
  if (shift) factor -= shift;
  if (factor < 0) factor = 0;
  else if (factor > 5) factor = 5;
  const Tkeys: (keyof ResponsiveSetting)[] = ["low", "low", "light", "medium", "hot", "hot"];
  let k = Tkeys[factor];
  return NextMoanString(k);
}

function MixMoan(player: Character, t: MoanType, act: string) {
  if (player.ArousalSettings) {
    let actFactor = player.ArousalSettings.Activity.find((_) => _.Name === act)?.Self;
    if (!actFactor) return "";

    let threthold1 = Math.max(10, (4 - actFactor) * 25);
    let threthold2 = threthold1 + 40;
    let arousal = player.ArousalSettings.Progress;
    if (arousal <= threthold1) {
      return TypedMoan(t);
    } else {
      let m = BaseMoan(arousal);
      if (!m) return TypedMoan(t);
      else {
        if (arousal <= threthold2) {
          return TypedMoan(t) + "♥" + BaseMoan(arousal) + "♥";
        } else {
          return "♥" + BaseMoan(arousal) + "♥";
        }
      }
    }
  }
}

function BaseMoanStepped(player: Character, act: string) {
  if (player.ArousalSettings) {
    let actFactor = player.ArousalSettings.Activity.find((_) => _.Name === act)?.Self;
    if (!actFactor) return "";

    let threthold1 = Math.max(10, (4 - actFactor) * 25);
    let threthold2 = threthold1 + 40;
    let arousal = player.ArousalSettings.Progress;
    if (arousal <= threthold1) {
      return BaseMoan(arousal, 1);
    } else if (arousal <= threthold2) {
      return BaseMoan(arousal, 0);
    } else {
      return BaseMoan(arousal, -1);
    }
  }
}

export function MasturbateMoan(player: Character, sender: Character, masturSrc: "MasturbateHand" | "MasturbateFist" | "MasturbateFoot" | "MasturbateItem" | "MasturbateTongue") {
  const result = BaseMoanStepped(player, masturSrc);
  if (typeof result === "string") {
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), result, player, sender);
  }
}

export function PainMessage(player: Character, sender: Character, painSrc: "Bite" | "Slap" | "Pinch" | "Spank" | "SpankItem" | "ShockItem" | "Kick" | "LSCG_SharkBite", activityInfo: ActivityInfo) {
  if (DataManager.instance.data.pain.length == 0) return;
  if (activityInfo.ActivityName === "Bite" && activityInfo.ActivityGroup == "ItemHead") return;
  if (!DataManager.instance.data.modSettings.isSharkBiteEnabled && activityInfo.ActivityName === "LSCG_SharkBite" && activityInfo.ActivityGroup !== "ItemNose") return;
  if (activityInfo.ActivityName === "LSCG_SharkBite" && activityInfo.ActivityGroup === "ItemNose") return BoopMessage(player, sender, "LSCG_SharkBite", activityInfo);
  const result = MixMoan(player, MoanType.Pain, painSrc);
  if (typeof result === "string") {
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), result, player, sender);
  }
}

export function OrgasmMessage(player: Character) {
  if (DataManager.instance.data.orgasm.length == 0) return;
  ChatRoomAutoInterceptMessage(ElementValue("InputChat"), TypedMoan(MoanType.Orgasm), undefined, undefined);
}

export function TickleMessage(player: Character, sender: Character, tickleSrc: "TickleItem" | "Tickle", activityInfo: ActivityInfo) {
  if (DataManager.instance.data.tickle.length == 0) return;
  if (activityInfo.SourceCharacter.MemberNumber === activityInfo.TargetCharacter.MemberNumber) return;
  const result = MixMoan(player, MoanType.Tickle, tickleSrc);
  if (typeof result === "string") {
    ChatRoomAutoInterceptMessage(ElementValue("InputChat"), result, player, sender);
  }
}

export function BoopMessage(player: Character, sender: Character, boopSrc: "Pet" | "LSCG_SharkBite", activityInfo: ActivityInfo) {
  if (DataManager.instance.data.boop.length == 0) return;
  if (activityInfo.ActivityGroup === "ItemHead") return;
  ChatRoomAutoInterceptMessage(ElementValue("InputChat"), TypedMoan(MoanType.Boop), player, sender);
}

export function LeaveMessage() {
  if (!DataManager.instance.data.modSettings.isLeaveMessageEnabled) return;
  ChatRoomAutoInterceptMessage(ElementValue("InputChat"), " ", undefined, undefined);
}
