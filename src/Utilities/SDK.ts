import bcMod from "bondage-club-mod-sdk";
import { buildVersion } from "../Definition";
import { GetCharacter as GetCharacter } from "./Other";

export const ResponsiveModName = `BC Responsive`;
export const FullResponsiveModName = `Bondage Club Responsive`; //¯\_(⌣̯̀ ⌣́)_/¯
export const ResponsiveVersion = buildVersion(0, 4, 9);
export const ResponsiveRepository = `https://github.com/dDeepLb/BC-Responsive`;

export const SDK = bcMod.registerMod(
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

export enum ModuleCategory {
    Core = -1,
    Global = 0,
    Responses = 1,
    Profiles = 2
}

type PatchHook = (args: any[], next: (args: any[]) => any) => any;
interface IPatchedFunctionData {
    name: string;
    hooks: {
        hook: PatchHook;
        priority: number;
        module: ModuleCategory | null;
        removeCallback: () => void;
    }[];
}

const patchedFunctions: Map<string, IPatchedFunctionData> = new Map();

function InitPatchableFunction(target: string): IPatchedFunctionData {
    let result = patchedFunctions.get(target);
    if (!result) {
        result = {
            name: target,
            hooks: []
        };
        patchedFunctions.set(target, result);
    }
    return result;
}

export function HookFunction(target: string, priority: number, hook: PatchHook, module: ModuleCategory | null = null): () => void {
    const data = InitPatchableFunction(target);

    if (data.hooks.some(h => h.hook === hook)) {
        console.error(`LSCG: Duplicate hook for "${target}"`, hook);
        return () => null;
    }

    const removeCallback = SDK.hookFunction(target, priority, hook);

    data.hooks.push({
        hook,
        priority,
        module,
        removeCallback
    });
    data.hooks.sort((a, b) => b.priority - a.priority);
    return removeCallback;
}

export function RemoveHookByModule(target: string, module: ModuleCategory): boolean {
    const data = InitPatchableFunction(target);

    for (let i = data.hooks.length - 1; i >= 0; i--) {
        if (data.hooks[i].module === module) {
            data.hooks[i].removeCallback();
            data.hooks.splice(i, 1);
        }
    }

    return true;
}

export function RemoveAllHooksByModule(module: ModuleCategory): boolean {
    for (const data of patchedFunctions.values()) {
        for (let i = data.hooks.length - 1; i >= 0; i--) {
            if (data.hooks[i].module === module) {
                data.hooks[i].removeCallback();
                data.hooks.splice(i, 1);
            }
        }
    }

    return true;
}

export function OnActivity(priority: any, module: ModuleCategory, callback: (data: any, sender: Character | undefined, msg: string, metadata: ChatMessageDictionary) => void) {
    HookFunction("ChatRoomMessage", priority, (args, next) => {
        let data = args[0];
        let sender = GetCharacter(data.Sender);
        if (data.Type == "Activity")
            callback(data, sender, data.Content, data.Dictionary);
        next(args);
    }, module);
}