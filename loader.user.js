// ==UserScript==
// @name BC Responsive
// @namespace https://www.bondageprojects.com/
// @version 0.4.9
// @description An auto response script for Bondage Club
// @author Saki Saotome, dDeepLb
// @include /^https:\/\/(www\.)?bondage(?:projects\.elementfx|-europe)\.com\/R\d+\/(BondageClub|\d+)(\/)?(((index|\d+)\.html)?)?$/
// @icon  https://user-images.githubusercontent.com/71733861/254577970-83fb14ab-79af-46b4-9490-ea8c85dc4097.png

// @grant none
// @run-at document-end
// ==/UserScript==

(function () {
    "use strict";
    const script = document.createElement("script");
    script.type = "module";
    script.setAttribute("crossorigin", "anonymous");
    script.src = `https://ddeeplb.github.io/BC-Responsive/main.js?v=${Date.now()}`;
    document.head.appendChild(script);
})();
