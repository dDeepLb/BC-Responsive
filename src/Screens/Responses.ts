import { Input, SettingElement } from 'Types/elements';
import { BaseSubscreen, elementHide, getText } from 'bc-deeplib';
import { ResponsesEntryModel, ResponsesSettingsModel } from '../Models/Responses';

export class GuiResponses extends BaseSubscreen {
  activityIndex: number = 0;
  selfAllowed: boolean = false; // to not call ActivityCanBeDoneOnSelf() every draw call;
  masterSet: boolean = false;
  copiedEntry = <ResponsesEntryModel>{};

  get name(): string {
    return 'responses';
  }

  get icon(): string {
    return 'Icons/Chat.png';
  }

  get settings(): ResponsesSettingsModel {
    return super.settings as ResponsesSettingsModel;
  }

  get currentResponsesEntry(): ResponsesEntryModel | undefined {
    const actName = this.currentAct()?.Name ?? '';
    const groupName = this.currentGroup()?.Name ?? '';
    const entry = this.getResponsesEntry(actName, groupName);
    return entry;
  }

  get activities(): Activity[] {
    if (!Player.FocusGroup) return [];
    else
      return AssetActivitiesForGroup('Female3DCG', Player.FocusGroup.Name, 'any').filter((a) =>
        this.activityHasDictionaryText(this.getActivityLabelTag(a, Player.FocusGroup!))
      );
  }

  get pageStructure(): SettingElement[][] {
    return [
      [],
      [
        <Input>{
          type: 'text',
          id: 'extra_low',
          label: 'responses.setting.low_response.name',
          description: 'responses.setting.low_response.desc',
          setElementValue: () => GuiResponses.stringListShow(this.settings?.extraResponses?.low),
          setSettingValue: (val: string) => this.settings.extraResponses.low = GuiResponses.validateInput(val) ?? this.settings.extraResponses.low
        },
        <Input>{
          type: 'text',
          id: 'extra_light',
          label: 'responses.setting.light_response.name',
          description: 'responses.setting.light_response.desc',
          setElementValue: () => GuiResponses.stringListShow(this.settings?.extraResponses?.light),
          setSettingValue: (val: string) => this.settings.extraResponses.light = GuiResponses.validateInput(val) ?? this.settings.extraResponses.light
        },
        <Input>{
          type: 'text',
          id: 'extra_medium',
          label: 'responses.setting.medium_response.name',
          description: 'responses.setting.medium_response.desc',
          setElementValue: () => GuiResponses.stringListShow(this.settings?.extraResponses?.medium),
          setSettingValue: (val: string) => this.settings.extraResponses.medium = GuiResponses.validateInput(val) ?? this.settings.extraResponses.medium
        },
        <Input>{
          type: 'text',
          id: 'extra_hot',
          label: 'responses.setting.hot_response.name',
          description: 'responses.setting.hot_response.desc',
          setElementValue: () => GuiResponses.stringListShow(this.settings?.extraResponses?.hot),
          setSettingValue: (val: string) => this.settings.extraResponses.hot = GuiResponses.validateInput(val) ?? this.settings.extraResponses.hot
        },
        <Input>{
          type: 'text',
          id: 'extra_orgasm',
          label: 'responses.setting.orgasm_response.name',
          description: 'responses.setting.orgasm_response.desc',
          setElementValue: () => GuiResponses.stringListShow(this.settings?.extraResponses?.orgasm),
          setSettingValue: (val: string) => this.settings.extraResponses.orgasm = GuiResponses.validateInput(val) ?? this.settings.extraResponses.orgasm
        }
      ]
    ];
  }

  static validateInput = (input: string) => {
    const raw = `[${input}]`;

    const validateStringList = (input: any[]) => {
      if (!Array.isArray(input)) return undefined;
      if (!(input).every((_) => typeof _ === 'string')) return undefined;
      return input as string[];
    };

    try {
      const data = JSON.parse(raw);
      return validateStringList(data);
    } catch (e) {
      return undefined;
    }
  };

  static stringListShow = (input: string[]) => {
    if (!input || input.length === 0) return '';
    const result = JSON.stringify(input);
    return result.substring(1, result.length - 1);
  };

  static activityCanBeDoneOnSelf(activity: ActivityName, group: AssetGroupItemName | undefined): boolean {
    if (!activity || !group) return false;
    const foundActivity = AssetAllActivities(Player.AssetFamily).find((act) => act.Name === activity);

    return foundActivity?.TargetSelf
      ? (typeof foundActivity.TargetSelf === 'boolean' ? foundActivity.Target : foundActivity.TargetSelf).includes(group)
      : false;
  }

  load() {
    super.load();
    ElementCreateTextArea('mainResponses');

    elementHide({ elementId: 'mainResponses' });

    CharacterAppearanceForceUpCharacter = Player.MemberNumber ?? -1;
  }

  run() {
    const prev = MainCanvas.textAlign;

    MainCanvas.textAlign = 'left';

    super.run();

    if (PreferencePageCurrent == 1) {
      for (const Group of AssetGroup) {
        if (Group.IsItem() && !Group.MirrorActivitiesFrom && AssetActivitiesForGroup('Female3DCG', Group.Name).length)
          DrawAssetGroupZone(Player, Group.Zone, 0.9, 50, 50, 1, '#808080FF', 3, this.getZoneColor(Group.Name));
      }

      if (Player.FocusGroup != null) {
        const activity = this.activities[this.activityIndex ?? 0];
        DrawAssetGroupZone(Player, Player.FocusGroup.Zone, 0.9, 50, 50, 1, 'cyan');
        MainCanvas.textAlign = 'center';
        DrawBackNextButton(
          550,
          550,
          600,
          64,
          this.getActivityLabel(activity, Player.FocusGroup),
          'White',
          '',
          () => '',
          () => ''
        );
        MainCanvas.textAlign = 'left';
        if (activity) {
          let image = 'Assets/' + Player.AssetFamily + '/Activity/' + activity.Name + '.png';
          if (activity.Name.indexOf('Item') > -1) {
            image = 'Icons/Dress.png';
          }
          DrawImageResize(image, 1170, 28, 120, 120);
          DrawEmptyRect(1170, 28, 120, 120, 'Black', 2);
          this.drawActivityOptions();
        }
      } else {
        DrawText(getText('responses.text.select_zone'), 550, 220, 'Black', 'White');
      }
    }

    if (PreferencePageCurrent == 2) elementHide({ elementId: 'mainResponses' });
    MainCanvas.textAlign = prev;
  }

  click() {
    super.click();

    if (PreferencePageCurrent == 1) {
      for (const Group of AssetGroup) {
        if (Group.IsItem() && !Group.MirrorActivitiesFrom && AssetActivitiesForGroup('Female3DCG', Group.Name).length) {
          const Zone = Group.Zone.find((z) => DialogClickedInZone(Player, z, 0.9, 50, 50, 1));
          if (Zone) {
            if (Player.FocusGroup) this.saveResponseEntry(this.currentResponsesEntry);
            if (Player.FocusGroup === Group) return this.deselectEntry();
            Player.FocusGroup = Group;
            const activities = this.activities;
            if (this.activityIndex >= activities.length) this.activityIndex = 0;
            this.loadResponseEntry(this.currentResponsesEntry);
          }
        }
      }

      if (Player.FocusGroup != null) {
        const activities = this.activities;
        if (MouseIn(550, 550, 600, 64)) {
          this.saveResponseEntry(this.currentResponsesEntry);
          if (MouseX <= 550 + 300) this.activityIndex = (activities.length + this.activityIndex - 1) % activities.length;
          else this.activityIndex = (this.activityIndex + 1) % activities.length;
          this.loadResponseEntry(this.currentResponsesEntry);
        }
      }

      this.handleActivityEntryClick();
    }

  }

  exit() {
    this.saveResponseEntry(this.currentResponsesEntry);
    ElementRemove('mainResponses');

    CharacterAppearanceForceUpCharacter = -1;
    CharacterLoadCanvas(Player);
    Player.FocusGroup = null;
    super.exit();
  }

  currentAct() {
    return this.activities[this.activityIndex];
  }

  currentGroup() {
    return Player.FocusGroup;
  }

  getZoneColor(groupName: string): string {
    const hasConfiguration = this.settings?.mainResponses?.some((a) => a.groupName.includes(groupName));
    return hasConfiguration ? '#00FF0044' : '#80808044';
  }

  getResponsesEntry(actName: string, grpName: string): ResponsesEntryModel | undefined {
    return this.settings?.mainResponses?.find((a) => a.actName == actName && a.groupName.includes(grpName));
  }

  activityHasDictionaryText(KeyWord: string) {
    if (!ActivityDictionary) ActivityDictionaryLoad();
    if (!ActivityDictionary) return;

    for (let D = 0; D < ActivityDictionary.length; D++) if (ActivityDictionary[D][0] == KeyWord) return true;
    return false;
  }

  getActivityLabelTag(activity: Activity, group: AssetGroup) {
    let groupName = group.Name as $AssetGroupItemName;
    if (Player.HasPenis()) {
      if (groupName == 'ItemVulva') groupName = 'ItemPenis';
      if (groupName == 'ItemVulvaPiercings') groupName = 'ItemGlans';
    }

    return `Label-ChatOther-${groupName}-${activity.Name}`;
  }

  getActivityLabel(activity: Activity, group: AssetGroup) {
    if (!activity) return 'ACTIVITY NOT FOUND';

    const tag = this.getActivityLabelTag(activity, group);

    return ActivityDictionaryText(tag);
  }

  deselectEntry() {
    Player.FocusGroup = null;
    elementHide({ elementId: 'mainResponses' });
  }

  loadResponseEntry(entry: ResponsesEntryModel | undefined) {
    this.elementSetValue('mainResponses', GuiResponses.stringListShow(entry?.responses as string[]) ?? []);
  }

  saveResponseEntry(entry: ResponsesEntryModel | undefined) {
    const responses = ElementValue('mainResponses');
    let merge: boolean = false;
    let unmerge: boolean = false;
    const validResponses = GuiResponses.validateInput(responses);

    if (responses != '' && validResponses) {
      if (!entry) entry = this.createEntryIfNeeded(entry);
      if (!this.masterSet) {
        merge = this.mergeEntry(entry, validResponses);
        unmerge = this.unmergeEntry(entry, validResponses);
      }

      if (this.masterSet || !(merge || unmerge)) entry.responses = validResponses ?? entry.responses;

      this.settings.mainResponses.sort((a, b) => a.actName.localeCompare(b.actName));
    }
  }

  clearEntry(entry: ResponsesEntryModel) {
    if (!entry) return;
    const temp = this.settings?.mainResponses?.find((ent) => ent.actName === entry.actName && ent.groupName === entry.groupName);

    if (temp?.groupName.length && temp?.groupName.length <= 1) {
      this.settings.mainResponses = this.settings?.mainResponses.filter((a) => {
        return !(a.actName == entry.actName && a.groupName == entry.groupName);
      });
    } else {
      temp?.groupName?.splice(temp?.groupName?.indexOf(this.currentGroup()?.Name || ''), 1);
    }

    this.elementSetValue('mainResponses', []);
  }

  /**
   * Get entry >
   *
   * find response that has same `actName`, that doesn't includes current `groupName` and responses are the same with current entry >
   *
   * push `groupName` to that response >
   *
   * clear current entry
   */
  mergeEntry(entry: ResponsesEntryModel, validResponses: string[]) {
    // Responses we entered into Responses field
    const stringifiedValidResponses = JSON.stringify(validResponses);

    // Looking for entry to merge, if any
    const mergingEntry = this.settings?.mainResponses?.find((ent) => {
      return (
        ent.actName == this.currentAct().Name && // Actions are same
        !ent.groupName.includes(this.currentGroup()?.Name || '') && // Group array don't have selected group
        (JSON.stringify(ent.responses) === stringifiedValidResponses || // Responses are the same
          ent.selfTrigger === entry.selfTrigger) // Self trigger from current entry is same with one that we found
      );
    });

    if (!mergingEntry) return false; // We didn't find entry that fullfils our needs. We don't need to merge

    mergingEntry.groupName.push(this.currentGroup()?.Name || '');

    const entr = this.settings?.mainResponses?.find((ent) => ent.actName === entry.actName && ent.groupName === entry.groupName);
    entr?.groupName?.splice(entr?.groupName?.indexOf(this.currentGroup()?.Name || ''), 1);

    this.clearEntry(entry);
    return true;
  }

  /**
   * Get entry >
   *
   * find response that has same `actName`, that includes current `groupName` and responses are not the same with current entry >
   *
   * remove `groupName` from that response >
   *
   * create new entry with this data
   */
  unmergeEntry(entry: ResponsesEntryModel, validResponses: string[]) {
    // Responses we entered into Responses field
    const stringifiedCurrentResponses = JSON.stringify(validResponses);

    // Looking for entry to unmerge, if any
    const unmergingEntry = this.settings?.mainResponses?.find((ent) => {
      return (
        ent.actName == this.currentAct().Name && // Actions are same
        Array.isArray(ent.groupName) && // Group name is type of array
        ent.groupName.length > 1 && // Group array has more than one entry
        ent.groupName.includes(this.currentGroup()?.Name || '') && // Group array has selected group
        (JSON.stringify(ent.responses) !== stringifiedCurrentResponses || // Responses are not the same
          ent.selfTrigger !== entry.selfTrigger) // Self trigger from current entry not same with one that we found
      );
    });

    if (!unmergingEntry) return false; // We didn't find entry that fullfils our needs. We don't need to unmerge

    unmergingEntry.groupName.splice(unmergingEntry.groupName.indexOf(this.currentGroup()?.Name || ''), 1);

    const newEntry = this.createNewEntry(this.currentAct().Name, this.currentGroup()?.Name, validResponses, entry.selfTrigger);
    this.settings.mainResponses.push(newEntry);

    return true;
  }

  createNewEntry(actName: string, grpName?: string, responses?: string[], selfTrigger?: boolean): ResponsesEntryModel {
    return <ResponsesEntryModel>{
      actName: actName,
      groupName: [grpName],
      responses: responses ?? [''],
      selfTrigger: selfTrigger ?? false
    };
  }

  createEntryIfNeeded(existing: ResponsesEntryModel | undefined): ResponsesEntryModel {
    if (!existing) {
      existing = this.createNewEntry(this.currentAct()?.Name, this.currentGroup()?.Name ?? '');
      this.settings.mainResponses.push(existing);
      this.loadResponseEntry(this.currentResponsesEntry);
    }

    return existing;
  }

  copyEntry(entry: ResponsesEntryModel | undefined) {
    this.copiedEntry = entry as ResponsesEntryModel;
  }

  pasteEntry(entry: ResponsesEntryModel | undefined) {
    if (Object.keys(this.copiedEntry).length === 0) return;
    if (!entry) entry = this.createEntryIfNeeded(entry);

    entry.responses = this.copiedEntry.responses ?? [''];
    this.loadResponseEntry(entry);
    if (GuiResponses.activityCanBeDoneOnSelf(this.currentAct()?.Name, this.currentGroup()?.Name))
      entry.selfTrigger = this.copiedEntry.selfTrigger;
  }

  handleActivityEntryClick() {
    // const entry = this.currentResponsesEntry;
    this.selfAllowed = GuiResponses.activityCanBeDoneOnSelf(this.currentAct()?.Name, this.currentGroup()?.Name);

    // Clear Entry
    /* if (!!entry && MouseIn(1310, this.getYPos(0), 64, 64)) {
      this.clearEntry(entry);
    } */

    /* if (MouseIn(1385, this.getYPos(0), 64, 64)) {
      this.copyEntry(entry);
    } */

    /* if (MouseIn(1455, this.getYPos(0), 64, 64)) {
      this.pasteEntry(entry);
    } */
    /* 
        // Self Allowed Checkbox
        if (MouseIn(this.getXPos(2) + 600, this.getYPos(2) - 32, 64, 64) && this.selfAllowed) {
          entry = this.createEntryIfNeeded(entry);
          entry.selfTrigger = !entry.selfTrigger;
        } */
    /* 
        // Master Set Checkbox
        if (MouseIn(this.getXPos(8) + 600, this.getYPos(8) - 32, 64, 64)) {
          this.masterSet = !this.masterSet;
        } */
  }

  drawActivityOptions() {
    // const activityEntry = this.currentResponsesEntry;

    /* if (!!activityEntry) {
      MainCanvas.textAlign = 'center';
      DrawButton(1310, this.getYPos(0), 64, 64, 'X', 'White', undefined, getText('responses.text.clear_entry'));
      MainCanvas.textAlign = 'left';
    }

    MainCanvas.textAlign = 'center';
    DrawButton(1385, this.getYPos(0), 64, 64, '', 'White', undefined, getText('responses.text.copy_entry'));
    DrawImageResize('Icons/Export.png', 1385, this.getYPos(0), 64, 64);
    MainCanvas.textAlign = 'left';

    MainCanvas.textAlign = 'center';
    DrawButton(1455, this.getYPos(0), 64, 64, '', 'White', undefined, getText('responses.text.paste_entry'));
    DrawImageResize('Icons/Import.png', 1455, this.getYPos(0), 64, 64);
    MainCanvas.textAlign = 'left'; */

    // Self Allowed Checkbox
    // this.drawCheckbox(
    //   'responses.setting.self_trigger.name',
    //   'responses.setting.self_trigger.desc',
    //   activityEntry?.selfTrigger ?? false,
    //   2,
    //   !this.selfAllowed
    // );

    // Master Set Checkbox
    // this.drawCheckbox('responses.setting.master_set.name', 'responses.setting.master_set.desc', this.masterSet ?? false, 8);

    this.elementPosition('mainResponses', 'responses.setting.responses.name', 'responses.setting.responses.desc', 3, false);
  }

  elementSetValue(elementId: string, value: any) {
    const element = document.getElementById(elementId) as HTMLInputElement;
    if (!!element && value != null) element.value = value;
  }

  elementPosition(elementId: string, label: string, description: string, order: number, disabled: boolean = false) {
    /* var isHovering = MouseIn(this.getXPos(order), this.getYPos(order) - 32, 600, 64);
    const isValid = !!GuiResponses.validateInput(ElementValue(elementId));

    DrawTextFit(
      isValid ? `${getText(label)}` : `${getText(label)} ✖`,
      this.getXPos(order),
      this.getYPos(order),
      600,
      isHovering ? 'Red' : 'Black',
      'Gray'
    ); */

    // ElementPosition(elementId, this.getXPos(order) + 750 + 225, this.getYPos(order), 800, 64);
    if (disabled) ElementSetAttribute(elementId, 'disabled', 'true');
    if (!disabled) document.getElementById(elementId)?.removeAttribute('disabled');
    // if (isHovering) this.tooltip(getText(description));
  }
}
