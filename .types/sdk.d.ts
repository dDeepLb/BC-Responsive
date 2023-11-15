type PatchHook = (args: any[], next: (args: any[]) => any) => any;

type PatchedFunctionData = {
  name: string;
  hooks: {
    hook: PatchHook;
    priority: number;
    module: ModuleCategory | null;
    removeCallback: () => void;
  }[];
};
