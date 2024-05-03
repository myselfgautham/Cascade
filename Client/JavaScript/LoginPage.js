function specialShow(ID, CLASS)
{
    var x = document.getElementById(ID);
    if (x.innerText == "")
    {
        x.className = "hidden";
        return false;
    }
    else if (x.innerText == "Sign In Completed Successfully")
    {
        x.style.color = "green";
        setTimeout(function() {
            window.location.href = "/profile"
        },1000);
        return true;
    }
    else
    {
        x.className = CLASS
        return false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var x = specialShow("notifier", "notifier");
    if (x === true)
    {
        setCookieToStorage("UserState", true, 128);
        completeRegister()
    }
    var email = document.getElementById("email")
    email.addEventListener("change", () => {
        console.log("Hello")
        if (email.value.length >= 6)
        {
            setCookieToStorage("Email",email.value,128);
        }
    })
});

function setCookieToStorage(cookieName, cookieValue, expirationDays)
{
    var time = new Date();
    time.setTime(time.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+time.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function completeRegister()
{
    var data = {
        UID: getCookieFromStorage("UID"),
        Email: getCookieFromStorage("Email")
    };
    fetch("/api/completeRegister", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("Error",error))
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