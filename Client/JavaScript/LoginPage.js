function specialShow(ID, CLASS)
{
    var x = document.getElementById(ID);
    if (x.innerText == "")
    {
        x.className = "hidden";
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
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var x = specialShow("notifier", "notifier");
    if (x === true)
    {
        setCookieToStorage("UserState", true, 128);
    }
});

function setCookieToStorage(cookieName, cookieValue, expirationDays)
{
    var time = new Date();
    time.setTime(time.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+time.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}