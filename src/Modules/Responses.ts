import { BaseModule } from "../Base";
import { ActivityDeconstruct } from "../Utilities/ChatMessages";
import { ActivityHandle } from "../Utilities/Handles";
import { ResponsesEntryModel, ResponsesSettingsModel } from "../Settings/Models/Responses";
import { GuiResponses } from "../Settings/Responses";
import { Subscreen } from "../Settings/SettingDefinitions";
import { ConDebug } from "../Utilities/Console";
import { GetDefaultResponsesEntries } from "../Utilities/DefaultResponsesEntries";
import { GetCharacter } from "../Utilities/Other";
import { HOOK_PRIORITY, ModuleCategory, OnActivity } from "../Utilities/SDK";

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
            const dict = ActivityDeconstruct(metadata);
            let entry = this.GetResponsesEntry(dict?.ActivityName, dict?.ActivityGroup);
            const target = GetCharacter(dict?.TargetCharacter.MemberNumber);
            const source = GetCharacter(dict?.SourceCharacter.MemberNumber);

            ActivityHandle(entry, target, source)

            ConDebug(data, sender, msg, metadata);
        });
    }

    Run(): void {
    }

    GetResponsesEntry(actName: string | undefined, grpName: string | undefined): ResponsesEntryModel | undefined {
        return this.settings.mainResponses.find(a => a.name == actName && a.group == grpName);
    }
}

