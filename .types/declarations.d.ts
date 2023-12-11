interface Window {
  ResponsiveLoaded?: boolean;
  RibbonMenuMods?: string[];
}

declare module "*.css" {
  const value: string;
  export = value;
}

declare module "*.html" {
  const value: string;
  export = value;
}
