import { DataManager } from "./Data";
import { ResponsiveModName, ResponsiveVersion } from "../Definition";
import { LoadVersion, SaveVersion, isNewVersion, setIsItNewVersion } from "./Versions";

export function OnLogin() {
  LoadAndMessage();
  DataManager.instance.CheckNewThingies();
  let LoadedVersion = LoadVersion();
  if (isNewVersion(LoadedVersion, ResponsiveVersion)) {
    setIsItNewVersion(true);
    SaveVersion();
  }
  if (Player) {
    Player.BCRVersion = LoadedVersion as string;
  }
}
export function LoadAndMessage() {
  DataManager.instance.ServerTakeData();
  console.log(`${ResponsiveModName} v${ResponsiveVersion} ready.`);
}
