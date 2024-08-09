declare interface Window {
  ResponsiveLoaded?: boolean;
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
