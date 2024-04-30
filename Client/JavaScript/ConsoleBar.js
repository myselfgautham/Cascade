function openNav()
{
    document.getElementById("navigationOverlay").style.height = "100%";
}

function closeNav()
{
    document.getElementById("cls").className = "hidden";
    document.getElementById("navigationOverlay").style.height = "0%";

    setTimeout(function() {
        document.getElementById("cls").className = "closebtn";
    },400)
}

document.addEventListener("DOMContentLoaded", () => {
    const negativeValue = [null,"null",false,"false"];
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (negativeValue.includes(cookiesAccepted))
    {
        window.location.href = "/";
    }
})