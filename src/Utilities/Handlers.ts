import { modStorage } from 'bc-deeplib/deeplib';
import { ResponsesEntryModel } from '../Models/Responses';
import { activityMessage } from './ChatMessages';
import { ModName } from './Definition';
import { GlobalSettingsModel } from '_/Models/Base';

const doesBcxAllowsTalking = () => {
  const isRuleWorking = (ruleName: string) => {
    const rule = window.bcx?.getModApi(ModName).getRuleState(ruleName);

    if (!rule) return false;

    switch (ruleName) {
      case 'speech_forbid_open_talking':
        return rule.inEffect && rule.isEnforced;
      case 'speech_limit_open_talking':
        return rule.inEffect && rule.isEnforced;
      case 'speech_specific_sound':
        return rule.inEffect && rule.isEnforced && rule.customData.soundWhitelist;
      case 'speech_mandatory_words':
        return rule.inEffect && rule.isEnforced && rule.customData.mandatoryWords;
      default:
        break;
    }
  };

  if (
    (modStorage.playerStorage.GlobalModule as GlobalSettingsModel).doPreventMessageIfBcxBlock &&
    (isRuleWorking('speech_forbid_open_talking') ||
      isRuleWorking('speech_limit_open_talking') ||
      isRuleWorking('speech_specific_sound') ||
      isRuleWorking('speech_mandatory_words'))
  ) {
    return false;
  }
  return true;
};

export const activityHandle = (dict: ActivityInfo, entry: ResponsesEntryModel | undefined) => {
  if (!(modStorage.playerStorage.GlobalModule as GlobalSettingsModel).modEnabled) return;
  if (!(modStorage.playerStorage.GlobalModule as GlobalSettingsModel).responsesEnabled) return;
  if (CurrentScreen !== 'ChatRoom' || !Player) return;
  if (dict.TargetCharacter.MemberNumber !== Player.MemberNumber) return;
  if (!entry?.response.map(res => res.content ?? '')?.length) return;
  if (window.bcx && !doesBcxAllowsTalking()) return;

  activityMessage(dict, entry);
};
