declare type PatchedFunctionData = {
  name: string;
  hooks: {
    hook: import('./bcmodsdk').PatchHook;
    priority: number;
    module: ModuleCategory | null;
    removeCallback: () => void;
  }[];
};
