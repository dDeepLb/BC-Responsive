import { CMD_BCR, CMD_CHANGELOG, CMD_DEBUG_DATA, CMD_FIX_DATA, CMD_TOGGLE, CMD_VERSION } from "./Definition";
import { ModVersion } from "./Definition";

//TODO - Translation

export const BCR_CMDS = /*html*/ `
  <div class="ResponsiveMessageContent">
    <b style='color:#440171; text-shadow: 0.05em 0.05em #690092;'>BC Responsive</b>: Available commands (Clickable)
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_TOGGLE}")'>Toggle Responsive</a>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_CHANGELOG}")'>Show Changelog</a>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_VERSION}")'>Show Version</a><br>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_FIX_DATA}")'>Fix Data</a>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_DEBUG_DATA}")'>Debug Data</a><br>
    <br><a href='https://github.com/dDeepLb/BC-Responsive/wiki' target='_blank'><b>Open Wiki</b></a>
  </div>
  `;

export const BCR_NEW_VERSION = /*html*/ `
  <div class='ResponsiveMessageContent'>
    <b style='color:#690092; text-shadow: 0.05em 0.05em #440171;'>BC Responsive</b><b>: New Version!</b> [${ModVersion}]<br>
    <br><b style='color:#CC3232; text-shadow: 0.05em 0.05em #920009;'>Please, reload your page~</b><br>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_CHANGELOG}")'><b>Changelog (Click)</b></a>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_BCR}")'><b>Show Help (Click)</b></a>
  </div>
 `;

export const BCR_VERSION_MSG = /*html*/ `
  <p class='ResponsiveMessageContent'>Current version of <b style='color:#690092; text-shadow: 0.05em 0.05em #440171;'>BC Responsive: v${ModVersion}</b></p>
  `;

export const BCR_TOGGLE_ENABLED = /*html*/ `
    <p class='ResponsiveMessageContent'><b>BC Responsive</b> has been enabled</p>
    `;

export const BCR_TOGGLE_DISABLED = /*html*/ `
    <p class='ResponsiveMessageContent'><b>BC Responsive</b> has been disabled</p>
    `;

export const BCR_CHANGELOG = /*html*/ `
  <div class="ResponsiveMessageContent">
    <b class="ResponsiveVersion">0.6.1</b>
    <br>• Added command <em>fix-data</em> and <em>debug-data</em>.
    <br>• Fixed bug with pasting empty entry.<br>

    <br><b class="ResponsiveVersion">0.6.0</b>
    <br>• Changed mod storage to ExtensionSetings.
    <br>• Added two settings:
    <br>"Do add moans on high arousal" and
    <br>"Prevent messages if BCX rule blocks"
    <br>• Added group deselection (just click on selected group again).
    <br>• Fixed bug with un/merging responses being not dependant on "selfTrigger".
    <br>• Fixed Leave Message sending .. when someone leashes someone.
    <br>• Changed default responses to more human-like.<br>

    <br><b class="ResponsiveVersion">0.5.2</b>
    <br>• Added check for BCX rules that have impact on speech. If some rules enabled and enforced, response will not be triggered.
    <br>• Fixed crash with CharTalk.<br>
  </div>

  <br><a href='https://github.com/dDeepLb/BC-Responsive/wiki/Full-Changelog' target='_blank'><b>Full Changelog (Click)</b></a>
  `;

export function sendLocalSmart(id: string, message: string, timeoutInSeconds?: number) {
  const div = document.createElement("div");
  div.id = id;
  div.setAttribute("class", "ChatMessage ResponsiveMessage");
  div.setAttribute("data-time", ChatRoomCurrentTime());
  div.setAttribute("data-sender", Player?.MemberNumber + "");

  div.innerHTML =
    message.replaceAll("\n\t", "") +
    /*html*/ `<br><a class="ResponsiveText" onClick='document.getElementById("${id}").remove();'><b>Close (Click)</b></a>`;

  ChatRoomAppendChat(div);
  if (!timeoutInSeconds) return;
  setTimeout(() => div?.remove(), timeoutInSeconds * 1000);
}
