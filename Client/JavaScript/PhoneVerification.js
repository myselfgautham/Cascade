let OTP;

document.addEventListener("DOMContentLoaded", () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const port = urlParams.get("route");
    fetchPhone()
    var x = document.getElementById("next");
    var input = document.getElementById("buffer");
    x.addEventListener("click", () => {
        if (input.value == OTP)
        {
            window.location.href = `/${port}`;
        }
        else {
            var notifier = document.getElementById('note');
            notifier.innerText = "Incorrect OTP Try Again";
            notifier.style.display = "block";
        }
    })
})

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

function fetchPhone()
{
    fetch("/api/phone", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({UID: "waulXziPYcb9zefOZwch5U0zWFI3"})
    })
    .then(response => response.json())
    .then(data => {
        var x = document.getElementById("phone")
        x.innerText = data.Phone;
        OTP = data.OTP;
    })
    .catch(error => console.log("Error : ",error))
}