import { BaseModule } from "../Base";
import { Subscreen } from "../Settings/SettingDefinitions";
import { GuiResponses } from "../Settings/Responses";
import { ResponsesEntryModel, ResponsesSettingsModel } from "../Settings/Models/Responses";
import { getModule } from "../Modules";
import { HOOK_PRIORITY, HookFunction, ModuleCategory, OnActivity } from "../Utilities/SDK";
import { ConDebug } from "../Utilities/Console";
import { ActivityDeconstruct, ChatRoomAutoInterceptMessage } from "../Message/ChatMessages";
import { ActivityMessage } from "../Message/ResponseProvider";
import { GetCharacter } from "../Utilities/Other";
import { ActivityHandle } from "../Message/Handles";
import { GetDefaultResponsesEntries } from "../Utilities/DefaultResponsesEntries";

export class ResponsesModule extends BaseModule {

    get settings(): ResponsesSettingsModel {
        return super.settings as ResponsesSettingsModel;
    }

    get settingsScreen(): Subscreen | null {
        return GuiResponses;
    }

    get defaultSettings() {
        return GetDefaultResponsesEntries();
    }



    Load(): void {
        OnActivity(HOOK_PRIORITY.OBSERVE, ModuleCategory.Responses, (data, sender, msg, metadata) => {
            let ActivityGroup
            let ActivityName
            for (let v of metadata) {
                if (v.FocusGroupName) ActivityGroup = v.FocusGroupName;
                if (v.ActivityName) ActivityName = v.ActivityName;
            }
            let entry = this.GetResponsesEntry(ActivityName, ActivityGroup);
            const dict = ActivityDeconstruct(metadata);
            const target = GetCharacter(dict?.TargetCharacter.MemberNumber);
            const source = GetCharacter(dict?.SourceCharacter.MemberNumber);

            ActivityHandle(entry, target, source)

            ConDebug(data, sender, msg, metadata);
        });
        (<any>window).CheckActivityForAllGroups = (Activity: ActivityName, Responses: "Boop" | "Pain" | "Tickle") => this.CheckActivityForAllGroups(Activity, Responses);
    }

    Run(): void {

    }

    GetResponsesEntry(actName: string, grpName: string): ResponsesEntryModel | undefined {
        return this.settings.mainResponses.find(a => a.name == actName && a.group == grpName);
    }



    CheckActivityForAllGroups(Activity: ActivityName, Responses: "Boop" | "Pain" | "Tickle") {
        const ret: any = []
        let oldSettings = undefined;
        if (Player?.OnlineSettings.BCResponsive?.data)
            oldSettings = JSON.parse(LZString.decompressFromBase64(Player.OnlineSettings.BCResponsive.data));
        for (const Group of AssetGroup) {
            if (!ActivityPossibleOnGroup(Player, Group.Name as AssetGroupItemName)) continue;
            if (this.ActivityCanBeDone(Player, Activity, Group.Name as AssetGroupItemName)) {
                if (GuiResponses.ActivityCanBeDoneOnSelf(Activity, Group.Name as AssetGroupItemName))
                    ret.push({
                        name: Activity,
                        group: Group.Name as AssetGroupItemName,
                        responses: `GuiResponses.ValidateInput(oldSettings.${Responses}) ?? DefaultResponses.${Responses}`,
                        selfTrigger: true,
                    })
                else
                    ret.push({
                        name: Activity,
                        group: Group.Name as AssetGroupItemName,
                        responses: `GuiResponses.ValidateInput(oldSettings.${Responses}) ?? DefaultResponses.${Responses}`,
                    })
            }
        }
        return ret;
    }

    ActivityCanBeDone(C: Character, Activity: ActivityName, Group: AssetGroupItemName) {
        let ActList = this.ActivityAllowedForGroup(C, Group);
        for (let A = 0; A < ActList.length; A++) {
            if (ActList[A].Activity.Name == Activity) {
                if (typeof ActList[A].Activity.TargetSelf === "boolean" && ActList[A].Activity.TargetSelf === true && ActList[A].Activity.Target.includes(Group))
                    return true;
                if (ActList[A].Activity.Target.includes(Group) || (Array.isArray(ActList[A].Activity.TargetSelf) && (ActList[A].Activity.TargetSelf as AssetGroupItemName[])?.includes(Group)))
                    return true;
                return false;
            }
        }
    }

    ActivityAllowedForGroup(character: Character, groupname: AssetGroupItemName) {
        // Get the group and all possible activities
        let activities = AssetAllActivities(Player.AssetFamily);
        let group = ActivityGetGroupOrMirror(Player.AssetFamily, groupname);
        if (!activities || !group) return [];

        // Make sure the target player zone is allowed for an activity
        if (!ActivityPossibleOnGroup(character, groupname as AssetGroupItemName))
            return [];

        const targetedItem = InventoryGet(character, groupname);

        /** @type {ItemActivity[]} */
        let allowed: ItemActivity[] = [];

        activities.forEach(activity => {
            allowed.push({ Activity: activity });
        });

        // Sort allowed activities by their group declaration order
        return allowed.sort((a, b) => Math.sign(ActivityFemale3DCGOrdering.indexOf(a.Activity.Name) - ActivityFemale3DCGOrdering.indexOf(b.Activity.Name)));
    }
}

