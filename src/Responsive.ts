import bcMod from 'bondage-club-mod-sdk'
import { ActivityHandle } from './Message/Activity';
import { ChatMessageHandler } from './Message/ChatMessageHandler';
import { DataManager } from './Data';
import { DebugMode, ModName, ModVersion, Repository } from './Definition';
import { OrgasmMessage } from './Message/MoanProvider';
import { GUISetting } from './GUI/GUI';

(function () {
    if (window.BCResponsive_Loaded) return;

    let mod = bcMod.registerMod({ name: ModName, fullName: ModName, version: ModVersion, repository: Repository });

    window.BCResponsive_Loaded = false;

    const OrgasmHandle = (C: Character) => {
        if (!DataManager.instance.data.settings.enable) return;
        if (CurrentScreen !== 'ChatRoom' || !Player) return;
        if (Player.MemberNumber !== C.MemberNumber) return;
        OrgasmMessage(Player);
    };
    const chatMessageHandler = new ChatMessageHandler;

    mod.hookFunction('ChatRoomMessage', 9, (args, next) => {
        next(args);
        chatMessageHandler.Run(Player, args[0] as IChatRoomMessage);
    });

    mod.hookFunction('ActivityOrgasmStart', 9, (args, next) => {
        OrgasmHandle(args[0] as Character);
        next(args);
    });
    chatMessageHandler.Register('Activity', ActivityHandle);
    const MainMenu = new GUISetting;
    MainMenu.load(mod);
    DataManager.init();

    function LoadAndMessage() {
        DataManager.instance.ServerTakeData();
        console.log(`${ModName} v${ModVersion} ready.`);
    }
    if(DebugMode) {console.debug("")}
    mod.hookFunction('LoginResponse', 0, (args, next) => {
        next(args);
        LoadAndMessage();
    });

    if (Player && Player.MemberNumber) {
        LoadAndMessage();
    }

    window.BCResponsive_Loaded = true;

    console.log(`${ModName} v${ModVersion} loaded.`);
})()