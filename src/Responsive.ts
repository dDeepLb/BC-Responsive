import { LoadCommands } from './Commands';
import { DataManager } from './Data';
import { BCRVersion, mod, ModName } from './Definition';
import { GUISetting } from './GUI/GUI';
import { LoadHooks } from './Hook';
import { onLogin } from './utils';


(function () {
    if (window.BCResponsive_Loaded) return;
    window.BCResponsive_Loaded = false;

    if ( Player && Player.OnlineSettings ) {
        onLogin();
    }

    //Load GUI
    const GUI = new GUISetting;
    GUI.load(mod);

    //New Instance
    DataManager.init();

    LoadCommands();
    LoadHooks();

    window.BCResponsive_Loaded = true;
    console.log(`${ModName} v${BCRVersion} loaded.`);
})()
