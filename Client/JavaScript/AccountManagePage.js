document.addEventListener("DOMContentLoaded", () => {
    var routingButton = document.getElementById("btn");
    routingButton.addEventListener("click", () => {
        window.location.href = "/profile";
    });
});