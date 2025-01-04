import { BaseSubscreen, elementHide, Input, SettingElement } from 'bc-deeplib';
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
      []
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
    // ElementCreateTextArea('mainResponses');

    // elementHide({ elementId: 'mainResponses' });

    CharacterAppearanceForceUpCharacter = Player.MemberNumber ?? -1;
  }

  run() {
    super.run();
  }

  click() {
    super.click();
  }

  exit() {
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
  }
}
