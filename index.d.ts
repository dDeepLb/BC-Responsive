interface ResponsiveSetting {
    low: string[];
    light: string[];
    medium: string[];
    hot: string[];
    orgasm: string[];
    pain: string[];
    tickle: string[];
}


interface ResponsiveSolidSetting extends ResponsiveSetting {
    settings: { enable: boolean };
}

type ResponsivePartialSetting = Partial<ResponsiveSolidSetting>;

type ModSetting = { 
    BCResponsive?: string,
    BCRProfile1?: string,
    BCRProfile2?: string,
    BCRProfile3?: string,
 };

interface Window {
    BCResponsive_Loaded?: boolean;
}