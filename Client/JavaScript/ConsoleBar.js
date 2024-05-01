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
    const negativeValue = [null,"null",false,"false"];
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (negativeValue.includes(cookiesAccepted))
    {
        window.location.href = "/";
    }
    else if (getCookieFromStorage("UID") == "" || getCookieFromStorage("UserState") == "")
    {
        confirm("The Website Cookies Seems To Have Some Issues With It\n Click Continue / OK To Reset Them\n (You Maybe Logged Out)");
        window.location.href = "/";
    }
});

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