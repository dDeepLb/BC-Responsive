import { LoadCommands } from "./Utilities/Commands";
import { DataManager } from "./Utilities/Data";
import { ResponsiveVersion, ResponsiveMod, ResponsiveModName } from "./Definition";
import { GUISetting } from "./GUI/GUI";
import { LoadHooks } from "./Utilities/Hooks";
import { OnLogin } from "./Utilities/Login";

(function Responsive() {
  if (window.ResponsiveLoaded) return;
  window.ResponsiveLoaded = false;

  if (Player && Player.OnlineSettings) {
    OnLogin();
  }

  //Load GUI
  const GUI = new GUISetting();
  GUI.load(ResponsiveMod);

  //New Instance
  DataManager.init();

  LoadCommands();
  LoadHooks();

  window.ResponsiveLoaded = true;
  console.log(`${ResponsiveModName} v${ResponsiveVersion} loaded.`);
})();
