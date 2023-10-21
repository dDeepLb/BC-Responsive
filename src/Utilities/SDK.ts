import bcMod from "bondage-club-mod-sdk";
import { GetCharacter } from "./Other";
import { ConErr } from "./Console";

export const ModName = `BC Responsive`;
export const FullModName = `Bondage Club Responsive`; //¯\_(⌣̯̀ ⌣́)_/¯
export const ModVersion = `0.4.9`;
export const ModRepository = `https://github.com/dDeepLb/BC-Responsive`;

export const SDK = bcMod.registerMod(
    {
        name:
            ModName,
        fullName: FullModName,
        version: ModVersion,
        repository: ModRepository,
    },
    {
        allowReplace: false,
    }
);

export enum HookPriority {
    Observe = 0,
    AddBehavior = 1,
    ModifyBehavior = 5,
    OverrideBehavior = 10,
    Top = 100
}

export enum ModuleCategory {
    Core = -1,
    Global = 0,
    Responses = 1,
    Profiles = 2
}

const patchedFunctions: Map<string, PatchedFunctionData> = new Map();

function InitPatchableFunction(target: string): PatchedFunctionData {
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
        ConErr(`Duplicate hook for "${target}"`, hook);
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