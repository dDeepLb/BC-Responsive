interface PlayerCharacter extends Character {
  BCResponsive: import("../src/Models/Settings").SettingsModel;
}

interface OtherCharacter extends Character {
  BCResponsive: import("../src/Models/Settings").SettingsModel;
}

interface PlayerOnlineSettings {
  BCResponsive: import("../src/Models/Settings").SettingsModel | string;
}
