// Enforce Website Cookies Policy
function enforceCookiesPolicy()
{
    document.addEventListener("DOMContentLoaded", () => {
        const negativeValue = new Set([null,"null",false,"false"]);
        const cookiesAccepted = localStorage.getItem("cookiesAccepted");
        if (negativeValue.has(cookiesAccepted))
        {
            window.location.href = "/";
        }
    });
}

// Accept Cookies Call
function acceptWebsiteCookies()
{
    localStorage.setItem("cookiesAccepted", "true");
    window.location.reload();
}

// Get Cookies From Storage
function getCookieFromStorage(cookieName: string)
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

// Set Cookie To Storage
function setCookieToStorage(cookieName: string, cookieValue: string, expirationDays: number)
{
    var time = new Date();
    time.setTime(time.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+time.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Get Cookies As HashMap
function getCookieAsObject()
{
    var cookies = document.cookie.split(';');
    var cookieObject = {};
    cookies.forEach(function(cookie) {
      var parts = cookie.split('=');
      var key = parts[0].trim();
      var value = decodeURIComponent(parts[1]);
      cookieObject[key] = value;
    });  
    return cookieObject;
}

// Exports
export {enforceCookiesPolicy, acceptWebsiteCookies, getCookieFromStorage, setCookieToStorage, getCookieAsObject}