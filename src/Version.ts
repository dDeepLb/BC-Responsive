import { commandKey } from "./Commands";
import { DataManager } from "./Data";
import { BCRVersion, MT } from "./Definition";

//`\n` +
export const BCR_CHANGELOG =
    `<b>0.4.6</b><hr>\n` +
    `Added new version notification (You should see it right now)\n` +
    `Added commands (type "/` + commandKey + `")\n` +
    `Added Settings Menu\n` +
    `Added text notifying about profile state\n` +
    `Added profile delete buttons\n` +
    `Added profile names on saving\n` +
    `<b>0.4.5</b>\n` +
    `Fixed Shark Boop call Pain and Head Pat - Boop\n` +
    `Added single reset buttons to Responses Menu\n` +
    `<b>0.4.4</b>\n` +
    `Added boop reaction (in Responses)\n` +
    `Added reset button\n` +
    `Cleaned profiles code\n\n` +
    `\n<a href='https://github.com/dDeepLb/BC-Responsive/wiki/Full-Changelog' target='_blank'><b style='color:#eee'>Full Changelog (Click)</b></a>\n`;

export const BCR_VERSION_MSG = `<div style='background-color:#202020; border: 2px solid #440171 !important; padding-left: 5px'><b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive</b>: v${BCRVersion}</div>`;

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
            `<div style='background-color:#202020; border: 2px solid #440171 !important; padding-left: 5px'>` +
            `<b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive</b><b style='color:#eee'>: New Version!</b> [` + BCRVersion + `]\n\n` +
            `<b style='color:#CC3232; text-shadow: 0.05em 0.05em #eee;'>Please, reload your page~</b>\n\n`+
            `<a onClick='window.CommandSet(commandKey + " changelog")'><b style='color:#eee'>Changelog (Click)</b></a>\n` +
            `<a onClick='window.CommandSet(commandKey)'><b style='color:#eee'>Show Help (Click)</b></a>\n` +
            `</div>`,
            MT.CHANGELOG
        );
    }
}

export function setIsItNewVersionToTrue() {
    isItNewVersion = true;
}
