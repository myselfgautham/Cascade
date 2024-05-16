import {fetchFlaskWithData} from "/static/JavaScript/FlaskAPI.js"
import {
    getCookieFromStorage,
    validateCookies,
    enforceCookiesPolicy
} from "/static/JavaScript/Cookies.js"
enforceCookiesPolicy();
validateCookies();
document.addEventListener("DOMContentLoaded", () => {
    let container = document.getElementById("container");
    let back = document.getElementById("back");
    container.style.display = "none";
    back.addEventListener("click", () => {
        window.location.href = "/profile";
    })
    fetchFlaskWithData("/api/cards", {
        Email: getCookieFromStorage('Email'),
        Device: getCookieFromStorage("UID")
    })
    .then(response => {
        if (Object.keys(response).length === 0 && response.constructor === Object)
        {
            document.getElementById("loader").style.display = "none";
            document.getElementById("empty").style.display = "flex";
        }
        else {
            document.getElementById("loader").style.display = "none";
            container.style.display = "flex";
        }
    })
    .catch(error => console.error('Error : ', error))
    let previous = document.getElementById("previous");
    let next = document.getElementById("next");
})