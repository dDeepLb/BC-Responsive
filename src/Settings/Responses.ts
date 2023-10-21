import { GuiSubscreen, Setting } from "./SettingBase";
import { ResponsesEntryModel, ResponsesSettingsModel } from "./Models/Responses";
import { ConDebug } from "../Utilities/Console";
import { Localization } from "../Utilities/Translation";

export class GuiResponses extends GuiSubscreen {

    activityIndex: number = 0;
    selfAllowed: boolean = false; // to not call ActivityCanBeDoneOnSelf() every draw call;
    copiedEntry = <ResponsesEntryModel>{};

    get name(): string {
        return "Responses";
    }

    get icon(): string {
        return "Icons/Chat.png";
    }

    get settings(): ResponsesSettingsModel {
        return super.settings as ResponsesSettingsModel;
    }

    get currentResponsesEntry(): ResponsesEntryModel | undefined {
        let actName = this.activities[this.activityIndex]?.Name;
        let groupName = Player.FocusGroup?.Name ?? "";
        let entry = this.GetResponsesEntry(actName, groupName);
        return entry;
    }

    get activities(): Activity[] {
        if (!Player.FocusGroup)
            return [];
        else
            return AssetActivitiesForGroup("Female3DCG", Player.FocusGroup.Name, "any").filter(a => this.ActivityHasDictionaryText(this.GetActivityLabelTag(a, Player.FocusGroup!)));
    }

    get multipageStructure(): Setting[][] {
        return [
            [],
            [
                <Setting>{
                    type: "text",
                    id: "extra_low",
                    label: "Low Arousal Response:",
                    description: "Comma separated list of member IDs who can activate the collar. Leave empty for item permissions.",
                    setting: () => GuiResponses.StringListShow(this.settings.extraResponses.low),
                    setSetting: (val) => { this.settings.extraResponses.low = GuiResponses.ValidateInput(val) as string[]; }
                }, <Setting>{
                    type: "text",
                    id: "extra_light",
                    label: "Light Arousal Response:",
                    description: "Comma separated list of member IDs who can activate the collar. Leave empty for item permissions.",
                    setting: () => GuiResponses.StringListShow(this.settings.extraResponses.light),
                    setSetting: (val) => { this.settings.extraResponses.light = GuiResponses.ValidateInput(val) as string[]; }
                }, <Setting>{
                    type: "text",
                    id: "extra_medium",
                    label: "Medium Arousal Response:",
                    description: "Comma separated list of member IDs who can activate the collar. Leave empty for item permissions.",
                    setting: () => GuiResponses.StringListShow(this.settings.extraResponses.medium),
                    setSetting: (val) => { this.settings.extraResponses.medium = GuiResponses.ValidateInput(val) as string[]; }
                }, <Setting>{
                    type: "text",
                    id: "extra_hot",
                    label: "Hot Arousal Response:",
                    description: "Comma separated list of member IDs who can activate the collar. Leave empty for item permissions.",
                    setting: () => GuiResponses.StringListShow(this.settings.extraResponses.hot),
                    setSetting: (val) => { this.settings.extraResponses.hot = GuiResponses.ValidateInput(val) as string[]; }
                }, <Setting>{
                    type: "text",
                    id: "extra_orgasm",
                    label: "Orgasm Response:",
                    description: "Comma separated list of member IDs who can activate the collar. Leave empty for item permissions.",
                    setting: () => GuiResponses.StringListShow(this.settings.extraResponses.orgasm),
                    setSetting: (val) => { this.settings.extraResponses.orgasm = GuiResponses.ValidateInput(val) as string[]; }
                },
            ]
        ]
    }

    GetZoneColor(groupName: string): string {
        let hasConfiguration = this.settings.mainResponses.some(a => a.group == groupName);
        return hasConfiguration ? "#00FF0044" : "#80808044";
    }

    GetResponsesEntry(actName: string, grpName: string): ResponsesEntryModel | undefined {
        return this.settings.mainResponses.find(a => a.name == actName && a.group == grpName);
    }

    static ValidateInput = (input: string) => {
        let raw = `[${input}]`;

        const ValidateStringList = (input: any) => {
            if (!Array.isArray(input)) return undefined;
            if (!(input as any[]).every(_ => typeof _ === 'string')) return undefined;
            return input as string[];
        }

        try {
            let data = JSON.parse(raw);
            return ValidateStringList(data);
        } catch (e) {
            ConDebug(e);
            return undefined;
        }
    }

    static StringListShow = (input: string[]) => {
        if (!input || input.length === 0) return "";
        let result = JSON.stringify(input);
        return result.substring(1, result.length - 1);
    }

    static ActivityCanBeDoneOnSelf(activity: ActivityName, group: AssetGroupItemName): boolean {
        const foundActivity = AssetAllActivities(Player.AssetFamily).find(act => act.Name === activity);

        return foundActivity?.TargetSelf
            ? (typeof foundActivity.TargetSelf === "boolean"
                ? foundActivity.Target
                : foundActivity.TargetSelf).includes(group)
            : false;
    }

    ActivityHasDictionaryText(KeyWord: string) {
        if (!ActivityDictionary)
            ActivityDictionaryLoad();
        if (!ActivityDictionary)
            return;

        for (let D = 0; D < ActivityDictionary.length; D++)
            if (ActivityDictionary[D][0] == KeyWord)
                return true;
        return false;
    }

    GetActivityLabelTag(activity: Activity, group: AssetGroup) {
        let groupName = group.Name as AssetGroupItemName;
        if (Player.HasPenis()) {
            if (groupName == "ItemVulva") groupName = "ItemPenis";
            if (groupName == "ItemVulvaPiercings") groupName = "ItemGlans";
        }

        return `Label-ChatOther-${groupName}-${activity.Name}`;
    }

    GetActivityLabel(activity: Activity, group: AssetGroup) {
        if (!activity)
            return "ACTIVITY NOT FOUND";

        let tag = this.GetActivityLabelTag(activity, group);


        return ActivityDictionaryText(tag);
    }

    Load() {
        ConDebug(`Loading Responses GUI`)
        super.Load();
        ElementCreateTextArea("mainResponses");
        ElementSetAttribute("mainResponses", "style", "resize: both")

        this.ElementHide("mainResponses");

        CharacterAppearanceForceUpCharacter = Player.MemberNumber ?? -1;
    }

    Run() {
        let prev = MainCanvas.textAlign;

        MainCanvas.textAlign = "left";

        super.Run();
        DrawCharacter(Player, 50, 50, 0.9, false);

        if (PreferencePageCurrent == 1) {
            // Draws all the available character zones
            for (let Group of AssetGroup) {
                if (Group.IsItem() && !Group.MirrorActivitiesFrom && AssetActivitiesForGroup("Female3DCG", Group.Name).length)
                    DrawAssetGroupZone(Player, Group.Zone, 0.9, 50, 50, 1, "#808080FF", 3, this.GetZoneColor(Group.Name));
            }

            if (Player.FocusGroup != null) {
                let activity = this.activities[this.activityIndex ?? 0];
                DrawAssetGroupZone(Player, Player.FocusGroup.Zone, 0.9, 50, 50, 1, "cyan");
                MainCanvas.textAlign = "center";
                DrawBackNextButton(550, this.getYPos(0), 600, 64, this.GetActivityLabel(activity, Player.FocusGroup), "White", "", () => "", () => "");
                MainCanvas.textAlign = "left";
                if (!!activity) {
                    let image = "Assets/" + Player.AssetFamily + "/Activity/" + activity.Name + ".png";
                    if (activity.Name.indexOf("Item") > -1) {
                        image = "Icons/Dress.png";
                    }
                    DrawImageResize(image, 1170, this.getYPos(0) - 28, 120, 120);
                    DrawEmptyRect(1170, this.getYPos(0) - 28, 120, 120, "Black", 2);
                    this.DrawActivityOptions();
                }
            } else {
                DrawText("Please Select a Zone", this.getXPos(0), this.getYPos(0), "Black", "White");
            }
        }

        if (PreferencePageCurrent == 2)
            ElementPosition("mainResponses", -1000, -1000, 0, 0);
        MainCanvas.textAlign = prev;
    }

    Click() {
        let tmp = GuiSubscreen.START_X;
        GuiSubscreen.START_X = 550;
        super.Click();

        if (PreferencePageCurrent == 1) {
            for (const Group of AssetGroup) {
                if (Group.IsItem() && !Group.MirrorActivitiesFrom && AssetActivitiesForGroup("Female3DCG", Group.Name).length) {
                    const Zone = Group.Zone.find(z => DialogClickedInZone(Player, z, 0.9, 50, 50, 1));
                    if (Zone) {
                        if (Player.FocusGroup) this.SetResponsesEntryVals(this.currentResponsesEntry);
                        Player.FocusGroup = Group;
                        let activities = this.activities;
                        if (this.activityIndex >= activities.length)
                            this.activityIndex = 0;
                        this.LoadResponsesEntry(this.currentResponsesEntry);
                    }
                }
            }

            if (Player.FocusGroup != null) {
                let activities = this.activities;
                // Arousal activity control
                if (MouseIn(this.getXPos(0), this.getYPos(0), 600, 64)) {
                    this.SetResponsesEntryVals(this.currentResponsesEntry);
                    if (MouseX <= (this.getXPos(0) + 300)) this.activityIndex = (activities.length + this.activityIndex - 1) % activities.length;
                    else this.activityIndex = (this.activityIndex + 1) % activities.length;
                    this.LoadResponsesEntry(this.currentResponsesEntry);
                }
            }

            this.HandleActivityEntryClick();
        }

        GuiSubscreen.START_X = tmp;
    }

    Exit() {
        this.SetResponsesEntryVals(this.currentResponsesEntry);
        ElementRemove("mainResponses");

        CharacterAppearanceForceUpCharacter = -1;
        CharacterLoadCanvas(Player);
        Player.FocusGroup = null;
        super.Exit();
    }

    LoadResponsesEntry(entry: ResponsesEntryModel | undefined) {
        this.ElementSetValue("mainResponses", GuiResponses.StringListShow(entry?.responses as string[]) ?? []);
    }

    SetResponsesEntryVals(entry: ResponsesEntryModel | undefined) {
        let responses = ElementValue("mainResponses");
        if (responses != "" && GuiResponses.ValidateInput(responses)) {
            if (!entry) entry = this.CreateEntryIfNeeded(entry);
            if (entry) entry.responses = GuiResponses.ValidateInput(responses) as string[];
        }
    }

    ClearEntry(entry: ResponsesEntryModel) {
        this.settings.mainResponses = this.settings.mainResponses.filter(a => !(a.name == entry.name && a.group == entry.group));
        this.ElementSetValue("mainResponses", []);
    }

    ElementSetValue(elementId: string, value: any) {
        let element = document.getElementById(elementId) as HTMLInputElement;
        if (!!element && value != null)
            element.value = value;
    }

    NewDefaultEntry(actName: string, grpName: string): ResponsesEntryModel {
        return <ResponsesEntryModel>{
            name: actName,
            group: grpName,
            responses: [""],
            selfTrigger: false
        }
    }

    CreateEntryIfNeeded(existing: ResponsesEntryModel | undefined): ResponsesEntryModel {
        if (!existing) {
            existing = this.NewDefaultEntry(this.activities[this.activityIndex].Name, Player.FocusGroup?.Name ?? "");
            this.settings.mainResponses.push(existing);
            this.LoadResponsesEntry(this.currentResponsesEntry);
        }
        return existing;
    }

    CopyEntry(entry: ResponsesEntryModel | undefined) {
        this.copiedEntry = entry as ResponsesEntryModel;
    }

    PasteEntry(entry: ResponsesEntryModel | undefined) {
        if (Object(this.copiedEntry).length === 0) return;
        if (!entry)
            entry = this.CreateEntryIfNeeded(entry);
        ConDebug(entry, this.settings.mainResponses);
        entry.responses = this.copiedEntry.responses;
        this.LoadResponsesEntry(entry);
        if (GuiResponses.ActivityCanBeDoneOnSelf(entry.name as ActivityName, entry.group as AssetGroupItemName))
            entry.selfTrigger = this.copiedEntry.selfTrigger;
        ConDebug(entry, this.settings.mainResponses);
    }

    HandleActivityEntryClick() {
        let entry = this.currentResponsesEntry;
        this.selfAllowed = GuiResponses.ActivityCanBeDoneOnSelf(
            this.activities[this.activityIndex]?.Name as ActivityName,
            Player.FocusGroup?.Name as AssetGroupItemName
        );

        // Clear Entry
        if (!!entry && MouseIn(1310, this.getYPos(0), 64, 64)) {
            this.ClearEntry(entry);
        }

        if (MouseIn(1385, this.getYPos(0), 64, 64)) {
            this.CopyEntry(entry);
        }

        if (MouseIn(1455, this.getYPos(0), 64, 64)) {
            this.PasteEntry(entry);
        }

        // SelfAllowed Checkbox
        if (MouseIn(this.getXPos(2) + 600, this.getYPos(2) - 32, 64, 64) && this.selfAllowed) {
            entry = this.CreateEntryIfNeeded(entry);
            entry.selfTrigger = !entry.selfTrigger;
        }
    }

    DrawActivityOptions() {
        let activityEntry = this.currentResponsesEntry;

        if (!!activityEntry) {
            MainCanvas.textAlign = "center";
            DrawButton(1310, this.getYPos(0), 64, 64, "X", "White", undefined, "Clear Entry");
            MainCanvas.textAlign = "left";
        }

        MainCanvas.textAlign = "center";
        DrawButton(1385, this.getYPos(0), 64, 64, "", "White", undefined, "Copy Entry Settings");
        DrawImageResize("Icons/Export.png", 1385, this.getYPos(0), 64, 64);
        MainCanvas.textAlign = "left";

        MainCanvas.textAlign = "center";
        DrawButton(1455, this.getYPos(0), 64, 64, "", "White", undefined, "Paste Entry Settings");
        DrawImageResize("Icons/Import.png", 1455, this.getYPos(0), 64, 64);
        MainCanvas.textAlign = "left";

        // Self Allow Checkbox

        this.DrawCheckbox(
            "Self Trigger",
            "Defines if response will be triggered when you are doing action on yourself.",
            activityEntry?.selfTrigger ?? false,
            2,
            !this.selfAllowed
        );

        this.ElementPosition(
            "mainResponses",
            "Responses:",
            "Responses that will be send when action is done on you. Leave empty for no response for this action",
            3,
            false
        );
    }

    ElementPosition(elementId: string, label: string, description: string, order: number, disabled: boolean = false) {
        var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
        if (!GuiResponses.ValidateInput(ElementValue(elementId))) {
            DrawTextFit(`${Localization.GetText(label)} ${Localization.GetText("Syntax Error")}`, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
        } else {
            DrawTextFit(`${Localization.GetText(label)}`, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
        }
        ElementPosition(elementId, this.getXPos(order) + 750 + 225, this.getYPos(order), 800, 64);
        if (disabled) ElementSetAttribute(elementId, "disabled", "true");
        if (!disabled) document.getElementById(elementId)?.removeAttribute("disabled");
        if (isHovering) this.Tooltip(description);
    }
}