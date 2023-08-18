import { DataManager } from "./Data";
import { ModName, BCRVersion } from "./Definition";
import { isNewVersion, setIsItNewVersionToTrue } from "./Version";

export function ShuffleStr( src: string[] ) {
    let temp: string[] = JSON.parse(JSON.stringify( src ));
    let ret: string[] = []
    while ( temp.length > 0 ) {
        let d = Math.floor( Math.random() * temp.length );
        ret.push( temp[d] );
        temp.splice( d, 1 );
    }
    return ret;
}

export function onLogin() {
    LoadAndMessage();
        DataManager.instance.CheckNewThingies();
        let LoadedVersion = DataManager.instance.LoadVersion();
        if ( isNewVersion( LoadedVersion as unknown as string, BCRVersion ) ) {
            setIsItNewVersionToTrue();
            DataManager.instance.SaveVersion();
        }
        if ( Player ) {
            Player.BCRVErsion = LoadedVersion as string;
        }
}

function LoadAndMessage() {
    DataManager.instance.ServerTakeData();
    console.log(`${ModName} v${BCRVersion} ready.`);
}