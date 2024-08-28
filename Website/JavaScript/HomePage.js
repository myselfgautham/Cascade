window.addEventListener("load", () => {
    document.getElementById("links").style.visibility = "visible";
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cookiesAccepted") === null) {
        const overlay = document.getElementById("overlay");
        overlay.style.display = "flex";
        overlay.style.visibility = "visible";

        document.getElementById("accept").addEventListener("click", () => {
            localStorage.setItem("cookiesAccepted", "true");
            overlay.style.display = "none";
        });
    }

    document.getElementById("logo").addEventListener("click", () => {
        window.location.href = "/";
    });

    if (!window.location.pathname.includes("/user")) {
        document.getElementById("console").addEventListener("click", () => {
            const destination = localStorage.getItem("LoggedIn") === "true" ? "/user/dashboard" : "/account/login";
            window.location.href = destination;
        });

        document.getElementById("github").addEventListener("click", () => {
            window.open("https://github.com/myselfgautham/Cascade", '_blank').focus();
        });
    }
});