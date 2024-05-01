// Hamburger Menu
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
});

// Cookies Check For Almost All Pages
document.addEventListener("DOMContentLoaded", () => {
    // Cookies Accept Routing
    const cookiesStatus = localStorage.getItem("cookiesAccepted");
    const negatives = new Set([null,"null",false,"false"]);
    if (negatives.has(cookiesStatus))
    {
        window.location.href = "/";
    }
    // Cookies Setting If Not Set
    if (getCookieFromStorage("UID") == "" || getCookieFromStorage("UserState") == "")
    {
        FlaskAllSet();
    }
    else {
        console.log("Device Local Data Looks All Good");
    }
});

// Flask Cookies Set
async function FlaskAllSet()
{
    try
    {
        const response = await fetch('/api/getNewUID');
        if (!response.ok)
        {
            throw new Error('Bad Network Response');
        }
        const data = await response.json();
        setCookieToStorage("UID",data.UID,128);
        setCookieToStorage("UserState","false",128);
    }
    catch (error)
    {
        console.error('There Was A Problem With The Request :', error);
    }
    finally
    {
        window.location.reload();
    }
}

// Get Cookies From Storage
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

// Set Cookie To Storage
function setCookieToStorage(cookieName, cookieValue, expirationDays)
{
    var time = new Date();
    time.setTime(time.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+time.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}