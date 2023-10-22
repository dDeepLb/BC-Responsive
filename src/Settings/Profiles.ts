import { profile } from "console";
import { GuiSubscreen } from "../Base/BaseSetting";
import { ProfileEntryModel, ProfileNames, ProfileSaveModel, ProfilesSettingsModel } from "../Models/Profiles";
import { conDebug, conWarn } from "../Utilities/Console";
import { getText } from "../Utilities/Translation";

export class GuiProfiles extends GuiSubscreen {

  private PreferenceText = "";
  private ProfileNames: ProfileNames = ["", "", ""];

  get name(): string {
    return "profiles";
  }

  get icon(): string {
    return "Icons/Title.png";
  }

  get settings(): ProfilesSettingsModel {
    return super.settings as ProfilesSettingsModel;
  }

  tmpGlbl = GuiSubscreen.START_X;

  Load() {
    super.Load();


    for (let i = 0; i < 3; i++) {
      let profileIndex = i + 1;
      if (!Player?.BCResponsive?.ProfilesModule?.[profileIndex]) {
        Player.BCResponsive.ProfilesModule[profileIndex] = {
          data: <ProfileSaveModel>{},
          name: ""
        };
      }
      this.ProfileNames[i] = Player?.BCResponsive?.ProfilesModule?.[profileIndex]?.name ?? ""
    }


    CharacterAppearanceForceUpCharacter = Player.MemberNumber ?? -1;
  }

  Run() {
    let prev = MainCanvas.textAlign;
    super.Run();
    MainCanvas.textAlign = "left";

    for (let i = 0; i < 3; i++) {
      let profileIndex = i + 1;

      if (this.ProfileNames[i] === "")
        DrawText(getText("screen.profiles.text.profile") + ` ${profileIndex}`, this.getXPos(profileIndex), this.getYPos(profileIndex), "Black", "Gray");
      if (this.ProfileNames[i] !== "")
        DrawText(this.ProfileNames[i] as string, this.getXPos(profileIndex), this.getYPos(profileIndex), "Black", "Gray");

      this.drawButton("screen.profiles.button.save", "white", profileIndex, 250);
      this.drawButton("screen.profiles.button.load", "white", profileIndex, 500);
      this.drawButton("screen.profiles.button.delete", "IndianRed", profileIndex, 750);
    }

    if (this.PreferenceText)
      DrawText(this.PreferenceText, GuiSubscreen.START_X + 250, GuiSubscreen.START_Y - GuiSubscreen.Y_MOD, "Black", "Gray");

    MainCanvas.textAlign = prev;
  }

  Click() {
    super.Click();

    for (let i = 0; i < 3; i++) {
      let profileIndex = i + 1;

      this.handleProfilesSaving(profileIndex);
      this.handleProfilesLoading(profileIndex);
      this.handleProfilesDeleting(profileIndex);
    }
  }

  Exit() {

    CharacterAppearanceForceUpCharacter = -1;
    CharacterLoadCanvas(Player);
    this.PreferenceText = "";
    super.Exit();
  }

  saveProfile(profileId: number, profileName: string) {
    if (profileId < 1 || profileId > 3) {
      conWarn(`Invalid profile id ${profileId}`);
      return false;
    }

    if (!Object.keys(Player?.BCResponsive?.ProfilesModule?.[profileId]).length) {
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

  loadProfile(profileId: number) {
    if (profileId < 1 || profileId > 3) {
      conWarn(`Invalid profile id ${profileId}`);
      return false;
    }

    if (!Object.keys(Player?.BCResponsive?.ProfilesModule?.[profileId]).length) {
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

  deleteProfile(profileId: number) {
    if (profileId < 1 || profileId > 3) {
      conWarn(`Invalid profile id ${profileId}`);
      return false;
    }

    if (!Object.keys(Player?.BCResponsive?.ProfilesModule?.[profileId]).length) {
      return false;
    }

    if (Object.keys(Player?.BCResponsive?.ProfilesModule?.[profileId]).length) {
      Player.BCResponsive.ProfilesModule[profileId] = <ProfileEntryModel>{};
      return true;
    }
  }

  handleProfilesSaving(profileIndex: number) {
    let formerIndex = profileIndex - 1;
    if (MouseIn(this.getXPos(profileIndex) + 250, this.getYPos(profileIndex) - 32, 200, 64)) {
      let promptedName = prompt(getText("screen.profiles.prompt"));

      if (promptedName === null) return;
      this.ProfileNames[formerIndex] = promptedName
      if (this.ProfileNames[formerIndex] === "") {
        this.saveProfile(profileIndex, "");
        this.PreferenceText = `Profile ` + profileIndex + ` has been saved!`;
      }
      if (this.ProfileNames[formerIndex] !== "") {
        this.saveProfile(profileIndex, this.ProfileNames[formerIndex] as string);
        this.PreferenceText = `Profile "` + this.ProfileNames[formerIndex] + `" has been saved!`;
      }
      return;
    }
  }

  handleProfilesLoading(profileIndex: number) {
    let formerIndex = profileIndex - 1;
    if (MouseIn(this.getXPos(profileIndex) + 500, this.getYPos(profileIndex) - 32, 200, 64)) {
      if (!this.loadProfile(profileIndex)) {
        this.PreferenceText = `Profile ` + profileIndex + ` needs to be saved first!`;
        return;
      }
      if (this.ProfileNames[formerIndex] === "") this.PreferenceText = `Profile ` + profileIndex + ` has been loaded!`;
      if (this.ProfileNames[formerIndex] !== "") this.PreferenceText = `Profile "` + this.ProfileNames[formerIndex] + `" has been loaded!`;
      return;
    }
  }

  handleProfilesDeleting(profileIndex: number) {
    let formerIndex = profileIndex - 1;
    if (MouseIn(this.getXPos(profileIndex) + 750, this.getYPos(profileIndex) - 32, 200, 64)) {
      if (this.ProfileNames[formerIndex] === null) return;

      if (this.deleteProfile(profileIndex)) {
        if (this.ProfileNames[formerIndex] !== "") {
          this.PreferenceText = `Profile "` + this.ProfileNames[formerIndex] + `" has been deleted!`;
          this.ProfileNames[formerIndex] = "";
          return;
        }
        if (this.ProfileNames[formerIndex] === "") {
          this.PreferenceText = `Profile ` + profileIndex + ` has been deleted!`;
          return;
        }
      }

      if (!this.deleteProfile(profileIndex)) {
        this.PreferenceText = `Profile ` + profileIndex + ` is not saved or already deleted!`;
        return;
      }
      return;
    }
  }
}