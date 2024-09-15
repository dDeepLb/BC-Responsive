import { CMD_BCR, CMD_CHANGELOG, CMD_DEBUG_DATA, CMD_FIX_DATA, CMD_TOGGLE, CMD_VERSION, MOD_VERSION_CAPTION } from './Definition';

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
    <b style='color:#690092; text-shadow: 0.05em 0.05em #440171;'>BC Responsive</b><b>: New Version!</b> [${MOD_VERSION_CAPTION}]<br>
    <br><b style='color:#CC3232; text-shadow: 0.05em 0.05em #920009;'>Please, reload your page~</b><br>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_CHANGELOG}")'><b>Changelog (Click)</b></a>
    <br><a class="ResponsiveText" onClick='window.CommandSet("${CMD_BCR}")'><b>Show Help (Click)</b></a>
  </div>
 `;

export const BCR_VERSION_MSG = /*html*/ `
  <p class='ResponsiveMessageContent'>Current version of <b style='color:#690092; text-shadow: 0.05em 0.05em #440171;'>BC Responsive: v${MOD_VERSION_CAPTION}</b></p>
  `;

export const BCR_TOGGLE_ENABLED = /*html*/ `
    <p class='ResponsiveMessageContent'><b>BC Responsive</b> has been enabled</p>
    `;

export const BCR_TOGGLE_DISABLED = /*html*/ `
    <p class='ResponsiveMessageContent'><b>BC Responsive</b> has been disabled</p>
    `;

export const BCR_CHANGELOG = /*html*/ `
  <div class="ResponsiveMessageContent">
    <b class="ResponsiveVersion">0.6.4</b>
    <br>• Fixed Character Talk wasn't working.<br>

    <b class="ResponsiveVersion">0.6.3</b>
    <br>• Fixed bug introduced in R104.
    <br>• Removed feature to add moans on high arousal.<br>
    
    <b class="ResponsiveVersion">0.6.2</b>
    <br>• Added Chinese Translation by XiaoSu (小酥).
    <br>• Added missing translation tags in Responses Menu.<br>
  </div>

  <br><a href='https://github.com/dDeepLb/BC-Responsive/wiki/Full-Changelog' target='_blank'><b>Full Changelog (Click)</b></a>
  `;

export function sendLocalSmart(id: string, message: string, timeoutInSeconds?: number) {
  const div = document.createElement('div');
  div.id = id;
  div.setAttribute('class', 'ChatMessage ResponsiveMessage');
  div.setAttribute('data-time', ChatRoomCurrentTime());
  div.setAttribute('data-sender', Player?.MemberNumber + '');

  div.innerHTML =
    message.replaceAll('\n\t', '') +
    /*html*/ `<br><a class="ResponsiveText" onClick='document.getElementById("${id}").remove();'><b>Close (Click)</b></a>`;

  ChatRoomAppendChat(div);
  if (!timeoutInSeconds) return;
  setTimeout(() => div?.remove(), timeoutInSeconds * 1000);
}
