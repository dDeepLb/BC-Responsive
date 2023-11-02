export class RibbonMenu {
  private static START_Y = 820;
  private static MOD_Y = 110;

  /**
   * Calculates button Y position using mod index.
   * @param modIndex Mod index. Can be obtained calling `GetModIndex`.
   * @returns position
   */
  static getYPos(modIndex: number) {
    return this.START_Y - this.MOD_Y * (modIndex % 6);
  }

  /**
   * Registers `modName` in the Ribbon Menu. Handles when Ribbon Menu is full.
   * @param modName Mod name itself that will be registered in Ribbon Menu
   * @returns nothing
   */
  static registerMod(modName: string): void {
    if (!window.RibbonMenuMods) window.RibbonMenuMods = [];
    if (window.RibbonMenuMods.length >= 6) return console.warn(`${modName} can't be added to Ribbon Menu. Is is full`);
    window.RibbonMenuMods.push(modName);
  }

  /**
   * Returns mod index from Ribbon menu.
   * @param modName Mod name registered in Ribbon Menu
   * @returns modIndex or undefined
   */
  static getModIndex(modName: string): number | undefined {
    return window.RibbonMenuMods?.indexOf(modName);
  }

  /**
   * Draws button in Ribbon Menu using `callback`.
   * @param modIndex Mod index obtained with `GetModIndex`.
   * @param callback Function that will be executed on click.
   * @returns nothing
   */
  static drawModButton(modIndex: number | undefined, callback: (modIndex: number) => void): void {
    if (PreferenceSubscreen === "" && modIndex !== undefined) callback(modIndex as number);
    return;
  }

  /**
   * Handles click on button in Ribbon Menu using `callback`.
   * @param modIndex Mod index obtained with `GetModIndex`.
   * @param callback Function that will be executed on click.
   * @returns nothing
   */
  static handleModClick(modIndex: number | undefined, callback: (modIndex: number) => void): void {
    if (PreferenceSubscreen === "" && modIndex !== undefined)
      if (MouseIn(1815, RibbonMenu.getYPos(modIndex), 90, 90)) callback(modIndex as number);
    return;
  }
}
