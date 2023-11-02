interface Window {
  ResponsiveLoaded?: boolean;
  RibbonMenuMods?: string[];
}

declare module "*.module.css" {
  const value: string;
  export = value;
}
