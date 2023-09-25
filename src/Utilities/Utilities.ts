import { DataManager } from "../Data";
import { MT, ResponsiveModName, ResponsiveVersion } from "../Definition";
import { BCR_NEW_VERSION } from "./Messages";

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
	if (isNewVersion(LoadedVersion as unknown as string, ResponsiveVersion)) {
		isItNewVersion = true;
		DataManager.instance.SaveVersion();
	}
	if (Player) {
		Player.BCRVersion = LoadedVersion as string;
	}
}

function LoadAndMessage() {
    DataManager.instance.ServerTakeData();
    console.log(`${ResponsiveModName} v${ResponsiveVersion} ready.`);
}

//Adopted from BCAR
export function isNewVersion(current: string | undefined, candidate: string) {
    if (current !== undefined) {
        const CURRENT_ = current.split("."),
            CANDIDATE_ = candidate.split(".");
        for (let i = 0; i < 3; i++) {
            if (CURRENT_[i] === CANDIDATE_[i]) {
                continue;
            }
            return CANDIDATE_[i] > CURRENT_[i];
        }
    }
    if (current === undefined || current === "" || !current) {
        return true;
    }
    return false;
}

let isItNewVersion = false;
export function sendNewVersion() {
    if (DataManager.instance.data.modSettings.doShowNewVersion && isItNewVersion) {
        ChatRoomSendLocal(
            `${BCR_NEW_VERSION}`.replaceAll('\n', ''),
            MT.CHANGELOG
        );
    }
}