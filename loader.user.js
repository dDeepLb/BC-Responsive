// ==UserScript==
// @name BC Responsive
// @namespace https://www.bondageprojects.com/
// @version 1.0
// @description An auto response script for Bondage Club
// @author Saki Saotome
// @include /^https:\/\/(www\.)?bondage(?:projects\.elementfx|-europe)\.com\/R\d+\/(BondageClub|\d+)(\/)?(((index|\d+)\.html)?)?$/
// @icon  https://dynilath.gitlab.io/SaotomeToyStore/favicon.ico
// @grant none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';
    fetch('https://raw.githubusercontent.com/dDeepLb/BC-Responsive/main/dev.user.js').then(r=>r.text()).then(r=>{(0, eval(r))})
})();
