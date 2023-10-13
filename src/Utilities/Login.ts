import { ResponsiveModName, ResponsiveVersion } from "./SDK";
import { ServerTakeData } from "./Data";
import { LoadVersion, SaveVersion, isNewVersion, setIsItNewVersion } from "./Versions";

export function OnLogin() {
  LoadAndMessage();
  let LoadedVersion = LoadVersion();
  if (isNewVersion(LoadedVersion, ResponsiveVersion)) {
    setIsItNewVersion(true);
    SaveVersion();
  }
}
export function LoadAndMessage() {
  ServerTakeData();
  console.log(`${ResponsiveModName} v${ResponsiveVersion} ready.`);
}
