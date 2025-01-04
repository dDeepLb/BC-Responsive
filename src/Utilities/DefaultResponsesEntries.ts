import { ResponsesSettingsModel } from '../Models/Responses';
type DefaultResponses = {
  [key: string]: string[];
};
const DefaultResponses: DefaultResponses = {
  pain: ['Aie!', 'Aoouch!', 'Aaaaie!', 'Ouch', 'Aow'],
  tickle: ['Hahaha!', 'Mmmmhahaha!', 'Muhahah...', 'Ha!Ha!'],
  boop: ['Eek!', 'Beep!', 'Aww..'],

  low: ['', '', 'mh', '♥oh♥', 'ah', '...♥'],
  light: ['ah♥', 'Aah!', 'mh', 'oh!♥', 'mh♥'],
  medium: ['mm', 'aaaah', 'Mm.. Ah♥'],
  hot: ['nh... ah♥', 'Oooh', 'mmmmmh!', 'HaaA♥'],
  orgasm: ['Mh...Mn...HaaAAaah!', 'Mmmmh... MMmh... Hhhmmmm...', 'Oooooh... Mmmmh... OooOOOOh!', 'Mmmhnn... Nyhmm... aah!']
};

const setData = (key: string) => {
  let oldSettings = undefined;
  
  //@ts-expect-error: Deprecated property
  if (Player?.OnlineSettings?.['BCResponsive']?.data) {
    //@ts-expect-error: Deprecated property
    const decompressed = LZString.decompressFromBase64(Player.OnlineSettings['BCResponsive'].data);
    if (!decompressed) return DefaultResponses[key];
    
    oldSettings = JSON.parse(decompressed);

    return oldSettings?.[key] ? oldSettings[key] : DefaultResponses[key];
  }

  return DefaultResponses[key];
};

export function getDefaultResponsesEntries() {
  return <ResponsesSettingsModel>[{}];
}
