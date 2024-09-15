declare global {
  var bcModSdk: import('./bcmodsdk').ModSDKGlobalAPI;
}

declare interface Window {
  ResponsiveLoaded: boolean;
  RibbonMenuMods: string[];
}

declare const PUBLIC_URL: string;
declare const MOD_VERSION: string;
declare const LAST_COMMIT_HASH: string;
declare const VERSION_HASH: string;
declare const IS_DEVEL: boolean;

declare module '*.css' {
  const value: string;
  export = value;
}

declare module '*.html' {
  const value: string;
  export = value;
}
