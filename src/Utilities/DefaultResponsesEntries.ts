import { ResponsesSettingsModel } from "../Settings/Models/Responses";
import { GuiResponses } from "../Settings/Responses";

type DefaultResponses = {
    Pain: string[],
    Tickle: string[],
    Boop: string[],

    Low: string[],
    Light: string[],
    Medium: string[],
    Hot: string[],
    Orgasm: string[],
}

const DefaultResponses = {
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

export function GetDefaultResponsesEntries() {
    let oldSettings = null;
    if (Player?.OnlineSettings?.BCResponsive?.data) {
        oldSettings = JSON.parse(LZString.decompressFromBase64(Player.OnlineSettings.BCResponsive.data));
    }
    return <ResponsesSettingsModel>{
        mainResponses: [
            //Boop
            {
                "name": "Pet",
                "group": "ItemNose",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings?.Boop : "") ?? DefaultResponses.Boop,
                "selfTrigger": false
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNose",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings?.Boop : "") ?? DefaultResponses.Boop,
                "selfTrigger": false
            },
            //Pain
            //Slap
            {
                "name": "Slap",
                "group": "ItemVulva",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemVulvaPiercings",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemBreast",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemHead",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Bite
            {
                "name": "Bite",
                "group": "ItemFeet",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemLegs",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemButt",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemTorso",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemTorso2",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemNipples",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemBreast",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemArms",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemHands",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemNeck",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemMouth",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemNose",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemEars",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemBoots",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Spank
            {
                "name": "Spank",
                "group": "ItemFeet",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemLegs",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemButt",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemPelvis",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemTorso",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemTorso2",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemArms",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemHands",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemBoots",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Kick
            {
                "name": "Kick",
                "group": "ItemFeet",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemLegs",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemVulva",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemVulvaPiercings",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemButt",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemBoots",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            //Pinch
            {
                "name": "Pinch",
                "group": "ItemButt",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemPelvis",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemNipples",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemArms",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemMouth",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemNose",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemEars",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Spank with Item
            {
                "name": "SpankItem",
                "group": "ItemFeet",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemLegs",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulva",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulvaPiercings",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemButt",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemPelvis",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemTorso",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemNipples",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBreast",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemArms",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBoots",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Shock with Item
            {
                "name": "SpankItem",
                "group": "ItemFeet",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemLegs",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulva",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulvaPiercings",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemButt",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemPelvis",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemTorso",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemNipples",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBreast",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemArms",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBoots",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain,
                "selfTrigger": true
            },
            //LSCG_SharkBite
            {
                "name": "LSCG_SharkBite",
                "group": "ItemFeet",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemLegs",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemButt",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemTorso",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNipples",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemBreast",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemArms",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemHands",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNeck",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemEars",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemBoots",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Pain : "") ?? DefaultResponses.Pain
            },
            //Tickle
            {
                "name": "Tickle",
                "group": "ItemFeet",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemLegs",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemPelvis",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemTorso",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemTorso2",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemBreast",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemArms",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemNeck",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemBoots",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            //Tickle with Item
            {
                "name": "TickleItem",
                "group": "ItemFeet",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemLegs",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemVulva",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemVulvaPiercings",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemButt",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemPelvis",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemTorso",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemNipples",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemBreast",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemArms",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemNeck",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemMouth",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemNose",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemHood",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemEars",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemBoots",
                "responses": GuiResponses.ValidateInput(oldSettings ? oldSettings.Tickle : "") ?? DefaultResponses.Tickle
            },
        ], extraResponses: {
            low: GuiResponses.ValidateInput(oldSettings?.low) ?? DefaultResponses.Low,
            light: GuiResponses.ValidateInput(oldSettings?.light) ?? DefaultResponses.Light,
            medium: GuiResponses.ValidateInput(oldSettings?.medium) ?? DefaultResponses.Medium,
            hot: GuiResponses.ValidateInput(oldSettings?.hot) ?? DefaultResponses.Hot,
            orgasm: GuiResponses.ValidateInput(oldSettings?.orgasm) ?? DefaultResponses.Orgasm
        }
    };
}