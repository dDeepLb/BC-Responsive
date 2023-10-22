import { Setting } from "../../.types/setting";
import { GuiSubscreen } from "../Base/BaseSetting";
import { ResponsesEntryModel, ResponsesSettingsModel } from "../Models/Responses";
import { conDebug } from "../Utilities/Console";
import { getText } from "../Utilities/Translation";

export class GuiResponses extends GuiSubscreen {

    activityIndex: number = 0;
    selfAllowed: boolean = false; // to not call ActivityCanBeDoneOnSelf() every draw call;
    copiedEntry = <ResponsesEntryModel>{};

    get name(): string {
        return "responses";
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
        let entry = this.getResponsesEntry(actName, groupName);
        return entry;
    }

    get activities(): Activity[] {
        if (!Player.FocusGroup)
            return [];
        else
            return AssetActivitiesForGroup("Female3DCG", Player.FocusGroup.Name, "any").filter(
                a => this.activityHasDictionaryText(this.getActivityLabelTag(a, Player.FocusGroup!))
            );
    }

    get multipageStructure(): Setting[][] {
        return [
            [],
            [
                <Setting>{
                    type: "text",
                    id: "extra_low",
                    label: "screen.responses.setting.low_response.name",
                    description: "screen.responses.setting.low_response.desc",
                    setting: () => GuiResponses.stringListShow(this.settings?.extraResponses?.low),
                    setSetting: (val) => { this.settings.extraResponses.low = GuiResponses.validateInput(val) ?? this.settings.extraResponses.low; }
                }, <Setting>{
                    type: "text",
                    id: "extra_light",
                    label: "screen.responses.setting.light_response.name",
                    description: "screen.responses.setting.light_response.desc",
                    setting: () => GuiResponses.stringListShow(this.settings?.extraResponses?.light),
                    setSetting: (val) => { this.settings.extraResponses.light = GuiResponses.validateInput(val) ?? this.settings.extraResponses.light; }
                }, <Setting>{
                    type: "text",
                    id: "extra_medium",
                    label: "screen.responses.setting.medium_response.name",
                    description: "screen.responses.setting.medium_response.desc",
                    setting: () => GuiResponses.stringListShow(this.settings?.extraResponses?.medium),
                    setSetting: (val) => { this.settings.extraResponses.medium = GuiResponses.validateInput(val) ?? this.settings.extraResponses.medium; }
                }, <Setting>{
                    type: "text",
                    id: "extra_hot",
                    label: "screen.responses.setting.hot_response.name",
                    description: "screen.responses.setting.hot_response.desc",
                    setting: () => GuiResponses.stringListShow(this.settings?.extraResponses?.hot),
                    setSetting: (val) => { this.settings.extraResponses.hot = GuiResponses.validateInput(val) ?? this.settings.extraResponses.hot; }
                }, <Setting>{
                    type: "text",
                    id: "extra_orgasm",
                    label: "screen.responses.setting.orgasm_response.name",
                    description: "screen.responses.setting.orgasm_response.desc",
                    setting: () => GuiResponses.stringListShow(this.settings?.extraResponses?.orgasm),
                    setSetting: (val) => { this.settings.extraResponses.orgasm = GuiResponses.validateInput(val) ?? this.settings.extraResponses.orgasm; }
                },
            ]
        ]
    }

    getZoneColor(groupName: string): string {
        let hasConfiguration = this.settings?.mainResponses?.some(a => a.group == groupName);
        return hasConfiguration ? "#00FF0044" : "#80808044";
    }

    getResponsesEntry(actName: string, grpName: string): ResponsesEntryModel | undefined {
        return this.settings?.mainResponses?.find(a => a.name == actName && a.group == grpName);
    }

    static validateInput = (input: string) => {
        let raw = `[${input}]`;

        const validateStringList = (input: any) => {
            if (!Array.isArray(input)) return undefined;
            if (!(input as any[]).every(_ => typeof _ === 'string')) return undefined;
            return input as string[];
        }

        try {
            let data = JSON.parse(raw);
            return validateStringList(data);
        } catch (e) {
            conDebug(e);
            return undefined;
        }
    }

    static stringListShow = (input: string[]) => {
        if (!input || input.length === 0) return "";
        let result = JSON.stringify(input);
        return result.substring(1, result.length - 1);
    }

    static activityCanBeDoneOnSelf(activity: ActivityName, group: AssetGroupItemName): boolean {
        const foundActivity = AssetAllActivities(Player.AssetFamily).find(act => act.Name === activity);

        return foundActivity?.TargetSelf
            ? (typeof foundActivity.TargetSelf === "boolean"
                ? foundActivity.Target
                : foundActivity.TargetSelf).includes(group)
            : false;
    }

    activityHasDictionaryText(KeyWord: string) {
        if (!ActivityDictionary)
            ActivityDictionaryLoad();
        if (!ActivityDictionary)
            return;

        for (let D = 0; D < ActivityDictionary.length; D++)
            if (ActivityDictionary[D][0] == KeyWord)
                return true;
        return false;
    }

    getActivityLabelTag(activity: Activity, group: AssetGroup) {
        let groupName = group.Name as AssetGroupItemName;
        if (Player.HasPenis()) {
            if (groupName == "ItemVulva") groupName = "ItemPenis";
            if (groupName == "ItemVulvaPiercings") groupName = "ItemGlans";
        }

        return `Label-ChatOther-${groupName}-${activity.Name}`;
    }

    getActivityLabel(activity: Activity, group: AssetGroup) {
        if (!activity)
            return "ACTIVITY NOT FOUND";

        let tag = this.getActivityLabelTag(activity, group);


        return ActivityDictionaryText(tag);
    }

    Load() {
        if (!this.settings)
            conDebug(`Loading Responses GUI`)
        super.Load();
        ElementCreateTextArea("mainResponses");

        this.elementHide("mainResponses");

        CharacterAppearanceForceUpCharacter = Player.MemberNumber ?? -1;
    }

    Run() {
        let prev = MainCanvas.textAlign;

        MainCanvas.textAlign = "left";

        super.Run();

        if (PreferencePageCurrent == 1) {
            // Draws all the available character zones
            for (let Group of AssetGroup) {
                if (Group.IsItem() && !Group.MirrorActivitiesFrom && AssetActivitiesForGroup("Female3DCG", Group.Name).length)
                    DrawAssetGroupZone(Player, Group.Zone, 0.9, 50, 50, 1, "#808080FF", 3, this.getZoneColor(Group.Name));
            }

            if (Player.FocusGroup != null) {
                let activity = this.activities[this.activityIndex ?? 0];
                DrawAssetGroupZone(Player, Player.FocusGroup.Zone, 0.9, 50, 50, 1, "cyan");
                MainCanvas.textAlign = "center";
                DrawBackNextButton(550, this.getYPos(0), 600, 64, this.getActivityLabel(activity, Player.FocusGroup), "White", "", () => "", () => "");
                MainCanvas.textAlign = "left";
                if (!!activity) {
                    let image = "Assets/" + Player.AssetFamily + "/Activity/" + activity.Name + ".png";
                    if (activity.Name.indexOf("Item") > -1) {
                        image = "Icons/Dress.png";
                    }
                    DrawImageResize(image, 1170, this.getYPos(0) - 28, 120, 120);
                    DrawEmptyRect(1170, this.getYPos(0) - 28, 120, 120, "Black", 2);
                    this.drawActivityOptions();
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
                        if (Player.FocusGroup) this.setResponsesEntryVals(this.currentResponsesEntry);
                        Player.FocusGroup = Group;
                        let activities = this.activities;
                        if (this.activityIndex >= activities.length)
                            this.activityIndex = 0;
                        this.loadResponsesEntry(this.currentResponsesEntry);
                    }
                }
            }

            if (Player.FocusGroup != null) {
                let activities = this.activities;
                // Arousal activity control
                if (MouseIn(this.getXPos(0), this.getYPos(0), 600, 64)) {
                    this.setResponsesEntryVals(this.currentResponsesEntry);
                    if (MouseX <= (this.getXPos(0) + 300)) this.activityIndex = (activities.length + this.activityIndex - 1) % activities.length;
                    else this.activityIndex = (this.activityIndex + 1) % activities.length;
                    this.loadResponsesEntry(this.currentResponsesEntry);
                }
            }

            this.handleActivityEntryClick();
        }

        GuiSubscreen.START_X = tmp;
    }

    Exit() {
        this.setResponsesEntryVals(this.currentResponsesEntry);
        ElementRemove("mainResponses");

        CharacterAppearanceForceUpCharacter = -1;
        CharacterLoadCanvas(Player);
        Player.FocusGroup = null;
        super.Exit();
    }

    loadResponsesEntry(entry: ResponsesEntryModel | undefined) {
        this.elementSetValue("mainResponses", GuiResponses.stringListShow(entry?.responses as string[]) ?? []);
    }

    setResponsesEntryVals(entry: ResponsesEntryModel | undefined) {
        let responses = ElementValue("mainResponses");
        if (responses != "" && GuiResponses.validateInput(responses)) {
            if (!entry) entry = this.createEntryIfNeeded(entry);
            if (entry) entry.responses = GuiResponses.validateInput(responses) ?? entry.responses;
        }
    }

    clearEntry(entry: ResponsesEntryModel) {
        this.settings.mainResponses = this.settings?.mainResponses?.filter(a => !(a.name == entry.name && a.group == entry.group));
        this.elementSetValue("mainResponses", []);
    }

    elementSetValue(elementId: string, value: any) {
        let element = document.getElementById(elementId) as HTMLInputElement;
        if (!!element && value != null)
            element.value = value;
    }

    newDefaultEntry(actName: string, grpName: string): ResponsesEntryModel {
        return <ResponsesEntryModel>{
            name: actName,
            group: grpName,
            responses: [""],
            selfTrigger: false
        }
    }

    createEntryIfNeeded(existing: ResponsesEntryModel | undefined): ResponsesEntryModel {
        if (!existing) {
            existing = this.newDefaultEntry(this.activities[this.activityIndex].Name, Player.FocusGroup?.Name ?? "");
            this.settings.mainResponses.push(existing);
            this.loadResponsesEntry(this.currentResponsesEntry);
        }
        return existing;
    }

    copyEntry(entry: ResponsesEntryModel | undefined) {
        this.copiedEntry = entry as ResponsesEntryModel;
    }

    pasteEntry(entry: ResponsesEntryModel | undefined) {
        if (Object(this.copiedEntry).length === 0) return;
        if (!entry)
            entry = this.createEntryIfNeeded(entry);
        conDebug(entry, this.settings.mainResponses);
        entry.responses = this.copiedEntry.responses;
        this.loadResponsesEntry(entry);
        if (GuiResponses.activityCanBeDoneOnSelf(entry.name as ActivityName, entry.group as AssetGroupItemName))
            entry.selfTrigger = this.copiedEntry.selfTrigger;
        conDebug(entry, this.settings.mainResponses);
    }

    handleActivityEntryClick() {
        let entry = this.currentResponsesEntry;
        this.selfAllowed = GuiResponses.activityCanBeDoneOnSelf(
            this.activities[this.activityIndex]?.Name as ActivityName,
            Player.FocusGroup?.Name as AssetGroupItemName
        );

        // Clear Entry
        if (!!entry && MouseIn(1310, this.getYPos(0), 64, 64)) {
            this.clearEntry(entry);
        }

        if (MouseIn(1385, this.getYPos(0), 64, 64)) {
            this.copyEntry(entry);
        }

        if (MouseIn(1455, this.getYPos(0), 64, 64)) {
            this.pasteEntry(entry);
        }

        // SelfAllowed Checkbox
        if (MouseIn(this.getXPos(2) + 600, this.getYPos(2) - 32, 64, 64) && this.selfAllowed) {
            entry = this.createEntryIfNeeded(entry);
            entry.selfTrigger = !entry.selfTrigger;
        }
    }

    drawActivityOptions() {
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

        this.drawCheckbox(
            "screen.responses.setting.self_trigger.name",
            "screen.responses.setting.self_trigger.desc",
            activityEntry?.selfTrigger ?? false,
            2,
            !this.selfAllowed
        );

        this.elementPosition(
            "mainResponses",
            "screen.responses.setting.responses.name",
            "screen.responses.setting.responses.desc",
            3,
            false
        );
    }

    elementPosition(elementId: string, label: string, description: string, order: number, disabled: boolean = false) {
        var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
        if (!GuiResponses.validateInput(ElementValue(elementId))) {
            DrawTextFit(`${getText(label)} ✖`, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
        } else {
            DrawTextFit(`${getText(label)}`, this.getXPos(order), this.getYPos(order), 600, isHovering ? "Red" : "Black", "Gray");
        }
        ElementPosition(elementId, this.getXPos(order) + 750 + 225, this.getYPos(order), 800, 64);
        if (disabled) ElementSetAttribute(elementId, "disabled", "true");
        if (!disabled) document.getElementById(elementId)?.removeAttribute("disabled");
        if (isHovering) this.tooltip(getText(description));
    }
}