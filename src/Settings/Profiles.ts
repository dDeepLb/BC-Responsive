import { GuiSubscreen, Setting } from "./SettingBase";
import { ConDebug, ConWarn } from "../Utilities/Console";
import { ProfileEntryModel, ProfileNames, ProfileSaveModel, ProfilesSettingsModel } from "./Models/Profiles";
import { GetText, Localization } from "../Utilities/Translation";
import { GlobalSettingsModel } from "./Models/Base";
import { profile } from "console";

export class GuiProfiles extends GuiSubscreen {

  private PreferenceText = "";
  private ProfileNames: ProfileNames = ["", "", ""];

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


    for (let i = 0; i < 3; i++) {
      if (!Player?.BCResponsive?.ProfilesModule?.[i]) {
        Player.BCResponsive.ProfilesModule[i] = {
          data: <ProfileSaveModel>{},
          name: ""
        };
      }
      this.ProfileNames[i] = Player?.BCResponsive?.ProfilesModule?.[i]?.name ?? ""
    }


    CharacterAppearanceForceUpCharacter = Player.MemberNumber ?? -1;
  }

  Run() {
    let prev = MainCanvas.textAlign;
    super.Run();
    MainCanvas.textAlign = "left";

    for (let i = 0; i < 3; i++) {
      let profileIndex = i + 1;

      if (this.ProfileNames[i] === null)
        return;
      if (this.ProfileNames[i] === "")
        DrawText(GetText("profile_text") + ` ${profileIndex}`, this.getXPos(profileIndex), this.getYPos(profileIndex), "Black", "Gray");
      if (this.ProfileNames[i] !== "")
        DrawText(this.ProfileNames[i] as string, this.getXPos(profileIndex), this.getYPos(profileIndex), "Black", "Gray");

      this.DrawButton(GetText("label_profile_save"), "white", profileIndex, 250);
      this.DrawButton(GetText("label_profile_load"), "white", profileIndex, 500);
      this.DrawButton(GetText("label_profile_delete"), "IndianRed", profileIndex, 750);
    }

    if (this.PreferenceText)
      DrawText(this.PreferenceText, GuiSubscreen.START_X + 250, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "Gray");

    MainCanvas.textAlign = prev;
  }

  Click() {
    super.Click();

    //Saving
    for (let i = 0; i < 3; i++) {
      let profileIndex = i + 1;

      if (MouseIn(this.getXPos(profileIndex) + 250, this.getYPos(profileIndex) - 32, 200, 64)) {
        this.ProfileNames[i] = prompt(`Please, enter profile name.`);

        if (this.ProfileNames[i] === null) return;
        if (this.ProfileNames[i] === "") {
          this.SaveProfile(profileIndex, "");
          this.PreferenceText = `Profile ` + profileIndex + ` has been saved!`;
        }
        if (this.ProfileNames[i] !== "") {
          this.SaveProfile(profileIndex, this.ProfileNames[i] as string);
          this.PreferenceText = `Profile "` + this.ProfileNames[i] + `" has been saved!`;
        }
        return;
      }

      if (MouseIn(this.getXPos(profileIndex) + 500, this.getYPos(profileIndex) - 32, 200, 64)) {
        if (!this.LoadProfile(profileIndex)) {
          this.PreferenceText = `Profile ` + profileIndex + ` needs to be saved first!`;
          return;
        }
        if (this.ProfileNames[i] === "") this.PreferenceText = `Profile ` + profileIndex + ` has been loaded!`;
        if (this.ProfileNames[i] !== "") this.PreferenceText = `Profile "` + this.ProfileNames[i] + `" has been loaded!`;
        return;
      }

      if (MouseIn(this.getXPos(profileIndex) + 750, this.getYPos(profileIndex) - 32, 200, 64)) {
        if (this.ProfileNames[i] === undefined) return;

        if (this.DeleteProfile(profileIndex)) {
          if (this.ProfileNames[i] !== "") {
            this.PreferenceText = `Profile "` + this.ProfileNames[i] + `" has been deleted!`;
            this.ProfileNames[i] = "";
            return;
          }
          if (this.ProfileNames[i] === "") {
            this.PreferenceText = `Profile ` + profileIndex + ` has been deleted!`;
            return;
          }
        }

        if (!this.DeleteProfile(profileIndex)) {
          this.PreferenceText = `Profile ` + i + ` is not saved or already deleted!`;
          return;
        }
        return;
      }
    }
  }

  Exit() {

    CharacterAppearanceForceUpCharacter = -1;
    CharacterLoadCanvas(Player);
    this.PreferenceText = "";
    super.Exit();
  }

  SaveProfile(profileId: number, profileName: string) {
    if (profileId < 1 || profileId > 3) {
      ConWarn(`Invalid profile id ${profileId}`);
      return false;
    }

    if (!Player?.BCResponsive?.ProfilesModule?.[profileId]) {
      Player.BCResponsive.ProfilesModule[profileId] = <ProfileEntryModel>{};
    }

    let saveData: ProfileSaveModel = {
      "GlobalModule": Player.BCResponsive.GlobalModule,
      "ResponsesModule": Player.BCResponsive.ResponsesModule
    }

    Player.BCResponsive.ProfilesModule[profileId] = {
      name: profileName,
      data: saveData,
    }

    return true;
  }

  LoadProfile(profileId: number) {
    if (profileId < 1 || profileId > 3) {
      ConWarn(`Invalid profile id ${profileId}`);
      return false;
    }

    if (!Player?.BCResponsive?.ProfilesModule?.[profileId]) {
      return false;
    }

    let data = Player.BCResponsive.ProfilesModule[profileId].data;
    if (!data) {
      return false;
    }

    if (data) {
      Player.BCResponsive.GlobalModule = data.GlobalModule
      Player.BCResponsive.ResponsesModule = data.ResponsesModule
    }

    return true;
  }

  DeleteProfile(profileId: number) {
    if (profileId < 1 || profileId > 3) {
      ConWarn(`Invalid profile id ${profileId}`);
      return false;
    }

    if (!Player?.BCResponsive?.ProfilesModule?.[profileId]) {
      return false;
    }

    if (Player?.BCResponsive?.ProfilesModule?.[profileId]) {
      Player.BCResponsive.ProfilesModule[profileId] = <ProfileEntryModel>{};
      return true;
    }
  }
}