import {setFetchLocation} from "/static/JavaScript/Globals.js";

// Reduction Of CLS Time
window.addEventListener("load", () => {
    localStorage.setItem("Fetch Location", "/");
    let clsSaves = [
        document.getElementById("links")
    ]
    clsSaves.forEach((li) => {
        li.style.visibility = "visible";
    })
    setFetchLocation();
    setTimeout(() => {
        if (localStorage.getItem("Fetch Location") === "/")
            window.location.reload()
        else
            console.log("Fetch Location Set Completed");
    }, 2000)
})

// Document Object Model Content Load
document.addEventListener("DOMContentLoaded", () => {
    // Cookies Accepted Checking And Overlay
    if (localStorage.getItem("cookiesAccepted") === null)
    {
        let overlay = document.getElementById("overlay");
        overlay.style.display = "flex";
        overlay.style.visibility = "visible";
        let cookiesAccepted = document.getElementById("accept");
        cookiesAccepted.addEventListener("click", () => {
            localStorage.setItem("cookiesAccepted", "true");
            overlay.style.display = "none";
        })
    }
    // Clicking On Logo Routes To Home Page
    let logo = document.getElementById("logo");
    logo.addEventListener("click", () => {
        window.location.href = "/";
    })
    // Console Page Routing ( Error Free )
    if (!window.location.pathname.includes("/user")) {
        let console = document.getElementById("console");
        console.addEventListener("click", () => {
            if (localStorage.getItem("LoggedIn") === "true")
            {
                window.location.href = "/user/dashboard";
            } else {
                window.location.href = "/account/login";
            }
        })
    }
})