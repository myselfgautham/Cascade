import {fetchFlaskWithData} from "/static/JavaScript/FlaskAPI.js"
import {
    getCookieFromStorage,
    resetCookies
} from "/static/JavaScript/Cookies.js";
import { cookies } from "/static/JavaScript/Server.js";
document.addEventListener("DOMContentLoaded", () => {
    let devices = document.getElementById("devices");
    let cards = document.getElementById("cards");
    let vendors = document.getElementById("vendors")
    devices.innerText = 0;
    cards.innerText = 0;
    vendors.innerText = 0;
    fetchFlaskWithData("/api/user", {Email: getCookieFromStorage('Email')})
    .then(response => {
        if (response.Verified == true)
        {
            let loader = document.getElementById("wrapper");
            let container = document.getElementById("container");
            var back = document.getElementById("back")
            var avatar = document.getElementById("avatar")
            var logout = document.getElementById("logout");
            var username = document.getElementById("text")
            back.addEventListener("click", () => {
                window.location.href = "/dashboard";
            })
            logout.addEventListener("click", () => {
                fetchFlaskWithData("/api/logout", {UID: getCookieFromStorage("UID")})
                .then(response => {
                    if (response.Response == "True") {
                        resetCookies(cookies);
                        window.location.href = "/";
                    }
                })
                .catch(error => console.error("Error : ",error))
            })
            username.innerText = response.Name;
            devices.innerText = response.Devices;
            avatar.src = `https://api.dicebear.com/8.x/initials/svg?seed=${response.Name}`;
            loader.style.display = "none";
            container.style.display = "flex";
        }
        else {
            alert("It Appears That Your Account Is Not Verified As Per Our Servers\nIf You Think Thats A Mistake\nPlease Contact The Developer")
            window.location.href = "/";
        }
    })
})