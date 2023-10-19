//messageTimer
export const MT = {
	CHANGELOG: 30000,
	INFO: 15000,
	COMMANDS: 20000,
	HELP: 40000,
};

const cmdKeyword = "bcr";
export const CMDS = {
	BCR: cmdKeyword,
	TOGGLE: cmdKeyword + " toggle",
	CHANGELOG: cmdKeyword + " changelog",
	VERSION: cmdKeyword + " version",
}

export const DebugMode = true;
