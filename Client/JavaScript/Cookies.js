document.addEventListener("DOMContentLoaded", () => {
    const cookiesStatus = localStorage.getItem("cookiesAccepted");
    if (cookiesStatus === "true")
    {
        window.location.href = "/home";
    }
})

function cookiesAccepted()
{
    localStorage.setItem("cookiesAccepted",true);
    window.location.reload();
}