import bcMod from "bondage-club-mod-sdk";

function buildVersion(v1: number, v2: number, v3: number) {
	return `${v1}.${v2}.${v3}`;
}

export enum MoanType {
	Orgasm,
	Pain,
	Tickle,
	Boop,
}

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

//Responsive
export const ResponsiveModName = `BC Responsive`;
export const FullResponsiveModName = `Bondage Club Responsive`; //¯\_(⌣̯̀ ⌣́)_/¯
export const ResponsiveVersion = buildVersion(0, 4, 8);
export const ResponsiveRepository = `https://github.com/dDeepLb/BC-Responsive`;

export const ResponsiveMod = bcMod.registerMod(
	{
		name: ResponsiveModName,
		fullName: FullResponsiveModName,
		version: ResponsiveVersion,
		repository: ResponsiveRepository,
	},
	{
		allowReplace: false,
	}
);

export const HOOK_PRIORITY = {
	OBSERVE: 0,
	ADD_BEHAVIOR: 1,
	MODIFY_BEHAVIOR: 5,
	OVERRIDE_BEHAVIOR: 10,
	TOP: 100,
};

export const DebugMode = false;
