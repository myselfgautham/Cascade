import {
    validateCookies,
    enforceCookiesPolicy,
    getCookieFromStorage
} from "/static/JavaScript/Cookies.js"
import {fetchFlaskWithData} from "/static/JavaScript/FlaskAPI.js"
import {hide} from "/static/JavaScript/Server.js"
enforceCookiesPolicy()
validateCookies()
if ((getCookieFromStorage("Email") == "") || (getCookieFromStorage("UserState") == "false"))
{
    window.location.href = "/profile";
}
document.addEventListener("DOMContentLoaded", () => {
    fetchFlaskWithData("/api/user", {Email: getCookieFromStorage('Email')})
    .then(response => {
        if (response.Verified == true)
        {
            var userProfileImage = document.getElementById("user");
            var text = document.getElementById("text");
            text.innerHTML += `<br>${response.Name}`;
            userProfileImage.src = `https://api.dicebear.com/8.x/initials/svg?seed=${response.Name}`
            text.style.display = "block";
            var x = document.getElementById("close");
            userProfileImage.addEventListener("click", () => {
                document.getElementById("overlay").style.height = "100%";
                hide("header","header");
                hide("container","container");
            })
            x.addEventListener("click", () => {
                x.style.opacity = "0%"
                document.getElementById("overlay").style.height = "0%";
                hide("header","header");
                hide("container","container");
                setTimeout(() => {
                    x.style.opacity = "100%";
                },400);
            })
        }
        else {
            console.log(response.Verified)
            alert("It Appears That Your Account Is Not Verified As Per Our Servers\nIf You Think Thats A Mistake\nPlease Contact The Developer")
            window.location.href = "/"
        }
    })
})