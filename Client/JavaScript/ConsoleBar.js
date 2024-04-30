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
