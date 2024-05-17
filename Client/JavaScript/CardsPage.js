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
        Email: getCookieFromStorage('Email')
    })
    .then(response => {
        if (response.Result.length === 0)
        {
            localStorage.setItem("Data", "");
            document.getElementById("loader").style.display = "none";
            document.getElementById("empty").style.display = "flex";
        }
        else {
            setCurrentCard(0);
            let first = true;
            let data = localStorageJSON("Data");
            let current = 0
            var controls = {
                NXT: document.getElementById("next"),
                PREV: document.getElementById("previous")
            } 
            controls.NXT.addEventListener("click", () => {
                if (current < (data.length - 1)) {
                    current++;
                } else {
                    current = 0;
                }
                setCurrentCard(current);
            })
            controls.PREV.addEventListener("click", () => {
                if (first) {
                    current = 0;
                    first = false;
                } else if (!current <= 0) {
                    current--;
                } else {
                    current = (data.length - 1);
                }
                setCurrentCard(current);
            })
            localStorage.setItem("Data", addToLocalStorage(response.Result))
            document.getElementById("loader").style.display = "none";
            container.style.display = "flex";
        }
    })
    .catch(error => console.error('Error : ', error))
    let newCard = document.getElementById("cardAddNew");
    newCard.addEventListener("click", () => {
        window.location.href = "/cards/new";
    })
})

function addToLocalStorage(data)
{
    if (typeof data != "string") {
        data = JSON.stringify(data);
    }
    return data;
}

function localStorageJSON(key) {
    let data = localStorage.getItem(key);
    return JSON.parse(data);
}

function setCurrentCard(index)
{
    let container = document.getElementById("container")
    let card = document.getElementById("card");
    card.style.display = "none";
    container.style.display = "none";
    let loader = document.getElementById("loader");
    loader.style.display = "flex";
    let data = localStorageJSON("Data")[index];
    var buffers = {
        Number: document.getElementById("cardnumber"),
        FROM: document.getElementById("from"),
        TO: document.getElementById("to")
    }
    buffers.Number.innerText = data["Card Number"]
    buffers.FROM.innerText = data["Valid From"]
    buffers.TO.innerText = data["Valid Till"]
    var flags = {
        ENCRYPT: document.getElementById("encrypted"),
        CVV: document.getElementById("cvv"),
        VERIFY: document.getElementById("verify"),
        SHARED: document.getElementById("shared")
    }
    const cardFlags = data["Card Flags"]
    if (cardFlags["CVV"] === false) {
        flags.CVV.style.display = "none";
    } else {
        flags.CVV.style.display = "block";
    }
    if (cardFlags["Verified"] === false) {
        flags.VERIFY.style.display = "none";
    } else {
        flags.VERIFY.style.display = "block";
    }
    if (cardFlags["Encrypted"] === false) {
        flags.ENCRYPT.style.display = "none";
    } else {
        flags.ENCRYPT.style.display = "block";
    }
    if (data["Card Owners"].length == 1) {
        flags.SHARED.style.display = "block"
    } else {
        flags.SHARED.style.display = "none"
    }
    console.log((cardFlags));
    loader.style.display = "none";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    container.style.display = "flex";
}