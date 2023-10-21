type _ChatMessageDictionaryEntry = {
    [k: string]: any;
    Tag?: CommonChatTags | string;
    Text?: string;
    MemberNumber?: number;
}

type _ChatMessageDictionary = _ChatMessageDictionaryEntry[];

type ActivityInfo = {
    SourceCharacter: { MemberNumber: number };
    TargetCharacter: { MemberNumber: number };
    ActivityGroup: string;
    ActivityName: string;
}

//SDK
type PatchHook = (args: any[], next: (args: any[]) => any) => any;
type PatchedFunctionData = {
    name: string;
    hooks: {
        hook: PatchHook;
        priority: number;
        module: ModuleCategory | null;
        removeCallback: () => void;
    }[];
}