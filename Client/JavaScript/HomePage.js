window.addEventListener("load", () => {
    let clsSaves = [
        document.getElementById("links")
    ]
    clsSaves.forEach((li) => {
        li.style.visibility = "visible";
    })
})

document.addEventListener("DOMContentLoaded", () => {
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
    let logo = document.getElementById("logo");
    logo.addEventListener("click", () => {
        window.location.href = "/";
    })
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