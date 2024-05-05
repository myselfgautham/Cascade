document.addEventListener("DOMContentLoaded", () => {
    if (getCookieFromStorage("UserState") != "true")
    {
        window.location.href = "/";
    }
    pingUserName();
    var routingButton = document.getElementById("btn");
    routingButton.addEventListener("click", () => {
        window.location.href = "/profile";
    });
    var signOut = document.getElementById("logOut");
    signOut.addEventListener("click", () => {
        signOutUser();
    });
    var reset = document.getElementById('resetPassword');
    reset.addEventListener("click", () => {
        resetPassword();
    })
});

function loadAvatar(name)
{
    var profile = document.getElementById("userProfilePicture");
    profile.src = `https://api.dicebear.com/8.x/initials/svg?seed=${name}`
}

function signOutUser()
{
    fetch("/api/signout", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({UID: getCookieFromStorage("UID")})
    })
    .then(response => response.json())
    .then(data => {
        data = data.Response;
        if (data === "Success")
        {
            var x = confirm("Are You Sure You Want To Sign Out\nYou Will Have To Login Again");
            if (x) {
                resetCookies(["UID","Email","UserState"]);
                window.location.href = "/";
            }
        }
        else {
            console.log("Failed To Sign Out User!")
        }
    })
    .catch(error => console.log("Error : ",error))
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
    .then(data => {
        var x = document.getElementById("userName");
        x.innerHTML = data.Name;
        loadAvatar(data.Name);
    })
    .catch(error => console.log("Error",error))
}

function resetPassword()
{
    fetch("/api/reset", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({Email : getCookieFromStorage("Email")})
    })
    .then(response => response.json())
    .then(data => {
        if (data.Response === "Success")
        {
            setTimeout(function() {
                window.location.href = data.Link;
            },500);
        }
        else
        {
            alert("Password Reset Failed\nIf Error Persists Then\nPlease Contact Support");
        }
    })
    .catch(error => console.log("Error : ",error))
}