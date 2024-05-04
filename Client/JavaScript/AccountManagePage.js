document.addEventListener("DOMContentLoaded", () => {
    if (getCookieFromStorage("UserState") != "true")
    {
        window.location.href = "/";
    }
    loadAvatar("Gautham Krishna");
    var routingButton = document.getElementById("btn");
    routingButton.addEventListener("click", () => {
        window.location.href = "/profile";
    });
    var signOut = document.getElementById("logOut");
    signOut.addEventListener("click", () => {
        signOutUser();
    });
});

function loadAvatar(name)
{
    var profile = document.getElementById("userProfilePicture");
    profile.src = `https://api.dicebear.com/8.x/initials/svg?seed=${name}`
}

function signOutUser()
{
    resetCookies(["UID","Email","UserState"]);
    window.location.href = "/";
}

function resetCookies(cookieName)
{
    cookieName.forEach(function (element) {
        document.cookie = element + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    })
}

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