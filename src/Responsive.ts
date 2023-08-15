import { DataManager } from './Data';
import { BCRVersion, mod, ModName } from './Definition';
import { GUISetting } from './GUI/GUI';
import { LoadHooks } from './Hook';


(function () {
    if (window.BCResponsive_Loaded) return;
    window.BCResponsive_Loaded = false;

    //Load GUI
    const GUI = new GUISetting;
    GUI.load(mod);

    //New Insance
    DataManager.init();

    LoadHooks();

    window.BCResponsive_Loaded = true;
    console.log(`${ModName} v${BCRVersion} loaded.`);
})()
