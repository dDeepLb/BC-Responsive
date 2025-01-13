import { advancedElement, BaseSubscreen, domUtil, getText, layoutElement, SettingElement } from 'bc-deeplib';
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
  entryNameInput: 'entry-name-input',
  entryIsEnabled: 'is-entry-enabled',
  settingsDiv: 'settings-div',
  triggersDiv: 'triggers-div',
  responsesDiv: 'responses-div',
  entryDiv: 'entry-div'
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
      htmlOptions: {
        attributes: {
          placeholder: 'Search',
        },
        eventListeners: {
          input: (ev: Event) => this.handleSearchInput(ev),
        }
      }
    });

    const addEntryButton = advancedElement.createButton({
      type: 'button',
      id: selector.addEntryButton,
      image: 'Icons/Plus.png',
      size: [60, 60],
      tooltip: 'Add new entry',
      htmlOptions:
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
      htmlOptions: {
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
      position: [150, 180],
      size: [350, 720],
    });
    layoutElement.appendToSubscreenDiv(entriesList);

    const entrySettingForm = advancedElement.createCustom({
      type: 'custom',
      id: selector.entrySettingForm,
      htmlOptions: {
        tag: 'div',
        attributes: {
          id: selector.entrySettingForm,
        },
        classList: ['hidden'],
      },
      position: [550, 180],
      size: () => this.currentEntry ? [1250, 720] : [0, 0],
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

    this.currentEntry = undefined;
  }

  resize(onLoad?: boolean): void {
    super.resize(onLoad);
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
    if (!currentEntryGuid) {
      setTimeout(() =>  this.renderEntrySettingForm(), 300);
    } else {
      this.renderEntrySettingForm();
    }
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
        htmlOptions: {
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

    this.renderEntryButtons();
  }

  renderEntryButtons() {
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
  
  handleSearchInput(ev: Event): any {
    const input = ev.target as HTMLInputElement;
    const value = input.value.toLowerCase();

    const entriesButtons = document.querySelectorAll(`.${selector.responseEntryButton}`);

    entriesButtons.forEach((button) => {
      const label = button.querySelector('.button-label');

      if (label?.textContent?.toLowerCase().includes(value)) {
        button.classList.remove('hidden');
      } else {
        button.classList.add('hidden');
      }
    });
  }

  buildEntrySettingForm() {
    const entry = this.currentEntry;

    if (!entry) return [];

    const entryName = advancedElement.createInput({
      type: 'text',
      id: selector.entryNameInput,
      description: getText('responses.entry_name_desc'),
      getElementValue: () => entry.name,
      htmlOptions: {
        classList: [selector.entryNameInput, 'deeplib-text'],
        attributes: {
          pattern: '^[^\\s]{1}[\\S\\s]{0,31}$',
          placeholder: getText('responses.entry_name'),
        },
        eventListeners: {
          change: () => {
            const thisButtonText = document.getElementById(`entry-${entry.guid}`)?.querySelector('.button-label') as HTMLSpanElement;
            const thisNewName = (document.getElementById(selector.entryNameInput) as HTMLInputElement).value.trim();
            const thisPattern = (document.getElementById(selector.entryNameInput) as HTMLInputElement).pattern;

            if (thisPattern && !thisNewName.match(thisPattern)) return;

            entry.name = (document.getElementById(selector.entryNameInput) as HTMLInputElement).value;
            thisButtonText.textContent = entry.name;
          }
        }
      },
    });

    const entrySwitch = advancedElement.createCheckbox({
      type: 'checkbox',
      id: selector.entryIsEnabled,
      label: 'Enabled',
      description: 'Whether this entry is enabled or not.',
      getSettingValue: () => entry.isEnabled,
      htmlOptions: {
        eventListeners: {
          change: () => {
            const entryIsEnabledCheckbox = (document.getElementById(selector.entryIsEnabled) as HTMLInputElement);
            entry.isEnabled = entryIsEnabledCheckbox.checked;
          }
        }
      }
    }) as HTMLInputElement;

    const settings = ElementCreate({
      tag: 'div',
      attributes: {
        id: selector.settingsDiv
      },
      classList: [selector.entryDiv],
      children: [
        entryName,
        entrySwitch
      ]
    });

    
    const triggers = ElementCreate({
      tag: 'div',
      attributes: {
        id: selector.triggersDiv
      },
      classList: [selector.entryDiv],
    });

    
    const responses = ElementCreate({
      tag: 'div',
      attributes: {
        id: selector.responsesDiv
      },
      classList: [selector.entryDiv],
    });

    return [
      settings,
      triggers,
      responses
    ];
  }

  renderEntrySettingForm() {
    const entrySettingForm = document.getElementById(selector.entrySettingForm) as HTMLDivElement;
    entrySettingForm.innerHTML = '';
    entrySettingForm.append(...this.buildEntrySettingForm());
  }
}
