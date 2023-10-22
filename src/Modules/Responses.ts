import { BaseModule } from "../Base/BaseModule";
import { activityDeconstruct } from "../Utilities/ChatMessages";
import { activityHandle } from "../Utilities/Handles";
import { ResponsesEntryModel, ResponsesSettingsModel } from "../Models/Responses";
import { GuiResponses } from "../Settings/Responses";
import { Subscreen } from "../Base/SettingDefinitions";
import { conDebug } from "../Utilities/Console";
import { getDefaultResponsesEntries } from "../Utilities/DefaultResponsesEntries";
import { getCharacter } from "../Utilities/Other";
import { HookPriority, ModuleCategory, onActivity } from "../Utilities/SDK";

export class ResponsesModule extends BaseModule {

    get settings(): ResponsesSettingsModel {
        return super.settings as ResponsesSettingsModel;
    }

    get settingsScreen(): Subscreen | null {
        return GuiResponses;
    }

    get defaultSettings() {
        return getDefaultResponsesEntries();
    }

    Load(): void {
        onActivity(HookPriority.Observe, ModuleCategory.Responses, (data, sender, msg, metadata) => {
            const dict = activityDeconstruct(metadata);
            let entry = this.getResponsesEntry(dict?.ActivityName, dict?.ActivityGroup);
            const target = getCharacter(dict?.TargetCharacter.MemberNumber);
            const source = getCharacter(dict?.SourceCharacter.MemberNumber);

            activityHandle(entry, target, source)

            conDebug(data, sender, msg, metadata);
        });
    }

    Run(): void {
    }

    getResponsesEntry(actName: string | undefined, grpName: string | undefined): ResponsesEntryModel | undefined {
        return this.settings.mainResponses.find(a => a.name == actName && a.group == grpName);
    }
}

