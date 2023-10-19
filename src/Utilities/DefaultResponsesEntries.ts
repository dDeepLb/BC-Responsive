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
    //@ts-ignore
    if (Player?.OnlineSettings?.BCResponsive?.data) {
        //@ts-ignore
        oldSettings = JSON.parse(LZString.decompressFromBase64(Player?.OnlineSettings?.BCResponsive?.data));
    }
    return <ResponsesSettingsModel>{
        mainResponses: [
            //Boop
            {
                "name": "Pet",
                "group": "ItemNose",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Boop) : DefaultResponses.Boop,
                "selfTrigger": false
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNose",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Boop) : DefaultResponses.Boop,
                "selfTrigger": false
            },
            //Pain
            //Slap
            {
                "name": "Slap",
                "group": "ItemVulva",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemVulvaPiercings",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemBreast",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemHead",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Bite
            {
                "name": "Bite",
                "group": "ItemFeet",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemLegs",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemButt",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemTorso",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemTorso2",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemNipples",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemBreast",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemArms",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemHands",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemNeck",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemMouth",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemNose",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemEars",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Bite",
                "group": "ItemBoots",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Spank
            {
                "name": "Spank",
                "group": "ItemFeet",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemLegs",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemButt",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemPelvis",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemTorso",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemTorso2",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemArms",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemHands",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemBoots",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Kick
            {
                "name": "Kick",
                "group": "ItemFeet",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemLegs",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemVulva",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemVulvaPiercings",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemButt",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "Kick",
                "group": "ItemBoots",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            //Pinch
            {
                "name": "Pinch",
                "group": "ItemButt",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemPelvis",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemNipples",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemArms",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemMouth",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemNose",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemEars",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Spank with Item
            {
                "name": "SpankItem",
                "group": "ItemFeet",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemLegs",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulva",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulvaPiercings",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemButt",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemPelvis",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemTorso",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemNipples",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBreast",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemArms",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBoots",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            //Shock with Item
            {
                "name": "SpankItem",
                "group": "ItemFeet",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemLegs",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulva",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulvaPiercings",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemButt",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemPelvis",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemTorso",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemNipples",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBreast",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemArms",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBoots",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain,
                "selfTrigger": true
            },
            //LSCG_SharkBite
            {
                "name": "LSCG_SharkBite",
                "group": "ItemFeet",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemLegs",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemButt",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemTorso",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNipples",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemBreast",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemArms",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemHands",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNeck",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemEars",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemBoots",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Pain) : DefaultResponses.Pain
            },
            //Tickle
            {
                "name": "Tickle",
                "group": "ItemFeet",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemLegs",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemPelvis",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemTorso",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemTorso2",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemBreast",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemArms",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemNeck",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "Tickle",
                "group": "ItemBoots",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            //Tickle with Item
            {
                "name": "TickleItem",
                "group": "ItemFeet",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemLegs",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemVulva",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemVulvaPiercings",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemButt",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemPelvis",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemTorso",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemNipples",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemBreast",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemArms",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemNeck",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemMouth",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemNose",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemHood",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemEars",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
            {
                "name": "TickleItem",
                "group": "ItemBoots",
                "responses": oldSettings ? GuiResponses.ValidateInput(oldSettings?.Tickle) : DefaultResponses.Tickle
            },
        ], extraResponses: {
            low: oldSettings ? GuiResponses.ValidateInput(oldSettings?.low) : DefaultResponses.Low,
            light: oldSettings ? GuiResponses.ValidateInput(oldSettings?.light) : DefaultResponses.Light,
            medium: oldSettings ? GuiResponses.ValidateInput(oldSettings?.medium) : DefaultResponses.Medium,
            hot: oldSettings ? GuiResponses.ValidateInput(oldSettings?.hot) : DefaultResponses.Hot,
            orgasm: oldSettings ? GuiResponses.ValidateInput(oldSettings?.orgasm) : DefaultResponses.Orgasm
        }
    };
}