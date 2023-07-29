import { DataManager } from "../Data";
import { ActivityDeconstruct } from "./ChatMessages";
import { BoopMessage, MasturbateMoan, PainMessage, TickleMessage } from "./MoanProvider";

const ActivityDict = new Map<string, (player: Character) => void>([
    ['Pet', (player) => BoopMessage(player, 'Pet')],
    ['Slap', (player) => PainMessage(player, 'Slap')],
    ['Bite', (player) => PainMessage(player, 'Bite')],
    ['Spank', (player) => PainMessage(player, 'Spank')],
    ['Kick', (player) => PainMessage(player, 'Kick')],
    ['Pinch', (player) => PainMessage(player, 'Pinch')],
    ['SpankItem', (player) => PainMessage(player, 'SpankItem')],
    ['ShockItem', (player) => PainMessage(player, 'ShockItem')],
    ['LSCG_SharkBite', (player) => PainMessage(player, 'LSCG_SharkBite')],
    ['Tickle', (player) => TickleMessage(player, 'Tickle')],
    ['TickleItem', (player) => TickleMessage(player, 'TickleItem')],
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
    if (f !== undefined) f(player);
}