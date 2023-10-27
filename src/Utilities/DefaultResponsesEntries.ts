import { ResponsesSettingsModel } from "../Models/Responses";
import { GuiResponses } from "../Settings/Responses";

const DefaultResponses = {
  pain: ["Aie!", "Aoouch!", "Aaaaie!", "Ouch", "Aow"],
  tickle: ["Hahaha!", "Mmmmhahaha!", "Muhahah...", "Ha!Ha!"],
  boop: ["Eek!", "Beep!", "Aww.."],

  low: ["", "", "mh", "♥oh♥", "ah", "...♥"],
  light: ["nyah♥", "Aah!", "mh", "oh!♥", "mh♥"],
  medium: ["mm", "aaaah", "nyAh♥"],
  hot: ["n... Nyah♥", "Oooh", "mmmmmh!", "NYyaaA♥"],
  orgasm: ["Nya...Ny...NyaaAAaah!", "Mmmmh... MMmh... Hhhmmmm...", "Oooooh... Mmmmh... OooOOOOh!", "Mmmhnn... Nyhmm... Nyah!"],
};

const setData = (key: string) => {
  let oldSettings = null;
  //@ts-ignore
  if (Player?.OnlineSettings?.BCResponsive?.data) {
    oldSettings = JSON.parse(
      //@ts-ignore
      LZString.decompressFromBase64(Player?.OnlineSettings?.BCResponsive?.data)
    );
  }

  return oldSettings ? (oldSettings?.[key] ? GuiResponses.validateInput(oldSettings?.[key]) : DefaultResponses[key]) : DefaultResponses[key];
  //return oldSettings ? GuiResponses.ValidateInput(oldSettings?.[key]) : DefaultResponses[key];
};

export function getDefaultResponsesEntries() {
  return <ResponsesSettingsModel>{
    mainResponses: [
      //Boop
      {
        name: "Pet",
        group: "ItemNose",
        responses: setData("boop"),
        selfTrigger: false,
      },
      {
        name: "LSCG_SharkBite",
        group: "ItemNose",
        responses: setData("boop"),
        selfTrigger: false,
      },
      //Pain
      //Slap
      {
        name: "Slap",
        group: ["ItemVulva", "ItemVulvaPiercings", "ItemBreast", "ItemHead"],
        responses: setData("pain"),
        selfTrigger: true,
      },
      //Bite
      {
        name: "Bite",
        group: [
          "ItemFeet",
          "ItemLegs",
          "ItemButt",
          "ItemTorso",
          "ItemTorso2",
          "ItemNipples",
          "ItemBreast",
          "ItemArms",
          "ItemHands",
          "ItemNeck",
          "ItemMouth",
          "ItemNose",
          "ItemEars",
          "ItemBoots",
        ],
        responses: setData("pain"),
        selfTrigger: true,
      },
      //Spank
      {
        name: "Spank",
        group: ["ItemFeet", "ItemLegs", "ItemButt", "ItemPelvis", "ItemTorso", "ItemTorso2", "ItemArms", "ItemHands", "ItemBoots"],
        responses: setData("pain"),
        selfTrigger: true,
      },
      //Kick
      {
        name: "Kick",
        group: ["ItemFeet", "ItemLegs", "ItemVulva", "ItemVulvaPiercings", "ItemButt", "ItemBoots"],
        responses: setData("pain"),
      },
      //Pinch
      {
        name: "Pinch",
        group: ["ItemButt", "ItemPelvis", "ItemNipples", "ItemArms", "ItemMouth", "ItemNose", "ItemEars"],
        responses: setData("pain"),
        selfTrigger: true,
      },
      //Spank with Item
      {
        name: "SpankItem",
        group: [
          "ItemFeet",
          "ItemLegs",
          "ItemVulva",
          "ItemVulvaPiercings",
          "ItemButt",
          "ItemPelvis",
          "ItemTorso",
          "ItemNipples",
          "ItemBreast",
          "ItemArms",
          "ItemBoots",
        ],
        responses: setData("pain"),
        selfTrigger: true,
      },
      //Shock with Item
      {
        name: "ShockItem",
        group: [
          "ItemFeet",
          "ItemLegs",
          "ItemVulva",
          "ItemVulvaPiercings",
          "ItemButt",
          "ItemPelvis",
          "ItemTorso",
          "ItemNipples",
          "ItemBreast",
          "ItemArms",
          "ItemNeck",
          "ItemNeckAccessories",
          "ItemBoots",
        ],
        responses: setData("pain"),
        selfTrigger: true,
      },
      //LSCG_SharkBite
      {
        name: "LSCG_SharkBite",
        group: [
          "ItemFeet",
          "ItemLegs",
          "ItemButt",
          "ItemTorso",
          "ItemNipples",
          "ItemBreast",
          "ItemArms",
          "ItemHands",
          "ItemNeck",
          "ItemEars",
          "ItemBoots",
        ],
        responses: setData("pain"),
      },
      //Tickle
      {
        name: "Tickle",
        group: ["ItemFeet", "ItemLegs", "ItemPelvis", "ItemTorso", "ItemTorso2", "ItemBreast", "ItemArms", "ItemNeck", "ItemBoots"],
        responses: setData("tickle"),
      },
      //Tickle with Item
      {
        name: "TickleItem",
        group: [
          "ItemFeet",
          "ItemLegs",
          "ItemVulva",
          "ItemVulvaPiercings",
          "ItemButt",
          "ItemPelvis",
          "ItemTorso",
          "ItemNipples",
          "ItemBreast",
          "ItemArms",
          "ItemNeck",
          "ItemMouth",
          "ItemNose",
          "ItemHood",
          "ItemEars",
          "ItemBoots",
        ],
        responses: setData("tickle"),
      },
    ],
    extraResponses: {
      low: setData("low"),
      light: setData("light"),
      medium: setData("medium"),
      hot: setData("hot"),
      orgasm: setData("orgasm"),
    },
  };
}
