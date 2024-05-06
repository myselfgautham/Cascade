import { cookies } from "/static/JavaScript/Server.js"
import { resetCookies } from "/static/JavaScript/Cookies.js";

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cookiesAccepted") === "true")
    {
        window.location.href = `/`
    }
    var acceptButton = document.getElementById("accept");
    var helpButton = document.getElementById("help")
    acceptButton.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", true);
        resetCookies(cookies);
        window.location.reload();
    })
    helpButton.addEventListener("click", () => {
        alert(
            "For More Information / Help\nPlease Contact Me On GitHub\n@myselfgautham"
        );
    })
})