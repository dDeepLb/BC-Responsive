interface PlayerCharacter extends Character {
  Responsive: import('../src/Models/Settings').SettingsModel;
}

interface OtherCharacter extends Character {
  Responsive: import('../src/Models/Settings').SettingsModel;
}

interface PlayerOnlineSettings {
  Responsive: import('../src/Models/Settings').SettingsModel;
}

interface ExtensionSettings {
  Responsive: string;
}

type $AssetGroupItemName = AssetGroupItemName | 'ItemPenis' | 'ItemGlans';
