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
    orgasm: [
        "Nya...Ny...NyaaAAaah!",
        "Mmmmh... MMmh... Hhhmmmm...",
        "Oooooh... Mmmmh... OooOOOOh!",
        "Mmmhnn... Nyhmm... Nyah!"
    ],
}

const setData = (key: string) => {
    let oldSettings = null;
    //@ts-ignore
    if (Player?.OnlineSettings?.BCResponsive?.data) {
        //@ts-ignore
        oldSettings = JSON.parse(LZString.decompressFromBase64(Player?.OnlineSettings?.BCResponsive?.data));
    }

    return oldSettings ? oldSettings?.[key] ? GuiResponses.validateInput(oldSettings?.[key]) : DefaultResponses[key] : DefaultResponses[key];
    //return oldSettings ? GuiResponses.ValidateInput(oldSettings?.[key]) : DefaultResponses[key];
}

export function getDefaultResponsesEntries() {

    return <ResponsesSettingsModel>{
        mainResponses: [
            //Boop
            {
                "name": "Pet",
                "group": "ItemNose",
                "responses": setData("boop"),
                "selfTrigger": false
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNose",
                "responses": setData("boop"),
                "selfTrigger": false
            },
            //Pain
            //Slap
            {
                "name": "Slap",
                "group": "ItemVulva",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemVulvaPiercings",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemBreast",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Slap",
                "group": "ItemHead",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            //Bite
            {
                "name": "Bite",
                "group": "ItemFeet",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemLegs",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemButt",
                "responses": setData("pain")
            },
            {
                "name": "Bite",
                "group": "ItemTorso",
                "responses": setData("pain")
            },
            {
                "name": "Bite",
                "group": "ItemTorso2",
                "responses": setData("pain")
            },
            {
                "name": "Bite",
                "group": "ItemNipples",
                "responses": setData("pain")
            },
            {
                "name": "Bite",
                "group": "ItemBreast",
                "responses": setData("pain")
            },
            {
                "name": "Bite",
                "group": "ItemArms",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemHands",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemNeck",
                "responses": setData("pain")
            },
            {
                "name": "Bite",
                "group": "ItemMouth",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Bite",
                "group": "ItemNose",
                "responses": setData("pain")
            },
            {
                "name": "Bite",
                "group": "ItemEars",
                "responses": setData("pain")
            },
            {
                "name": "Bite",
                "group": "ItemBoots",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            //Spank
            {
                "name": "Spank",
                "group": "ItemFeet",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemLegs",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemButt",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemPelvis",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemTorso",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemTorso2",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemArms",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemHands",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Spank",
                "group": "ItemBoots",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            //Kick
            {
                "name": "Kick",
                "group": "ItemFeet",
                "responses": setData("pain")
            },
            {
                "name": "Kick",
                "group": "ItemLegs",
                "responses": setData("pain")
            },
            {
                "name": "Kick",
                "group": "ItemVulva",
                "responses": setData("pain")
            },
            {
                "name": "Kick",
                "group": "ItemVulvaPiercings",
                "responses": setData("pain")
            },
            {
                "name": "Kick",
                "group": "ItemButt",
                "responses": setData("pain")
            },
            {
                "name": "Kick",
                "group": "ItemBoots",
                "responses": setData("pain")
            },
            //Pinch
            {
                "name": "Pinch",
                "group": "ItemButt",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemPelvis",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemNipples",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemArms",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemMouth",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemNose",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "Pinch",
                "group": "ItemEars",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            //Spank with Item
            {
                "name": "SpankItem",
                "group": "ItemFeet",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemLegs",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulva",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulvaPiercings",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemButt",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemPelvis",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemTorso",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemNipples",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBreast",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemArms",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBoots",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            //Shock with Item
            {
                "name": "SpankItem",
                "group": "ItemFeet",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemLegs",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulva",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemVulvaPiercings",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemButt",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemPelvis",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemTorso",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemNipples",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBreast",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemArms",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            {
                "name": "SpankItem",
                "group": "ItemBoots",
                "responses": setData("pain"),
                "selfTrigger": true
            },
            //LSCG_SharkBite
            {
                "name": "LSCG_SharkBite",
                "group": "ItemFeet",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemLegs",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemButt",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemTorso",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNipples",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemBreast",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemArms",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemHands",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemNeck",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemEars",
                "responses": setData("pain")
            },
            {
                "name": "LSCG_SharkBite",
                "group": "ItemBoots",
                "responses": setData("pain")
            },
            //Tickle
            {
                "name": "Tickle",
                "group": "ItemFeet",
                "responses": setData("tickle")
            },
            {
                "name": "Tickle",
                "group": "ItemLegs",
                "responses": setData("tickle")
            },
            {
                "name": "Tickle",
                "group": "ItemPelvis",
                "responses": setData("tickle")
            },
            {
                "name": "Tickle",
                "group": "ItemTorso",
                "responses": setData("tickle")
            },
            {
                "name": "Tickle",
                "group": "ItemTorso2",
                "responses": setData("tickle")
            },
            {
                "name": "Tickle",
                "group": "ItemBreast",
                "responses": setData("tickle")
            },
            {
                "name": "Tickle",
                "group": "ItemArms",
                "responses": setData("tickle")
            },
            {
                "name": "Tickle",
                "group": "ItemNeck",
                "responses": setData("tickle")
            },
            {
                "name": "Tickle",
                "group": "ItemBoots",
                "responses": setData("tickle")
            },
            //Tickle with Item
            {
                "name": "TickleItem",
                "group": "ItemFeet",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemLegs",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemVulva",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemVulvaPiercings",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemButt",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemPelvis",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemTorso",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemNipples",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemBreast",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemArms",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemNeck",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemMouth",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemNose",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemHood",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemEars",
                "responses": setData("tickle")
            },
            {
                "name": "TickleItem",
                "group": "ItemBoots",
                "responses": setData("tickle")
            },
        ], extraResponses: {
            low: setData("low"),
            light: setData("light"),
            medium: setData("medium"),
            hot: setData("hot"),
            orgasm: setData("orgasm")
        }
    };
}