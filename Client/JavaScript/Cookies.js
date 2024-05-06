/*
An Extremely Simple Cookies Module
For The Simple Website
Developed By Gautham Krishna
*/

import { fetchFlaskAPIOneWay } from "/static/JavaScript/FlaskAPI.js";
import { cookies } from "/static/JavaScript/Server.js";

function getCookieFromStorage(cookieName)
{
    cookieName += "=";
    var localStorageCookies = decodeURIComponent(document.cookie);
    var cookieArray = localStorageCookies.split(";");
    for (var i = 0; i < cookieArray.length; i++)
    {
        var current = cookieArray[i];
        while (current.charAt(0) == ' ')
        {
            current = current.substring(1);
        }
        if (current.indexOf(cookieName) == 0)
        {
            return current.substring(cookieName.length, current.length);
        }
    }
    return "";
}

function setCookieToStorage(cookieName, cookieValue, expirationDays)
{
    var time = new Date();
    time.setTime(time.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+time.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function resetCookies(cookieName)
{
    cookieName.forEach(function (element) {
        document.cookie = element + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    })
}

function getCookiesState()
{
    var negativeValue = new Set([null,"null",false,"false",undefined]);
    var cookiesState = localStorage.getItem("cookiesAccepted");
    return !negativeValue.has(cookiesState);
}

function enforceCookiesPolicy()
{
    if (!getCookiesState())
    {
        window.location.href = "/policy";
    }
}

async function setBasicCookies()
{
    var data = await fetchFlaskAPIOneWay("/api/uid");
    setCookieToStorage("UID",data.UID,128);
    setCookieToStorage("UserState",false,128);
}

function validateCookies()
{
    for (let i = 0; i < cookies.length; i++)
    {
        if (getCookieFromStorage(cookies[i]) === "")
        {
            resetCookies(cookies);
            setBasicCookies()
            break;
        }
        else {
            continue;
        }
    }
}

export {
    getCookieFromStorage,
    getCookiesState,
    resetCookies,
    setCookieToStorage,
    enforceCookiesPolicy,
    setBasicCookies,
    validateCookies
};