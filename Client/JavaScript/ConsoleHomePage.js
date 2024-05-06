import {
    enforceCookiesPolicy,
    validateCookies 
} 
from "/static/JavaScript/Cookies.js";

function openNav()
{
    document.getElementById("navigationOverlay").style.height = "100%";
}

function closeNav()
{
    document.getElementById("cls").className = "hidden";
    document.getElementById("navigationOverlay").style.height = "0%";

    setTimeout(function() {
        document.getElementById("cls").className = "closebtn";
    },400)
}

document.addEventListener("DOMContentLoaded", () => {
    enforceCookiesPolicy();
    validateCookies();
})