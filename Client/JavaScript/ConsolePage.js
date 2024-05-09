import {
    validateCookies,
    enforceCookiesPolicy,
    getCookieFromStorage
} from "/static/JavaScript/Cookies.js"
enforceCookiesPolicy()
validateCookies()
if ((getCookieFromStorage("Email") == "") || (getCookieFromStorage("UserState") == "false"))
{
    window.location.href = "/profile";
}