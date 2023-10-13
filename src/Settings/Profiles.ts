import { GuiSubscreen, Setting } from "./SettingBase";
import { ResponsesEntryModel, ResponsesSettingsModel } from "./Models/Responses";
import { ConDebug } from "../Utilities/Console";
import { ProfilesSettingsModel } from "./Models/Profiles";
import { Localization } from "../Utilities/Translation";
import { EncodeDataStr, ServerStoreData } from "../Utilities/Data";

let PreferenceText = "";
let profileNames = ["", "", ""];

export class GuiProfiles extends GuiSubscreen {

  get name(): string {
    return "Profiles";
  }

  get icon(): string {
    return "Icons/Title.png";
  }

  get settings(): ProfilesSettingsModel {
    return super.settings as ProfilesSettingsModel;
  }

  get structure(): Setting[] {
    return []
  }

  tmpGlbl = GuiSubscreen.START_X;

  Load() {
    ConDebug(`Loading Profiles GUI`)
    super.Load();


    for (let i = 1; i <= 3; i++) {
      if (Player && Player.BCResponsive) {
        if (Player.BCResponsive && !Player.BCResponsive.ProfilesModule.profiles[i]) {
          Player.BCResponsive.ProfilesModule.profiles[i] = { data: "", name: "" };
        }
        if (Player.BCResponsive && Player.BCResponsive.ProfilesModule.profiles[i]) {
          profileNames[i - 1] = Player.BCResponsive.ProfilesModule.profiles[i].name;
        }
      }
    }

    CharacterAppearanceForceUpCharacter = Player.MemberNumber ?? -1;
  }

  Run() {
    let prev = MainCanvas.textAlign;
    super.Run();
    MainCanvas.textAlign = "left";

    for (let i = 1; i < 4; i++) {
      let profileName = profileNames[i - 1];
      if (profileName === "" || profileName === undefined) DrawText(Localization.GetText("profile_text") + ` ${i}`, this.getXPos(i), this.getYPos(i), "Black", "Gray");
      if (profileName !== "") DrawText(profileName, this.getXPos(i), this.getYPos(i), "Black", "Gray");
    }

    DrawText(PreferenceText, GuiSubscreen.START_X + 250, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "Gray");

    for (let i = 1; i < 4; i++) {
      this.DrawButton(Localization.GetText("label_profile_save"), "white", i, 250);
      this.DrawButton(Localization.GetText("label_profile_load"), "white", i, 500);
      this.DrawButton(Localization.GetText("label_profile_delete"), "IndianRed", i, 750);
    }

    MainCanvas.textAlign = prev;
  }

  Click() {
    super.Click();

    for (let i = 1; i < 4; i++) {
      if (MouseIn(this.getXPos(i) + 250, this.getYPos(i) - 32, 200, 64)) {
        let newProfName = prompt(`Please, enter profile name.`);
        if (newProfName === "") {
          this.SaveProfile(i, "");
          PreferenceText = `Profile ` + i + ` has been saved!`;
        }
        if (newProfName !== null && newProfName !== "") {
          this.SaveProfile(i, newProfName);
          profileNames[i - 1] = newProfName;
          PreferenceText = `Profile "` + newProfName + `" has been saved!`;
        }
        return;
      }
    }
    //Loading
    for (let i = 1; i < 4; i++) {
      let profileName = profileNames[i - 1];
      if (MouseIn(this.getXPos(i) + 500, this.getYPos(i) - 32, 200, 64)) {
        if (!this.LoadProfile(i)) {
          PreferenceText = `Profile ` + i + ` needs to be saved first!`;
          return;
        }
        if (profileName === "" || profileName === undefined) PreferenceText = `Profile ` + i + ` has been loaded!`;
        if (profileName !== "" && profileName !== undefined) PreferenceText = `Profile "` + profileName + `" has been loaded!`;
        return;
      }
    }
    //Deleting
    for (let i = 1; i < 4; i++) {
      let profileName = profileNames[i - 1];
      if (MouseIn(this.getXPos(i) + 750, this.getYPos(i) - 32, 200, 64)) {
        if (this.DeleteProfile(i)) {
          if (profileName !== "" && profileName !== undefined) {
            PreferenceText = `Profile "` + profileName + `" has been deleted!`;
            profileNames[i - 1] = "";
            return;
          }
          if (profileName === "" && profileName !== undefined) {
            PreferenceText = `Profile ` + i + ` has been deleted!`;
            return;
          }
        }
        if (!this.DeleteProfile(i)) {
          PreferenceText = `Profile ` + i + ` is not saved or already deleted!`;
          return;
        }
        return;
      }
    }
  }

  Exit() {

    CharacterAppearanceForceUpCharacter = -1;
    CharacterLoadCanvas(Player);
    PreferenceText = "";
    super.Exit();
  }

  SaveProfile(profileId: number, profileName: string) {
    if (profileId < 1 || profileId > 3) {
      throw new Error(`Invalid profile id ${profileId}`);
    }

    if (Player.BCResponsive) {
      if (!Player.BCResponsive?.ProfilesModule?.[profileId]) {
        Player.BCResponsive.ProfilesModule[profileId] = { data: "", name: "" };
      }

      Player.BCResponsive.ProfilesModule[profileId] = {
        name: profileName,
        data: EncodeDataStr(),
      }
      return true;
    }

    return false;
  }

  LoadProfile(profileId: number) {
    if (profileId < 1 || profileId > 3) {
      throw new Error(`Invalid profile id ${profileId}`);
    }
    if (!Player.BCResponsive.ProfilesModule || !Player.BCResponsive?.ProfilesModule?.[profileId]) {
      return false;
    }
    let encodedData = Player.BCResponsive.ProfilesModule[profileId].data;
    if (!encodedData) return false;
    if (encodedData) {
      try {
        const decodedData = JSON.parse(LZString.decompressFromBase64(encodedData));
        if (decodedData) {
          Player.BCResponsive = decodedData;
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }
    return true;
  }

  DeleteProfile(profileId: number) {
    if (profileId < 1 || profileId > 3) {
      throw new Error(`Invalid profile id ${profileId}`);
    }
    if (
      (Player.BCResponsive.ProfilesModule || Player.BCResponsive.ProfilesModule[profileId]) ||
      (Player.BCResponsive.ProfilesModule[profileId].data === "" &&
      Player.BCResponsive.ProfilesModule[profileId].name === "")
    )
      return false;
    if (
      (Player.BCResponsive.ProfilesModule || Player.BCResponsive.ProfilesModule[profileId]) &&
      Player.BCResponsive.ProfilesModule[profileId].data !== ""
    ) {
      Player.BCResponsive.ProfilesModule[profileId] = { data: "", name: "" };
      return true;
    }
  }
}