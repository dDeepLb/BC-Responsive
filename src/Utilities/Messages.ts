import { CMD_BCR, CMD_CHANGELOG, CMD_TOGGLE, CMD_VERSION } from "../Definition";
import { ModVersion } from "./SDK";

//TODO - Translation

export const BCR_CMDS = /*html*/ `
  <div id="0.5.0" class="ResponviveMessageContent">
    <b style='color:#440171; text-shadow: 0.05em 0.05em #690092;'>BC Responsive</b>: Available commands (Clickable)
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_TOGGLE}")'>Toggle Responsive</a>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_CHANGELOG}")'>Show Changelog</a>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_VERSION}")'>Show Version</a><br>
    <br><a href='https://github.com/dDeepLb/BC-Responsive/wiki' target='_blank'><b>Open Wiki</b></a>
  </div>
  `;

export const BCR_NEW_VERSION = /*html*/ `
  <div class='ResponviveMessageContent'>
    <b style='color:#690092; text-shadow: 0.05em 0.05em #440171;'>BC Responsive</b><b>: New Version!</b> [${ModVersion}]<br>
    <br><b style='color:#CC3232; text-shadow: 0.05em 0.05em #920009;'>Please, reload your page~</b><br>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_CHANGELOG}")'><b>Changelog (Click)</b></a>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_BCR}")'><b>Show Help (Click)</b></a>
  </div>
 `;

export const BCR_VERSION_MSG = /*html*/ `
  <p class='ResponviveMessageContent'>Current version of <b style='color:#690092; text-shadow: 0.05em 0.05em #440171;'>BC Responsive: v${ModVersion}</b></p>
  `;

export const BCR_TOGGLE_ENABLED = /*html*/ `
    <p class='ResponviveMessageContent'><b>BC Responsive</b> has been enabled</p>
    `;

export const BCR_TOGGLE_DISABLED = /*html*/ `
    <p class='ResponviveMessageContent'><b>BC Responsive</b> has been disabled</p>
    `;

export const BCR_CHANGELOG = /*html*/ `
  <div id="0.5.0" class="ResponviveMessageContent">
    <b class="ResponsiveVersion">0.5.0</b>
    <br>• Complete rewrite of Responsive (Thanks to Little Sera)
    <br>• Now you can select certain activity on certain group with certain responses
    <br>• Add copy/paste buttons for responses screen
    <br>• Add master set - it will change every response in the entry
    <br>• Fixed CharTalk to cause huge server loads. Now it will animate mouths of all, even those who don't have Responsive.
    <br>• Improved reset screen - you can select what you want to reset and added a timer.
    <br>• Add support button where you can support my work<br>

    <br><b class="ResponsiveVersion">0.4.9</b>
    <br>• Fixed Hair Bite trigger Pain Message
    <br>• Fixed responses to respond when they are empty
    <br>• Fixed responses to behave strangely with a single reset button
    <br>• Added response templates<br>
    
    <br><b class="ResponsiveVersion">0.4.8</b>
    <br>• Fixed Character Talk not being disableable
    <br>• Moved settings a bit<br>
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
