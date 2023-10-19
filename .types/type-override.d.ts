interface PlayerCharacter extends Character {
  BCResponsive: import("../src/Settings/Models/Settings").SettingsModel;
}

interface OtherCharacter extends Character {
  BCResponsive: import("../src/Settings/Models/Settings").SettingsModel;
}

interface PlayerOnlineSettings {
  BCResponsive: import("../src/Settings/Models/Settings").SettingsModel | string;
}
