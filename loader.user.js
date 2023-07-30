// ==UserScript==
// @name BC Responsive
// @namespace https://www.bondageprojects.com/
// @version 0.4.5
// @description An auto response script for Bondage Club
// @author Saki Saotome, dDeepLb
// @include /^https:\/\/(www\.)?bondage(?:projects\.elementfx|-europe)\.com\/R\d+\/(BondageClub|\d+)(\/)?(((index|\d+)\.html)?)?$/
// @icon  https://dynilath.gitlab.io/SaotomeToyStore/favicon.ico

// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
    "use strict";
    if (typeof BCResponsive_Loaded === "undefined") {
        const script = document.createElement("script");
        script.src = `https://ddeeplb.github.io/BC-Responsive/main.js?v=${Date.now()}`;
        document.head.appendChild(script);
    }
})();
