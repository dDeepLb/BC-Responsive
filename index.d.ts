interface ResponsiveSetting {
    low: string[ ];
    light: string[ ];
    medium: string[ ];
    hot: string[ ];
    orgasm: string[ ];
    pain: string[ ];
    tickle: string[ ];
    boop: string[ ];
}

interface ResponsiveSolidSetting extends ResponsiveSetting {
	settings: { enable: boolean };
	modSettings: {
		doShowNewVersion: boolean;
		isLeaveMessageEnabled: boolean;
		isSharkBiteEnabled: boolean;
        doInterceptMessage: boolean;
        doEnableCharTalk: boolean;
	};
	isNewSetting: {
		isLeaveMessageEnabled: boolean;
		isSharkBiteEnabled: boolean;
		doShowNewVersion: boolean;
        doInterceptMessage: boolean;
        doEnableCharTalk: boolean;
	};
	isNewInput: {
		low: boolean;
		light: boolean;
		medium: boolean;
		hot: boolean;
		orgasm: boolean;
		pain: boolean;
		tickle: boolean;
		boop: boolean;
	};
}

type ResponsivePartialSetting = Partial<ResponsiveSolidSetting>;

type ModSetting = {
	BCResponsive?: {
		data: string;
		Profiles: {
			[key: number]: { data: string; name: string };
			"1": {
				data: string;
				name: string;
			};
			"2": {
				data: string;
				name: string;
			};
			"3": {
				data: string;
				name: string;
			};
		};
		SavedVersion: string;
	};
};

interface Window {
    ResponsiveLoaded?: boolean;
}