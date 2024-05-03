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
    else if (getCookieFromStorage("UID") == "" || getCookieFromStorage("UserState") == "" || (getCookieFromStorage("Email") == "" & getCookieFromStorage("UserState") === "true"))
    {
        confirm("The Website Cookies Seems To Have Some Issues With It\nClick Continue / OK To Reset Them\n(You Maybe Logged Out)");
        setCookieToStorage("UserState","false",128);
        window.location.href = "/";
    }
    else if (negativeValue.includes(getCookieFromStorage("UserState")))
    {
        window.location.href = "/signup";
    }
    pingUserName()
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

function setCookieToStorage(cookieName, cookieValue, expirationDays)
{
    var time = new Date();
    time.setTime(time.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+time.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function pingUserName()
{
    fetch("/api/username", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Email: getCookieFromStorage("Email")})
    })
    .then(response => response.json())
    .then(data => changeTextConsole(data.Name))
    .catch(error => console.log("Error",error))
}

function changeTextConsole(text)
{
    var x = document.getElementById("textBox")
    x.innerHTML += text
}