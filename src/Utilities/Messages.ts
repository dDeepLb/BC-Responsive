import { CMD_BCR, CMD_CHANGELOG, CMD_TOGGLE, CMD_VERSION } from "../Definition";
import { ModVersion } from "./SDK";

//TODO - Translation

export const STYLE = /*style*/ `
    style='
    background-color: #202020;
    border: 2px solid #440171; 
    padding-left: 5px;
    '
    `;

export const BCR_CMDS = /*html*/ `
    <p id='BCR_Cmds' ${STYLE}><b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive</b>: Available commands (Clickable):
    <br><a onClick='window.CommandSet("${CMD_TOGGLE}")'><b style='color:#eee'>Toggle Responsive</b></a>
    <br><a onClick='window.CommandSet("${CMD_CHANGELOG}")'><b style='color:#eee'>Show Changelog</b></a>
    <br><a onClick='window.CommandSet("${CMD_VERSION}")'><b style='color:#eee'>Show Version</b></a><br>
    <br><a href='https://github.com/dDeepLb/BC-Responsive/wiki' target='_blank'><b style='color:#eee'>Open Wiki</b></a>
    <br><a onClick='window.ElementRemove("BCR_Cmds")'><b style='color:#eee'>Close</b></a>
    </p>
    `;

export const BCR_NEW_VERSION = /*html*/ `
    <div id='BCR_NewVersion' ${STYLE}>
    <b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive</b><b style='color:#eee'>: New Version!</b> [${ModVersion}]<br>
    <br><b style='color:#CC3232; text-shadow: 0.05em 0.05em #eee;'>Please, reload your page~</b><br>
    <br><a onClick='window.CommandSet("${CMD_CHANGELOG}")'><b style='color:#eee'>Changelog (Click)</b></a>
    <br><a onClick='window.CommandSet("${CMD_BCR}")'><b style='color:#eee'>Show Help (Click)</b></a>
    <br><a onClick='window.ElementRemove("BCR_NewVersion")'><b style='color:#eee'>Close (Click)</b></a>
    </div>
    `;

export const BCR_CHANGELOG = /*html*/ `
    <p id='BCR_Changelog' ${STYLE}><b>0.4.9</b>
    <br>• Fixed Hair Bite trigger Pain Message
    <br>• Fixed responses to respond when it's are empty
    <br>• Fixed responses to behave strangely with single reset button
    <br>• Added responses templates<br>
    <br><b>0.4.8</b>
    <br>• Fixed Character Talk not being disableable
    <br>• Moved settings a bit<br>
    <br><b>0.4.7</b>
    <br>• Fixed orgasm trigger response when not allowed (Ruined)
    <br>• Fixed translation to not show, if it'sn't translated
    <br>• Fixed when loading not saved profile, show that it has been loaded
    <br>• Merged Character Talk into Responsive
    <br>• Fixed FBC whisper trigger Char Talk
    <br>• Fixed Orgasm trigger Char Talk<br>
    <br><a href='https://github.com/dDeepLb/BC-Responsive/wiki/Full-Changelog' target='_blank'><b style='color:#eee'>Full Changelog (Click)</b></a>
    <br><a onClick='window.ElementRemove("BCR_Changelog")'><b style='color:#eee'>Close (Click)</b></a>
    </p>
    `;

export const BCR_VERSION_MSG = /*html*/ `
    <div ${STYLE}><b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive: v${ModVersion}</b>
    </div>
    `;

export const BCR_TOGGLE_ENABLED = /*html*/ `
    <p ${STYLE}><b>BC Responsive</b> has been enabled</p>
    `;

export const BCR_TOGGLE_DISABLED = /*html*/ `
    <p ${STYLE}><b>BC Responsive</b> has been disabled</p>
    `;

export function sendLocalSmart(message: string, timeoutInSeconds?: number) {
  ChatRoomSendLocal(message.replaceAll("\n", ""), timeoutInSeconds ? timeoutInSeconds * 1000 : undefined);
}
