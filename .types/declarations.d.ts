declare global {
  var bcModSdk: import('./bcmodsdk').ModSDKGlobalAPI;
}

declare interface Window {
  ResponsiveLoaded: boolean;
  RibbonMenuMods: string[];
}

declare const serverUrl: string;

declare module '*.css' {
  const value: string;
  export = value;
}

declare module '*.html' {
  const value: string;
  export = value;
}
