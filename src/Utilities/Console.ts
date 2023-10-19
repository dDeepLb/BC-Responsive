import { DebugMode } from "../Definition";

const STYLES = {
    INFO: "color: #32CCCC",
    LOG: "color: #CCCC32",
    DEBUG: "color: #9E4BCF",
}
export function ConInfo(...args: any[]) {
    if (typeof args[0] === "string")
        console.info(`%cBCR: ${args[0]}`, STYLES.LOG, ...args.slice(1));
    else
        console.info(`%cBCR:`, STYLES.LOG, ...args);
}

export function ConLog(...args: any[]) {
    if (typeof args[0] === "string")
        console.log(`%cBCR: ${args[0]}`, STYLES.LOG, ...args.slice(1));
    else
        console.log(`%cBCR:`, STYLES.LOG, ...args);
}

export function ConWarn(...args: any[]) {
    if (typeof args[0] === "string")
        console.warn(`%cBCR: ${args[0]}`, STYLES.LOG, ...args.slice(1));
    else
        console.warn(`%cBCR: `, STYLES.LOG, ...args);
}

export function ConErr(...args: any[]) {
    if (typeof args[0] === "string")
        console.error(`%cBCR: ${args[0]}`, STYLES.LOG, ...args.slice(1));
    else
        console.error(`%cBCR:`, STYLES.LOG, ...args);
}

export function ConDebug(...args: any[]) {
    if (DebugMode) {
        if (typeof args[0] === "string")
            console.debug(`%cBCR: ${args[0]}`, STYLES.LOG, ...args.slice(1));
        else
            console.debug(`%cBCR:`, STYLES.LOG, ...args);
    }
}