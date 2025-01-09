import { advancedElement, BaseSubscreen, domUtil, layoutElement, SettingElement } from 'bc-deeplib';
import { Guid } from 'js-guid';
import { ResponsesEntryModel, ResponsesSettingsModel } from '../Models/Responses';

const selector = {
  addEntryButton: 'add-entry-button',
  searchInput: 'search-input',
  entriesListNav: 'entries-list-nav',
  entriesListWrapper: 'entries-list-wrapper',
  entriesList: 'entries-list',
  entrySettingForm: 'entry-setting-form',
  responseEntryButton: 'response-entry-button',
};

export class GuiResponses extends BaseSubscreen {
  currentEntry: ResponsesEntryModel | undefined;

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

  load() {
    super.load();

    const searchInput = advancedElement.createInput({
      type: 'text',
      id: selector.searchInput,
      size: [null, 45],
      label: 'Search',
    });

    const addEntryButton = advancedElement.createButton({
      type: 'button',
      id: selector.addEntryButton,
      image: 'Icons/Plus.png',
      size: [60, 60],
      tooltip: 'Add new entry',
      customOptions:
        {
          onClick: () => this.handleAddingNewEntry
        }
    });

    const entriesListNav = ElementCreate({
      tag: 'div',
      attributes: {
        id: selector.entriesListNav,
      },
      children: [
        searchInput,
        addEntryButton,
      ]
    });

    const entryButtons = this.buildEntryButtons();

    const entriesList = advancedElement.createCustom({
      type: 'custom',
      id: selector.entriesListWrapper,
      options: {
        tag: 'div',
        attributes: {
          id: selector.entriesListWrapper,
        },
        children: [
          entriesListNav,
          ElementCreate({
            tag: 'div',
            attributes: {
              id: selector.entriesList,
            },
            children: entryButtons,
            eventListeners: {
              click: (ev: MouseEvent | TouchEvent) => this.handleEntrySelection(ev),
            }
          })
        ],
      },
      position: [150, 200],
      size: [350, 700],
    });
    layoutElement.appendToSubscreenDiv(entriesList);

    const entrySettingForm = advancedElement.createCustom({
      type: 'custom',
      id: selector.entrySettingForm,
      options: {
        tag: 'div',
        attributes: {
          id: selector.entrySettingForm,
        },
        classList: ['hidden'],
      },
      position: [550, 200],
      size: () => this.currentEntry ? [900, 700] : [0, 0],
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

    const entrySettingForm = document.getElementById(selector.entrySettingForm) as HTMLDivElement;
    domUtil.setPosition({ elementId: selector.entrySettingForm }, 550, 200, 'top-left');
    if (ElementCheckVisibility(entrySettingForm, { visibilityProperty: true })) domUtil.setSize({ elementId: selector.entrySettingForm }, 900, 700);
  }

  static activityHasDictionaryText(KeyWord: string) {
    if (!ActivityDictionary) ActivityDictionaryLoad();
    if (!ActivityDictionary) return;

    for (let D = 0; D < ActivityDictionary.length; D++) if (ActivityDictionary[D][0] === KeyWord) return true;
    return false;
  }

  static getActivityLabelTag(activity: Activity, group: AssetGroup) {
    let groupName = group.Name as $AssetGroupItemName;
    if (Player.HasPenis()) {
      if (groupName === 'ItemVulva') groupName = 'ItemPenis';
      if (groupName === 'ItemVulvaPiercings') groupName = 'ItemGlans';
    }

    return `Label-ChatOther-${groupName}-${activity.Name}`;
  }

  static getActivityLabel(activity: Activity, group: AssetGroup) {
    if (!activity) return 'ACTIVITY NOT FOUND';

    const tag = GuiResponses.getActivityLabelTag(activity, group);

    return ActivityDictionaryText(tag);
  }

  handleEntrySelection(ev: MouseEvent | TouchEvent): any {
    const target = ev.target as Element;
    const button = target.closest(`.${selector.responseEntryButton}`) as HTMLButtonElement;

    if (!button?.dataset.entryGuid) return;

    const entryGuid = button.dataset.entryGuid;
    const currentEntryGuid = this.currentEntry?.guid;

    if (currentEntryGuid) {
      const curentlyActiveButton = document.getElementById(`entry-${currentEntryGuid}`);
      curentlyActiveButton?.classList.remove('active');
    }
    
    if (currentEntryGuid === entryGuid) {
      this.currentEntry = undefined;
    } else {
      const entry = this.settings.find((e) => e.guid === entryGuid);
      this.currentEntry = entry;
  
      const entryButton = document.getElementById(`entry-${entryGuid}`);
      entryButton?.classList.add('active');
    }

    this.toggleEntrySettingForm();
  }

  createNewEntry(): ResponsesEntryModel {
    return <ResponsesEntryModel>{
      name: 'New Entry',
      guid: Guid.newGuid().toString(),
      isEnabled: true,
      trigger: [{
        type: 'Action',
        direction: 'Incoming',
      }],
      response: [{
        type: 'Speech',
      }],
      metadata: {
        Activity: [],
        Group: []
      },
    };
  }

  buildEntryButtons() {
    return this.settings.map(entry => {
      const active = entry.guid === this.currentEntry?.guid;

      return advancedElement.createButton({
        type: 'button',
        id: `entry-${entry.guid}`,
        label: entry.name,
        customOptions: {
          htmlOptions: {
            button: {
              classList: [selector.responseEntryButton, active ? 'active' : undefined],
              dataAttributes: {
                entryGuid: entry.guid
              }
            },
          }
        }
      });
    });
  }

  handleAddingNewEntry() {
    const newEntry = this.createNewEntry();
    this.settings.unshift(newEntry);

    this.rerenderEntryButtons();
  }

  rerenderEntryButtons() {
    const entriesList = document.getElementById(selector.entriesList) as HTMLDivElement;
    const entryButtons = this.buildEntryButtons();
    entriesList.innerHTML = '';
    entriesList.append(...entryButtons);
  }

  toggleEntrySettingForm() {
    const entrySettingForm = document.getElementById(selector.entrySettingForm) as HTMLDivElement;
    const entrySettingFormShouldBeActive = !!this.currentEntry;
    const entrySettingFormUnion = BaseSubscreen.currentElements.find((e) => e[0].id === selector.entrySettingForm);

    if (!entrySettingFormUnion) return;
            
    if (entrySettingFormShouldBeActive) {
      entrySettingForm.classList.toggle('hidden', false);
      entrySettingForm.classList.toggle('active', true);
    }

    domUtil.autoSetSize({ element: entrySettingForm }, entrySettingFormUnion[1].size);
    
    setTimeout(() => {
      // this trick with duplicate variable is needed to prevent hiding element with too fast clicking
      const shouldBeActive = !!this.currentEntry;
      if (!shouldBeActive) {
        entrySettingForm.classList.toggle('hidden', true);
        entrySettingForm.classList.toggle('active', false);
      }
    }, 500); 
  }
}
