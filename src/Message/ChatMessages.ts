import { send } from "process";
import { DataManager } from "../Data";

export interface ActivityInfo {
    SourceCharacter: { MemberNumber: number };
    TargetCharacter: { MemberNumber: number };
    ActivityGroup: string;
    ActivityName: string;
}

export function ActivityDeconstruct(dict: ChatMessageDictionary): ActivityInfo | undefined {
    let SourceCharacter, TargetCharacter, ActivityGroup, ActivityName;
    for (let v of dict) {
        if (v.TargetCharacter)
            TargetCharacter = { MemberNumber: v.TargetCharacter };
        else if (v.SourceCharacter)
            SourceCharacter = { MemberNumber: v.SourceCharacter };
        else if (v.FocusGroupName)
            ActivityGroup = v.FocusGroupName;
        else if (v.ActivityName)
            ActivityName = v.ActivityName;
    }
    if (SourceCharacter === undefined || TargetCharacter === undefined
        || ActivityGroup === undefined || ActivityName === undefined) return undefined;
    return { SourceCharacter, TargetCharacter, ActivityGroup, ActivityName };
}

export function IsSimpleChat(msg: string) {
    return (
        msg.trim().length > 0 &&
        !msg.startsWith("/") &&
        !msg.startsWith("(") &&
        !msg.startsWith("*") &&
        !msg.startsWith("!") &&
        !msg.startsWith(".") &&
        !msg.startsWith("@") &&
        !msg.startsWith("https")
    );
}

function ChatRoomInterceptMessage(cur_msg: string, msg: string) {
    if (!msg) return;
    ElementValue("InputChat", cur_msg + "... " + msg);
    ChatRoomSendChat();
}

function ChatRoomNormalMessage(msg: string) {
    if (!msg) return;
    let backupChatRoomTargetMemberNumber = ChatRoomTargetMemberNumber;
    ChatRoomTargetMemberNumber = null;
    let oldmsg = ElementValue("InputChat");
    ElementValue("InputChat", msg);
    ChatRoomSendChat();
    ElementValue("InputChat", oldmsg);
    ChatRoomTargetMemberNumber = backupChatRoomTargetMemberNumber;
}

export function ChatRoomAutoInterceptMessage(cur_msg: string, msg: string | undefined, player: Character | undefined, sender: Character | undefined) {
    if (!msg) return;
    msg = ReplaceTemplate(msg, player, sender);

    const modSettings = DataManager.instance.modData.modSettings;
    if (modSettings?.doInterceptMessage && IsSimpleChat(cur_msg) && ChatRoomTargetMemberNumber == null) {
        return ChatRoomInterceptMessage(cur_msg, msg);
    }

    ChatRoomNormalMessage(msg);
}

function ReplaceTemplate(msg: string, player: Character | undefined, sender: Character | undefined) {
    if (player && sender) {
        let playerPronouns = CharacterPronounDescription(player);
        let senderPronouns = CharacterPronounDescription(sender);

        msg = msg.replaceAll("%TARGET%", player.Nickname ? player.Nickname : player.Name);
        msg = msg.replaceAll("%TARGET_PRONOUN%", playerPronouns === "She/Her" ? "she" : "he");
        msg = msg.replaceAll("%TARGET_POSSESIVE%", playerPronouns === "She/Her" ? "her" : "his");
        msg = msg.replaceAll("%TARGET_INTENSIVE%", playerPronouns === "She/Her" ? "her" : "him");

        if (sender === player) {
            msg = msg.replaceAll("%SOURCE%", senderPronouns === "She/Her" ? "she" : "he");
            msg = msg.replaceAll("%SOURCE_PRONOUN%", senderPronouns === "She/Her" ? "she" : "he");
            msg = msg.replaceAll("%SOURCE_POSSESIVE%", senderPronouns === "She/Her" ? "her" : "his");
            msg = msg.replaceAll("%SOURCE_INTENSIVE%", senderPronouns === "She/Her" ? "herself" : "himself");
        }
        
        msg = msg.replaceAll("%SOURCE%", sender.Nickname ? sender.Nickname : sender.Name);
        msg = msg.replaceAll("%SOURCE_PRONOUN%", senderPronouns === "She/Her" ? "she" : "he");
        msg = msg.replaceAll("%SOURCE_POSSESIVE%", senderPronouns === "She/Her" ? "her" : "his");
        msg = msg.replaceAll("%SOURCE_INTENSIVE%", senderPronouns === "She/Her" ? "her" : "him");

        return msg;
    }

    return msg;
}