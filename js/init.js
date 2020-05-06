"use strict";
/*-----------------------------------------------------------------------------
constants
--------------------------------------------------------------------------------*/
let manager;

let isLocal = false;
const secToWaitBetweenRound = 4; // Audio-lenght: 4Sec



/*-----------------------------------------------------------------------------
Init
--------------------------------------------------------------------------------*/
if (/Edge/.test(navigator.userAgent)) {
    alert("You are using a shity browser, here is a better one...");
    window.location.href = 'https://www.mozilla.org/de/firefox/new/';
}
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.querySelector("#goTop").style.display = "initial";
    } else {
        document.querySelector("#goTop").style.display = "none";
    }
};

document.addEventListener('DOMContentLoaded', function () {
    manager = new MainManager();
});