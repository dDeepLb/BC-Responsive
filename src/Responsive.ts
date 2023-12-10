import { GUI } from "./Base/SettingUtils";
import { modules, registerModule } from "./Base/Modules";
import { GlobalModule } from "./Modules/Global";
import { ProfilesModule } from "./Modules/Profiles";
import { ResponsesModule } from "./Modules/Responses";
import bcr_style from "./Static/main.css";
import { loadCommands } from "./Utilities/Commands";
import { conDebug, conLog } from "./Utilities/Console";
import { clearOldData, dataStore, dataTake } from "./Utilities/Data";
import { injectStyle } from "./Utilities/Other";
import { RibbonMenu } from "./Utilities/RibbonMenu";
import { hookFunction } from "./Utilities/SDK";
import { ModVersion } from "./Utilities/Definition";
import { VersionModule } from "./Modules/Version";

function initWait() {
  conLog("Init wait");
  if (CurrentScreen == null || CurrentScreen === "Login") {
    hookFunction("LoginResponse", 0, (args, next) => {
      conDebug(`Init! LoginResponse caught: `, args);
      next(args);
      const response = args[0];
      if (response && typeof response.Name === "string" && typeof response.AccountName === "string") {
        init();
      }
    });
  } else {
    conLog(`Already logged in, init`);
    init();
  }
}

export function init() {
  if (window.ResponsiveLoaded) return;

  injectStyle(bcr_style, "bcr_style");

  RibbonMenu.registerMod("Responsive");

  dataTake();
  loadCommands();

  if (!initModules()) {
    unload();
    return;
  }
  clearOldData();

  VersionModule.checkIfNewVersion();

  dataStore();

  window.ResponsiveLoaded = true;
  conLog(`Loaded! Version: ${ModVersion}`);
}

function initModules(): boolean {
  registerModule(new GUI());
  registerModule(new GlobalModule());
  registerModule(new ResponsesModule());
  registerModule(new ProfilesModule());

  for (const m of modules()) {
    m.Init();
  }

  for (const m of modules()) {
    m.Load();
  }

  for (const m of modules()) {
    m.Run();
  }

  conLog("Modules Loaded.");
  return true;
}

export function unload(): true {
  unloadModules();

  delete window.ResponsiveLoaded;
  conLog("Unloaded.");
  return true;
}

function unloadModules() {
  for (const m of modules()) {
    m.Unload();
  }
}

initWait();
