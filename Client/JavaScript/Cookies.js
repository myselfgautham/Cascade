let overlay = document.getElementById("overlay");
if (localStorage.getItem("cookiesAccepted") === null) {
    overlay.style.display = "flex";
    let accept = document.getElementById("accept");
    accept.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", true);
        setTimeout(() => {
            window.location.reload();
        }, 400);
    })
}