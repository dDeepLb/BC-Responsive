import { HookFunction, ModVersion, SDK } from "./Utilities/SDK";
import { registerModule, modules } from "./Modules";
import { GUI } from "./Settings/SettingUtils";
import { ResponsesModule } from "./Modules/Responses";
import { ProfilesModule } from "./Modules/Profiles";
import { ConDebug, ConInfo, ConLog } from "./Utilities/Console";
import { GlobalModule } from "./Modules/Global";
import { DataStore, DataTake } from "./Utilities/Data";
import { RibbonMenu } from "./Utilities/RibbonMenu";

function InitWait() {
  ConLog("Init wait");
  if (CurrentScreen == null || CurrentScreen === "Login") {
    HookFunction("LoginResponse", 0, (args, next) => {
      ConDebug(`Init! LoginResponse caught: `, args);
      next(args);
      const response = args[0];
      if (response && typeof response.Name === "string" && typeof response.AccountName === "string") {
        init();
      }
    });
  } else {
    ConLog(`Already logged in, init`);
    init();
  }
}

export function init() {
  if (window.ResponsiveLoaded)
    return;

  ConInfo(Player);
  ConInfo("Hello", Player.OnlineSettings);
  RibbonMenu.RegisterMod("Responsive");

  DataTake();

  if (!initModules()) {
    Unload();
    return;
  }

  DataStore();

  window.ResponsiveLoaded = true;
  ConLog(`Loaded! Version: ${ModVersion}`);
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


  ConLog("Modules Loaded.");
  return true;
}

export function Unload(): true {
  unloadModules();

  delete window.ResponsiveLoaded;
  ConLog("Unloaded.");
  return true;
}

function unloadModules() {
  for (const m of modules()) {
    m.unload();
  }
}

InitWait();