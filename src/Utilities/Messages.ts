import changelog from 'public/html/Changelog.html';
import commands from 'public/html/Commands.html';
import currentVersion from 'public/html/CurrentVersion.html';
import newVersion from 'public/html/NewVersion.html';
import toggleDisabled from 'public/html/ToggleDisabled.html';
import toggleEnabled from 'public/html/ToggleEnabled.html';
import { CMD_BCR, CMD_CHANGELOG, CMD_DEBUG_DATA, CMD_TOGGLE, CMD_VERSION } from './Definition';

function replaceFillers(message: string) {
  return message
    .replace('$BCR', CMD_BCR)
    .replace('$TOGGLE', CMD_TOGGLE)
    .replace('$CHANGELOG', CMD_CHANGELOG)
    .replace('$VERSION', CMD_VERSION)
    .replace('$DEBUG_DATA', CMD_DEBUG_DATA)
    .replace('$ModVersion', MOD_VERSION);
}

export const BCR_CHANGELOG = replaceFillers(changelog);

export const BCR_CMDS = replaceFillers(commands);

export const BCR_VERSION_MSG = replaceFillers(currentVersion);

export const BCR_NEW_VERSION = replaceFillers(newVersion);

export const BCR_TOGGLE_ENABLED = replaceFillers(toggleEnabled);

export const BCR_TOGGLE_DISABLED = replaceFillers(toggleDisabled);
