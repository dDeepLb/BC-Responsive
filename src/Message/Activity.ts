import { DataManager } from "../Data";
import { ActivityDeconstruct, ActivityInfo } from "./ChatMessages";
import { BoopMessage, MasturbateMoan, PainMessage, TickleMessage } from "./MoanProvider";

const ActivityDict = new Map<string, (player: Character, activityInfo: ActivityInfo) => void>([
    ['Pet', (player, activityInfo) => BoopMessage(player, 'Pet', activityInfo)],
    ['LSCG_SharkBite', (player, activityInfo) => BoopMessage(player, 'LSCG_SharkBite', activityInfo)],

    ['Slap', (player, activityInfo) => PainMessage(player, 'Slap', activityInfo)],
    ['Bite', (player, activityInfo) => PainMessage(player, 'Bite', activityInfo)],
    ['Spank', (player, activityInfo) => PainMessage(player, 'Spank', activityInfo)],
    ['Kick', (player, activityInfo) => PainMessage(player, 'Kick', activityInfo)],
    ['Pinch', (player, activityInfo) => PainMessage(player, 'Pinch', activityInfo)],
    ['SpankItem', (player, activityInfo) => PainMessage(player, 'SpankItem', activityInfo)],
    ['ShockItem', (player, activityInfo) => PainMessage(player, 'ShockItem', activityInfo)],
    ['LSCG_SharkBite', (player, activityInfo) => PainMessage(player, 'LSCG_SharkBite', activityInfo)],

    ['Tickle', (player, activityInfo) => TickleMessage(player, 'Tickle', activityInfo)],
    ['TickleItem', (player, activityInfo) => TickleMessage(player, 'TickleItem', activityInfo)],

    ['MasturbateItem', (player) => MasturbateMoan(player, 'MasturbateItem')],
    ['MasturbateHand', (player) => MasturbateMoan(player, 'MasturbateHand')],
    ['MasturbateFist', (player) => MasturbateMoan(player, 'MasturbateFist')],
    ['MasturbateFoot', (player) => MasturbateMoan(player, 'MasturbateFoot')],
    ['MasturbateTongue', (player) => MasturbateMoan(player, 'MasturbateTongue')],
]);

export function ActivityHandle(player: Character, sender: Character, data: IChatRoomMessage) {
    if (!DataManager.instance.data.settings.enable) return;
    if (!data.Dictionary) return;
    let activityInfo = ActivityDeconstruct(data.Dictionary);
    if (activityInfo == undefined) return;
    if (activityInfo.TargetCharacter.MemberNumber !== player.MemberNumber) return;

    let f = ActivityDict.get(activityInfo.ActivityName);
    if (f !== undefined) f(player, activityInfo);
}