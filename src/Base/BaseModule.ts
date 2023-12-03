import { BaseSettingsModel } from "../Models/Base";
import { SettingsModel } from "../Models/Settings";
import { PlayerStorage } from "../Utilities/Data";
import { ModName } from "../Utilities/Definition";
import { Subscreen } from "./SettingDefinitions";

export abstract class BaseModule {
  get settingsScreen(): Subscreen | null {
    return null;
  }

  /** Allows changing the subkey for that module settings storage */
  get settingsStorage(): string | null {
    return this.constructor.name;
  }

  get settings(): BaseSettingsModel {
    if (!this.settingsStorage) return {} as BaseSettingsModel;
    if (!PlayerStorage()) {
      Player[ModName] = <SettingsModel>{};
      this.registerDefaultSettings();
    } else if (!PlayerStorage()[this.settingsStorage]) this.registerDefaultSettings();
    return PlayerStorage()[this.settingsStorage];
  }

  get enabled(): boolean {
    if (!PlayerStorage()?.GlobalModule) return false;
    return (
      PlayerStorage().GlobalModule.ResponsiveEnabled &&
      this.settings.ResponsiveEnabled &&
      (ServerPlayerIsInChatRoom() || (CurrentModule == "Room" && CurrentScreen == "Crafting"))
    );
  }

  Init() {
    this.registerDefaultSettings();
  }

  registerDefaultSettings(): void {
    const storage = this.settingsStorage;
    const defaults = this.defaultSettings;
    if (!storage || !defaults) return;

    PlayerStorage()[storage] = Object.assign(defaults, PlayerStorage()[storage] ?? {});
  }

  get defaultSettings(): BaseSettingsModel | null {
    return null;
  }

  Load() {}

  Run() {
    // Empty
  }

  Unload() {
    // Empty
  }
}
