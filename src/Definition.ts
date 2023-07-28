function buildVersion(v1: number, v2: number, v3: number) {
    return `${v1}.${v2}.${v3}`;
}

export enum MoanType {
    Orgasm,
    Pain,
    Tickle
}

export const ModVersion = buildVersion(0, 4, 3);
export const ModName = 'BC Responsive'
export const Repository = 'https://github.com/dDeepLb/Responsive'

export const DebugMode = false;