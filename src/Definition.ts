import bcMod from 'bondage-club-mod-sdk'

function buildVersion(v1: number, v2: number, v3: number) {
    return `${v1}.${v2}.${v3}`;
}

export enum MoanType {
    Orgasm,
    Pain,
    Tickle,
    Boop
}

//messageTimer
export const MT = {
    CHANGELOG : 30000,
    INFO : 15000,
    COMMANDS : 20000,
    HELP : 40000,
}

export const HOOK_PRIORITY = ({
	OBSERVE: 0,
	ADD_BEHAVIOR: 1,
	MODIFY_BEHAVIOR: 5,
	OVERRIDE_BEHAVIOR: 10,
	TOP: 100,
})

export const BCRVersion = buildVersion(0, 4, 5);
export const ModName = 'BC Responsive';
export const ModFullName = 'Bondage Club Responsive'; //¯\_(⌣̯̀ ⌣́)_/¯
export const Repository = 'https://github.com/dDeepLb/BC-Responsive';

export const mod = bcMod.registerMod({
    name: ModName,
    fullName: ModFullName,
    version: BCRVersion,
    repository: Repository 
});

export const DebugMode = false;
