import { DebugMode } from "../Definition";

const STYLES = {
    INFO: "color: #32CCCC",
    LOG: "color: #CCCC32",
    DEBUG: "color: #9E4BCF",
}

export function ConInfo(msg: any, ...args: any[]) {
    console.debug(`%cBCR: ${msg}`, STYLES.INFO, ...args);
}

export function ConLog(msg: any, ...args: any[]) {
    console.debug(`%cBCR: ${msg}`, STYLES.LOG, ...args);
}

export function ConDebug(msg: any, ...args: any[]) {
    if (DebugMode) {
        console.debug(`%cBCR: ${msg}`, STYLES.DEBUG, ...args);
    }
}