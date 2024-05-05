/*
Validates All The Cookies On The System
And If Invalid Performs A Reset
*/

function getValidateFromFlask()
{
    fetch("/api/validate", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({UID: getCookieFromStorage("UID")})
    })
    .then (response => response.json())
    .then (process => {
        var first = true;
        if (process.Response === "Device Does Not Exist" && getCookieFromStorage("UserState") != "false" && getCookieFromStorage("Email") == "")
        {
            raiseAlert();
        }
        else if (process.Email != getCookieFromStorage("Email") && getCookieFromStorage("UserState") == "true" && getCookieFromStorage("Email") != "" && !first)
        {
            raiseAlert();
        }
        else if (process.UID != getCookieFromStorage("UID") && getCookieFromStorage("UserState") == "true" && getCookieFromStorage("UID") != "" && !first)
        {
            raiseAlert();
        }
        else
        {
            first = !first;
            console.log("Cookies Are Valid");
        }
    })
    .catch (error => console.log("Error : ",error))
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

function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
}

document.addEventListener("DOMContentLoaded", () => {
    if (getWidth() <= 300)
    {
        console.log("Incompatible Device");
    }
    else
    {
        const cookiesStatus = localStorage.getItem("cookiesAccepted");
        const negatives = ["null","undefined","false",null,false,undefined];
        if (negatives.includes(cookiesStatus))
        {
            window.location.href = "/";
        }
        else if (negatives.includes(getCookieFromStorage("UserState")))
        {
            console.log("User Not Registered")
        }
        else
        {
            getValidateFromFlask();
        }
    }
})

function resetCookies(cookieName)
{
    cookieName.forEach(function (element) {
        document.cookie = element + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    })
}

function raiseAlert()
{
    var x = confirm("The Cookies Stored On Your Device\nSeems To Be Invalid As Per Our Server\nThis Requires A Reset Of Cookies\nClick Ok / Continue To Reset Them");
    if (x === true)
    {
        console.log('Resetting Cookies');
        resetCookies(["UID","UserState","Email"]);
        console.log("Reset Complete")
    }
    else {
        console.log("User Declined Process");
    }
    window.location.href = "/";
}