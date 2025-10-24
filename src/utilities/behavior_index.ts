import { BehaviorEntryModel, TriggerDirection, TriggerType } from '_/models/behaviours';

export class BehaviorIndex {
  byName: Map<string, BehaviorEntryModel> = new Map();
  byTriggerType: Record<TriggerType, Set<BehaviorEntryModel>> = {
    speech: new Set<BehaviorEntryModel>(),
    emote: new Set<BehaviorEntryModel>(),
    action: new Set<BehaviorEntryModel>(),
    activity: new Set<BehaviorEntryModel>(),
  };
  byTriggerDirection: Record<TriggerDirection, Set<BehaviorEntryModel>> = {
    incoming: new Set<BehaviorEntryModel>(),
    outgoing: new Set<BehaviorEntryModel>(),
    both: new Set<BehaviorEntryModel>(),
  };
  byTriggerTypeDirection: Record<TriggerType, Partial<Record<TriggerDirection, Set<BehaviorEntryModel>>>> = {
    action: {}, activity: {}, speech: {}, emote: {},
  };
  byTriggerActivity: Map<ActivityName, BehaviorEntryModel[]> = new Map();
  byTriggerGroup: Map<AssetGroupItemName, BehaviorEntryModel[]> = new Map();

  add(entry: BehaviorEntryModel) {
    this.byName.set(entry.name, entry);
    for (const t of entry.trigger) {
      this.byTriggerType[t.type].add(entry);
      this.byTriggerDirection[t.direction].add(entry);

      if (!this.byTriggerTypeDirection[t.type][t.direction]) {
        this.byTriggerTypeDirection[t.type][t.direction] = new Set();
      }

      this.byTriggerTypeDirection[t.type][t.direction]?.add(entry);

      if (t.type === 'activity') {
        t.activityName?.forEach((a) => {
          const activities = this.byTriggerActivity.get(a);

          if (!activities) {
            this.byTriggerActivity.set(a, []);
          } else {
            activities.push(entry);
          }
        });

        t.groupName?.forEach((g) => {
          const groups = this.byTriggerGroup.get(g);

          if (!groups) {
            this.byTriggerGroup.set(g, []);
          } else {
            groups.push(entry);
          }
        });
      }
    }

  }

  remove(entry: BehaviorEntryModel) {
    this.byName.delete(entry.name);
    for (const t of entry.trigger) {
      this.byTriggerType[t.type].delete(entry);
      this.byTriggerDirection[t.direction].delete(entry);
      this.byTriggerTypeDirection[t.type][t.direction]?.delete(entry);

      if (t.type === 'activity') {
        t.activityName?.forEach((a) => {
          const activities = this.byTriggerActivity.get(a);
          if (activities) {
            activities.splice(activities.indexOf(entry), 1);
          }
        });

        t.groupName?.forEach((g) => {
          const groups = this.byTriggerGroup.get(g);
          if (groups) {
            groups.splice(groups.indexOf(entry), 1);
          }
        });
      }
    }
  }

  findByName(name: string) {
    return this.byName.get(name);
  }

  findByTriggerType(type: TriggerType) {
    return this.byTriggerType[type];
  }

  findByTriggerDirection(direction: TriggerDirection) {
    return this.byTriggerDirection[direction];
  }

  findByTriggerTypeDirection(type: TriggerType, direction: TriggerDirection) {
    return this.byTriggerTypeDirection[type][direction];
  }

  findByTriggerActivity(activity: ActivityName) {
    return this.byTriggerActivity.get(activity);
  }

  findByTriggerGroup(group: AssetGroupItemName) {
    return this.byTriggerGroup.get(group);
  }
}