//messageTimer
export const MT = {
	CHANGELOG: 30000,
	INFO: 15000,
	COMMANDS: 20000,
	HELP: 40000,
};

const cmdKeyword = "bcr";
export const CMD_BCR = cmdKeyword;
export const CMD_TOGGLE = `${cmdKeyword} toggle`;
export const CMD_CHANGELOG = `${cmdKeyword} changelog`;
export const CMD_VERSION = `${cmdKeyword} version`;

export const DebugMode = true;
