import { hookFunction, ModVersion, SDK } from "./Utilities/SDK";
import { registerModule, modules, getModule } from "./Modules";
import { GUI } from "./Base/SettingUtils";
import { ResponsesModule } from "./Modules/Responses";
import { ProfilesModule } from "./Modules/Profiles";
import { conDebug, conInfo, conLog } from "./Utilities/Console";
import { GlobalModule } from "./Modules/Global";
import { clearOldData, dataStore, dataTake } from "./Utilities/Data";
import { RibbonMenu } from "./Utilities/RibbonMenu";
import { loadCommands } from "./Utilities/Commands";
import { sendLocalSmart } from "./Utilities/Messages";

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

  RibbonMenu.registerMod("Responsive");

  dataTake();
  loadCommands();

  if (!initModules()) {
    unload();
    return;
  }
  clearOldData();

  GlobalModule.checkIfNewVersion();

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
