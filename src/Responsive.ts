import { HookFunction, ResponsiveVersion, SDK } from "./Utilities/SDK";
//import { GUISetting } from "./GUI/GUI";
import { OnLogin } from "./Utilities/Login";
import { registerModule, modules } from "./Modules";
import { GUI } from "./Settings/SettingUtils";
import { ResponsesModule } from "./Modules/Responses";
import { ProfilesModule } from "./Modules/Profiles";
import { SettingsModel } from "./Settings/Models/Settings";
import { ConDebug, ConLog } from "./Utilities/Console";
import { GlobalModule } from "./Modules/Global";
import { DataStore, DataTake } from "./Utilities/Data";

function InitWait() {
  ConLog("Init");
  if (CurrentScreen == null || CurrentScreen === "Login") {
    HookFunction("LoginResponse", 0, (args, next) => {
      ConDebug(`Init LoginResponse caught: `, args);
      next(args);
      const response = args[0];
      if (response && typeof response.Name === "string" && typeof response.AccountName === "string") {
        loginInit();
      }
    });
    ConLog(`Ready!`);
  } else {
    ConLog("Already logged in, init");
    init();
  }
}

export function loginInit() {
  if (window.ResponsiveLoaded)
    return;
  init();
}

export function init() {
  if (window.ResponsiveLoaded)
    return;

  //OnLogin();

  DataTake();

  if (!init_modules()) {
    Unload();
    return;
  }

  DataStore();

  window.ResponsiveLoaded = true;
  console.log(`Responsive loaded! Version: ${ResponsiveVersion}`);
}

function init_modules(): boolean {
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


  console.info("LSCG Modules Loaded.");
  return true;
}

export function Unload(): true {
  unload_modules();

  delete window.ResponsiveLoaded;
  console.log("LSCG: Unloaded.");
  return true;
}

function unload_modules() {
  for (const m of modules()) {
    m.unload();
  }
}

InitWait();