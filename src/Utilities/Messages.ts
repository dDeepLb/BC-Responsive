import { CMDS, ResponsiveVersion } from "../Definition";

export const BCR_CMDS = 
    `<p id='BCR_Cmds' style='background-color:#202020; color: #eee; border: 2px solid #440171 !important; padding-left: 5px'>` +
    `<b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive</b>: Available commands (Clickable):
    <br><a onClick='window.CommandSet("` + CMDS.TOGGLE + `")'><b style='color:#eee'>Toggle Responsive</b></a>
    <br><a onClick='window.CommandSet("` + CMDS.CHANGELOG + `")'><b style='color:#eee'>Show Changelog</b></a>
    <br><a onClick='window.CommandSet("` + CMDS.VERSION + `")'><b style='color:#eee'>Show Version</b></a><br>
    <br><a href='https://github.com/dDeepLb/BC-Responsive/wiki' target='_blank'><b style='color:#eee'>Open Wiki</b></a>
    <br><a onClick='window.ElementRemove("BCR_Cmds")'><b style='color:#eee'>Close</b></a>
    </p>`;

export const BCR_NEW_VERSION =
    `<div id='BCR_NewVersion' style='background-color:#202020; border: 2px solid #440171 !important; padding-left: 5px'>` +
    `<b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive</b><b style='color:#eee'>: New Version!</b> [${ResponsiveVersion}]<br>
    <br><b style='color:#CC3232; text-shadow: 0.05em 0.05em #eee;'>Please, reload your page~</b><br>
    <br><a onClick='window.CommandSet("` + CMDS.CHANGELOG + `")'><b style='color:#eee'>Changelog (Click)</b></a>
    <br><a onClick='window.CommandSet("` + CMDS.BCR + `")'><b style='color:#eee'>Show Help (Click)</b></a>
    <br><a onClick='window.ElementRemove("BCR_NewVersion")'><b style='color:#eee'>Close (Click)</b></a>
    </div>`;

export const BCR_CHANGELOG =
    `<p id='BCR_Changelog' style='background-color:#202020; border: 2px solid #440171 !important; padding-left: 5px'>` +
    `<b>0.4.8</b>
    <br>• Fixed Character Talk not being disableable
    <br>• Moved settings a bit
    <br><b>0.4.7</b>
    <br>• Fixed orgasm trigger response when not allowed (Ruined)
    <br>• Fixed translation to not show, if it'sn't translated
    <br>• Fixed when loading not saved profile, show that it has been loaded
    <br>• Merged Character Talk into Responsive
    <br>• Fixed FBC whisper trigger Char Talk
    <br>• Fixed Orgasm trigger Char Talk<br>
    <br><b>0.4.6</b>
    <br>• Added new version notification (You should see it right now)
    <br>• Added commands (type "/bcr")
    <br>• Added Settings Menu
    <br>• Added text notifying about profile state
    <br>• Added profile delete buttons
    <br>• Added profile names on saving<br>
    <br><a href='https://github.com/dDeepLb/BC-Responsive/wiki/Full-Changelog' target='_blank'><b style='color:#eee'>Full Changelog (Click)</b></a>
    <br><a onClick='window.ElementRemove("BCR_Changelog")'><b style='color:#eee'>Close (Click)</b></a>
    </p>`;

export const BCR_VERSION_MSG = 
    `<div style='background-color:#202020; border: 2px solid #440171 !important; padding-left: 5px'>` +
    `<b style='color:#440171; text-shadow: 0.05em 0.05em #eee;'>BC Responsive: v${ResponsiveVersion}</b>
    </div>`;