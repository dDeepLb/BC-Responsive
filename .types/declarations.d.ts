declare interface Window {
  ResponsiveLoaded?: boolean;
}

declare const PUBLIC_URL: string;
declare const MOD_VERSION: string;

declare module '*.css' {
  const value: string;
  export = value;
}

declare module '*.html' {
  const value: string;
  export = value;
}
