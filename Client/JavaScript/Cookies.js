// Listen For Website Loading
document.addEventListener("DOMContentLoaded", () => {
    const cookiesStatus = localStorage.getItem("cookiesAccepted");
    if (cookiesStatus === "true")
    {
        window.location.href = "/home";
    }
})

// Accept Cookies Call
function cookiesAccepted()
{
    localStorage.setItem("cookiesAccepted",true);
    window.location.reload();
}