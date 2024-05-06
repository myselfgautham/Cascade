import {ServerName} from "/static/JavaScript/Server.js"

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cookiesAccepted") === "true")
    {
        window.location.href = `/${ServerName}/home`
    }
    var acceptButton = document.getElementById("accept");
    var helpButton = document.getElementById("help")
    acceptButton.addEventListener("click", function() {
        localStorage.setItem("cookiesAccepted", true);
        window.location.reload();
    })
    helpButton.addEventListener("click", () => {
        alert(
            "For More Information / Help\nPlease Contact Me On GitHub\n@myselfgautham"
        );
    })
})