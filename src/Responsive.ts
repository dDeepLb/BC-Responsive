import { LoadCommands } from './Utilities/Commands';
import { DataManager } from './Data';
import { ResponsiveVersion, ResponsiveMod, ResponsiveModName } from './Definition';
import { GUISetting } from './GUI/GUI';
import { LoadHooks } from './Utilities/Hooks';
import { onLogin } from './Utilities/Utilities';


(function () {
    if (window.ResponsiveLoaded) return;
    window.ResponsiveLoaded = false;

    if ( Player && Player.OnlineSettings ) {
        onLogin();
    }

    //Load GUI
    const GUI = new GUISetting;
    GUI.load(ResponsiveMod);

    //New Instance
    DataManager.init();

    LoadCommands();
    LoadHooks();

    window.ResponsiveLoaded = true;
    console.log(`${ResponsiveModName} v${ResponsiveVersion} loaded.`);
})()
