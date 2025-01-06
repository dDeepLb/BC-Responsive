import { advancedElement, BaseSubscreen, domUtil, layoutElement, SettingElement } from 'bc-deeplib';
import { Guid } from 'js-guid';
import { EntryResponseType, EntryTriggerDirection, ResponsesEntryModel, ResponsesSettingsModel } from '../Models/Responses';

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
  
  set settings(value) {
    super.settings = value;
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
        GuiResponses.activityHasDictionaryText(GuiResponses.getActivityLabelTag(a, Player.FocusGroup!))
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

    const searchInput = advancedElement.createInput({
      type: 'text',
      id: 'search-input',
      size: [null, 45],
      label: 'Search',
    });

    const addEntryButton = advancedElement.createButton({
      type: 'button',
      id: 'add-entry-button',
      image: 'Icons/Plus.png',
      size: [60, 60],
      tooltip: 'Add new entry',
      // position: [520, 830]
      customOptions:
        {
          onClick(this: HTMLButtonElement, ev: MouseEvent | TouchEvent) {
            this.classList.toggle('active');
            
            const active = this.classList.contains('active');
            
            active && entrySettingForm.classList.toggle('hidden');
            active && entrySettingForm.classList.toggle('active');
    
            domUtil.setSize({ element: entrySettingForm }, !active ? 0 : 900, !active ? 0 : 700);
    
            setTimeout(() => {
              !active && entrySettingForm.classList.toggle('hidden');
              !active && entrySettingForm.classList.toggle('active');
            }, 500);
          }
        }
    });

    const entriesListNav = ElementCreate({
      tag: 'div',
      attributes: {
        id: 'entries-list-nav',
      },
      children: [
        searchInput,
        addEntryButton,
      ]
    });

    const entryButtons = this.settings.map(entry => {
      return advancedElement.createButton({
        type: 'button',
        id: `entry-${entry.name}`,
        label: entry.name,
        customOptions: {
          onClick(this: HTMLButtonElement, ev: MouseEvent | TouchEvent) {
            
          },
          htmlOptions: {
            button: {
              classList: ['response-entry-button']
            }
          }
        }
      });
    });

    const entriesList = advancedElement.createCustom({
      type: 'custom',
      id: 'entries-list-wrapper',
      options: {
        tag: 'div',
        attributes: {
          id: 'entries-list-wrapper',
        },
        children: [
          entriesListNav,
          ElementCreate({
            tag: 'div',
            attributes: {
              id: 'entries-list',
            },
            children: entryButtons
          })
        ],
      },
      position: [150, 200],
      size: [350, 700],
    });
    layoutElement.appendToSubscreenDiv(entriesList);

    const entrySettingForm = ElementCreate({
      tag: 'div',
      attributes: {
        id: 'entry-setting-form',
      },
      classList: ['hidden'],
      style: {
        width: '0px',
        height: '0px',
      }
    });
    layoutElement.appendToSubscreenDiv(entrySettingForm);
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

  resize(onLoad?: boolean): void {
    super.resize(onLoad);

    const entrySettingForm = document.getElementById('entry-setting-form') as HTMLDivElement;
    domUtil.setPosition({ elementId: 'entry-setting-form' }, 550, 200, 'top-left');
    if (ElementCheckVisibility(entrySettingForm, { visibilityProperty: true })) domUtil.setSize({ elementId: 'entry-setting-form' }, 900, 700);
  }

  currentAct() {
    return this.activities[this.activityIndex];
  }

  currentGroup() {
    return Player.FocusGroup;
  }

  getZoneColor(groupName: string): string {
    const hasConfiguration = this.settings?.some((a) => a.metadata?.Group.includes(groupName));
    return hasConfiguration ? '#00FF0044' : '#80808044';
  }

  getResponsesEntry(actName: string, grpName: string): ResponsesEntryModel | undefined {
    return this.settings?.find((a) => a.metadata?.Activity == actName && a.metadata?.Group.includes(grpName));
  }

  static activityHasDictionaryText(KeyWord: string) {
    if (!ActivityDictionary) ActivityDictionaryLoad();
    if (!ActivityDictionary) return;

    for (let D = 0; D < ActivityDictionary.length; D++) if (ActivityDictionary[D][0] == KeyWord) return true;
    return false;
  }

  static getActivityLabelTag(activity: Activity, group: AssetGroup) {
    let groupName = group.Name as $AssetGroupItemName;
    if (Player.HasPenis()) {
      if (groupName == 'ItemVulva') groupName = 'ItemPenis';
      if (groupName == 'ItemVulvaPiercings') groupName = 'ItemGlans';
    }

    return `Label-ChatOther-${groupName}-${activity.Name}`;
  }

  static getActivityLabel(activity: Activity, group: AssetGroup) {
    if (!activity) return 'ACTIVITY NOT FOUND';

    const tag = GuiResponses.getActivityLabelTag(activity, group);

    return ActivityDictionaryText(tag);
  }

  deselectEntry() {
    Player.FocusGroup = null;
  }

  clearEntry(entry: ResponsesEntryModel) {
    if (!entry) return;
    const temp = this.settings?.find((ent) => ent.metadata?.Activity === entry.metadata?.Activity && ent.metadata?.Group === entry.metadata?.Group);

    if (temp?.metadata?.Group.length && temp?.metadata?.Group.length <= 1) {
      this.settings = this.settings.filter((a) => {
        return !(a.metadata?.Activity == entry.metadata?.Activity && a.metadata?.Group == entry.metadata?.Group);
      }) as ResponsesSettingsModel;
    } else {
      temp?.metadata?.Group?.splice(temp?.metadata?.Group?.indexOf(this.currentGroup()?.Name || ''), 1);
    }
  }

  createNewEntry(actName: string, grpName?: string, responses?: string[], direction?: EntryTriggerDirection): ResponsesEntryModel {
    const response = responses?.map(res => {
      const responseType: EntryResponseType = ((): EntryResponseType => {
        if (res.startsWith('**')) return 'Emote';
        if (res.startsWith('*')) return 'EmoteSelf';
        if (res.startsWith('@@')) return 'Action';
        if (res.startsWith('@')) return 'ActionSelf';
      
        return 'Speech';
      })();
            
      return {
        type: responseType,
        content: res
      };
    });
    
    return <ResponsesEntryModel>{
      name: actName,
      guid: Guid.newGuid().toString(),
      isEnabled: true,
      trigger: [{
        type: 'Action',
        direction: direction ?? 'Incoming',
      }],
      response: response,
      metadata: {
        ActivityName: actName,
        ActivityGroup: [grpName]
      },
    };
  }

  createEntryIfNeeded(existing: ResponsesEntryModel | undefined): ResponsesEntryModel {
    if (!existing) {
      existing = this.createNewEntry(this.currentAct()?.Name, this.currentGroup()?.Name ?? '');
      this.settings.push(existing);
    }

    return existing;
  }

  copyEntry(entry: ResponsesEntryModel | undefined) {
    this.copiedEntry = entry as ResponsesEntryModel;
  }

  pasteEntry(entry: ResponsesEntryModel | undefined) {
    if (Object.keys(this.copiedEntry).length === 0) return;
    if (!entry) entry = this.createEntryIfNeeded(entry);

    entry.response = this.copiedEntry.response ?? [''];
  }
}
