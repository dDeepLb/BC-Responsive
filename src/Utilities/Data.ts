export class DataManager {
  private static _instance: DataManager | undefined;

  static init() {
    if (this._instance === undefined) this._instance = new DataManager();
  }

  static get instance() {
    this.init();
    return DataManager._instance as DataManager;
  }

  modData: ResponsivePartialSetting = {};
  mergeData: ResponsiveSolidSetting | undefined;

  get data() {
    return this.modData as ResponsiveSolidSetting;
  }

  set data(d: ResponsiveSolidSetting) {
    this.modData = d;
  }

  static DefaultValue: ResponsiveSolidSetting = {
    settings: {
      //"Enable Responsive?"
      enable: true,
    },
    //Settings
    modSettings: {
      doShowNewVersion: true,
      isLeaveMessageEnabled: true,
      isSharkBiteEnabled: true,
      doInterceptMessage: true,
      doEnableCharTalk: true,
    },
    isNewInput: {
      low: false,
      light: false,
      medium: false,
      hot: false,
      orgasm: false,
      pain: false,
      tickle: false,
      boop: true,
    },
    isNewSetting: {
      isLeaveMessageEnabled: true,
      isSharkBiteEnabled: true,
      doShowNewVersion: true,
      doInterceptMessage: true,
      doEnableCharTalk: true,
    },
    low: ["", "", "mh", "♥oh♥", "ah", "...♥"],
    light: ["nyah♥", "Aah!", "mh", "oh!♥", "mh♥"],
    medium: ["mm", "aaaah", "nyAh♥"],
    hot: ["n... Nyah♥", "Oooh", "mmmmmh!", "NYyaaA♥"],
    orgasm: ["Nya...Ny...NyaaAAaah!", "Mmmmh... MMmh... Hhhmmmm...", "Oooooh... Mmmmh... OooOOOOh!", "Mmmhnn... Nyhmm... Nyah!"],
    pain: ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"],
    tickle: ["Hahaha!", "Mmmmhahaha!", "Muhahah...", "Ha!Ha!"],
    boop: ["Eek!", "Beep!", "Aww"],
  };

  private static ValidateStringList(object: any, key: string) {
    if (object === undefined || !Array.isArray(object[key])) return [];
    return (object[key] as any[]).filter((_) => typeof _ === "string");
  }

  private static ValidatorItem(key: keyof ResponsiveSolidSetting): [keyof ResponsiveSolidSetting, (d: ResponsivePartialSetting) => any] {
    return [key, (d: ResponsivePartialSetting): string[] => DataManager.ValidateStringList(d, key)];
  }

  private static Validator = new Map<keyof ResponsiveSolidSetting, (d: ResponsivePartialSetting) => any>([
    [
      "settings",
      (d: ResponsivePartialSetting): ResponsiveSolidSetting["settings"] => {
        if (d.settings?.enable === undefined || typeof d.settings.enable !== "boolean") return { enable: true };
        return d.settings;
      },
    ],
    [
      "modSettings",
      (d: ResponsivePartialSetting): ResponsiveSolidSetting["modSettings"] => {
        if (d.modSettings === undefined || typeof d.modSettings !== "object") {
          return this.DefaultValue.modSettings;
        }
        return {
          ...this.DefaultValue.modSettings,
          ...d.modSettings,
        };
      },
    ],
    [
      "isNewInput",
      (d: ResponsivePartialSetting): ResponsiveSolidSetting["isNewInput"] => {
        if (d.isNewInput === undefined || typeof d.isNewInput !== "object") {
          return this.DefaultValue.isNewInput;
        }
        return {
          ...this.DefaultValue.isNewInput,
          ...d.isNewInput,
        };
      },
    ],
    [
      "isNewSetting",
      (d: ResponsivePartialSetting): ResponsiveSolidSetting["isNewSetting"] => {
        if (d.isNewSetting === undefined || typeof d.isNewSetting !== "object") {
          return this.DefaultValue.isNewSetting;
        }
        return {
          ...this.DefaultValue.isNewSetting,
          ...d.isNewSetting,
        };
      },
    ],
    DataManager.ValidatorItem("low"),
    DataManager.ValidatorItem("light"),
    DataManager.ValidatorItem("medium"),
    DataManager.ValidatorItem("hot"),
    DataManager.ValidatorItem("pain"),
    DataManager.ValidatorItem("orgasm"),
    DataManager.ValidatorItem("tickle"),
    DataManager.ValidatorItem("boop"),
  ]);

  EncodeDataStr() {
    let data: { [k: string]: any } = {};
    for (const k in this.modData) {
      data[k] = this.modData[k as keyof ResponsiveSolidSetting];
    }
    return LZString.compressToBase64(JSON.stringify(data));
  }

  DecodeDataStr(str: string | undefined) {
    if (str === undefined) {
      Object.assign(this.modData, DataManager.DefaultValue);
      return;
    }

    let d = LZString.decompressFromBase64(str);
    let data = {};

    try {
      let decoded = JSON.parse(d);
      data = decoded;
    } catch {}

    DataManager.Validator.forEach((v, k) => {
      this.modData[k as keyof ResponsiveSolidSetting] = v(data);
    });
  }

  ServerStoreData() {
    if (Player && Player.OnlineSettings) {
      if (Player.OnlineSettings.BCResponsive) {
        Player.OnlineSettings.BCResponsive.data = this.EncodeDataStr();
      }

      if (ServerAccountUpdate) {
        ServerAccountUpdate.QueueData({
          BCResponsive: Player.OnlineSettings.BCResponsive,
        });
      }
    }
  }

  ServerTakeData() {
    if (Player && Player.OnlineSettings) {
      let rawData = (Player.OnlineSettings as ModSetting).BCResponsive?.data;
      rawData = this.CheckOldData(rawData);
      this.DefineResponsiveObj();
      this.DecodeDataStr(rawData);
    }

    if (this.mergeData !== undefined && this.modData.settings !== undefined) {
      this.modData.settings.enable = this.mergeData.settings.enable;
      this.modData.isNewInput = DataManager.DefaultValue.isNewInput;
      this.ServerStoreData();
    }
  }

  DefineResponsiveObj() {
    if (Player && Player.OnlineSettings && (!Player.OnlineSettings.BCResponsive || !Player.OnlineSettings.BCResponsive.data))
      Player.OnlineSettings.BCResponsive = {
        data: "",
        Profiles: {
          "1": {
            data: "",
            name: "",
          },
          2: {
            data: "",
            name: "",
          },
          3: {
            data: "",
            name: "",
          },
        },
        SavedVersion: "",
      };
  }

  CheckOldData(data: string | undefined): string {
    if (Player && Player.OnlineSettings) {
      //Delete old profile instances if they been there
      delete Player.OnlineSettings.BCRProfile1;
      delete Player.OnlineSettings.BCRProfile2;
      delete Player.OnlineSettings.BCRProfile3;
      delete Player.OnlineSettings.BCRProfiles;
      ServerAccountUpdate.QueueData({ OnlineSettings: Player.OnlineSettings });
      if (data === undefined) {
        let oldData = Player.OnlineSettings as any as {
          BCMoanerReloaded?: string;
        };
        let rawData = oldData.BCMoanerReloaded;
        if (rawData !== undefined) {
          delete oldData.BCMoanerReloaded;
          return rawData;
        }
      }

      if (data === undefined) {
        let oldData = Player.OnlineSettings as any as {
          BCResponsive?: string;
        };
        let rawData = oldData.BCResponsive;
        if (typeof rawData === "string") {
          delete oldData.BCResponsive;
          return rawData;
        }
      }
    }
    return data as string;
  }

  //settings, inputs and other shit meant
  CheckNewThingies() {
    const defaultData = DataManager.DefaultValue;
    if (this.modData.modSettings === undefined) this.modData.modSettings = defaultData.modSettings;
    if (this.modData.isNewInput === undefined) this.modData.isNewInput = defaultData.isNewInput;
    if (this.modData.isNewSetting === undefined) this.modData.isNewSetting = defaultData.isNewSetting;

    const rkeys: (keyof ResponsiveSetting)[] = ["low", "light", "medium", "hot", "orgasm", "pain", "tickle", "boop"];

    if (this.modData.isNewInput !== undefined) {
      for (const t of rkeys) {
        if ((this.modData[t] === undefined || this.modData[t]?.length === 0) && this.modData.isNewInput[t] === true) {
          this.modData[t] = defaultData[t];
          this.modData.isNewInput[t] = false;
        }
        this.modData.isNewInput[t] = false;
      }
    }

    const skeys: (keyof ResponsiveSolidSetting["modSettings"])[] = ["isLeaveMessageEnabled", "isSharkBiteEnabled", "doShowNewVersion", "doInterceptMessage"];

    for (const t of skeys) {
      if (this.modData.modSettings[t] === undefined || (this.modData.modSettings[t] === false && this.modData.isNewSetting[t] === true)) {
        this.modData.modSettings[t] = defaultData.modSettings[t];
        this.modData.isNewSetting[t] = false;
      }
      this.data.isNewSetting[t] = false;
    }
    this.ServerStoreData();
    return true;
  }
}
