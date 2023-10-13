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

export class ResponsesModule extends BaseModule {

    get settings(): ResponsesSettingsModel {
        return super.settings as ResponsesSettingsModel;
    }

    get settingsScreen(): Subscreen | null {
        return GuiResponses;
    }

    DefaultResponses = {
        Pain: ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"],
        Tickle: ["Hahaha!", "Mmmmhahaha!", "Muhahah...", "Ha!Ha!"],
        Boop: ["Eek!", "Beep!", "Aww.."],

        Low: ["", "", "mh", "♥oh♥", "ah", "...♥"],
        Light: ["nyah♥", "Aah!", "mh", "oh!♥", "mh♥"],
        Medium: ["mm", "aaaah", "nyAh♥"],
        Hot: ["n... Nyah♥", "Oooh", "mmmmmh!", "NYyaaA♥"],
        Orgasm: [
            "Nya...Ny...NyaaAAaah!",
            "Mmmmh... MMmh... Hhhmmmm...",
            "Oooooh... Mmmmh... OooOOOOh!",
            "Mmmhnn... Nyhmm... Nyah!"
        ],
    }

    get defaultSettings() {
        let oldSettings = null;
        if (Player?.OnlineSettings?.BCResponsive?.data) {
            oldSettings = JSON.parse(LZString.decompressFromBase64(Player.OnlineSettings.BCResponsive.data));
        }
        return <ResponsesSettingsModel>{
            mainResponses: [
                //Boop
                {
                    name: "Pet",
                    group: "ItemNose",
                    responses: GuiResponses.ValidateInput(oldSettings?.boop) ?? this.DefaultResponses.Boop,
                    selfTrigger: false,
                },
                {
                    name: "LSCG_SharkBite",
                    group: "ItemNose",
                    responses: GuiResponses.ValidateInput(oldSettings?.boop) ?? this.DefaultResponses.Boop,
                    selfTrigger: false,
                },
                //Pain
                {
                    name: "Pinch",
                    group: "ItemNose",
                    responses: GuiResponses.ValidateInput(oldSettings?.pain) ?? this.DefaultResponses.Pain,
                    selfTrigger: false,
                },
                {
                    name: "Bite",
                    group: "ItemNose",
                    responses: GuiResponses.ValidateInput(oldSettings?.pain) ?? this.DefaultResponses.Pain,
                    selfTrigger: false,
                },
            ], extraResponses: {
                low: GuiResponses.ValidateInput(oldSettings?.low) ?? this.DefaultResponses.Low,
                light: GuiResponses.ValidateInput(oldSettings?.light) ?? this.DefaultResponses.Light,
                medium: GuiResponses.ValidateInput(oldSettings?.medium) ?? this.DefaultResponses.Medium,
                hot: GuiResponses.ValidateInput(oldSettings?.hot) ?? this.DefaultResponses.Hot,
                orgasm: GuiResponses.ValidateInput(oldSettings?.orgasm) ?? this.DefaultResponses.Orgasm,
            }
        };
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

            ActivityMessage(entry, target, source)

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
        let oldSettings = JSON.parse(LZString.decompressFromBase64(Player.OnlineSettings.BCResponsive.data));
        for (const Group of AssetGroup) {
            if (ActivityCanBeDone(Player, Activity, Group.Name as AssetGroupItemName)) {
                ret.push({
                    name: Activity,
                    group: Group.Name as AssetGroupItemName,
                    responses: `GuiResponses.ValidateInput(oldSettings.${Responses}) ?? this.DefaultResponses.${Responses}`,
                    selfTrigger: GuiResponses.ActivityCanBeDoneOnSelf(Activity, Group.Name as AssetGroupItemName),
                })
            }
        }
        return ret;
    }
}

