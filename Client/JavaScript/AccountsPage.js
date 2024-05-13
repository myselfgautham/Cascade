import {fetchFlaskWithData} from "/static/JavaScript/FlaskAPI.js"
import {
    getCookieFromStorage,
    resetCookies
} from "/static/JavaScript/Cookies.js";
import { cookies } from "/static/JavaScript/Server.js";
document.addEventListener("DOMContentLoaded", () => {
    var back = document.getElementById("back")
    var avatar = document.getElementById("avatar")
    var logout = document.getElementById("lst");
    back.addEventListener("click", () => {
        window.location.href = "/dashboard";
    })
    avatar.src = "https://api.dicebear.com/8.x/initials/svg?seed=Gautham Krishna";
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
})