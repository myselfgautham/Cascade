function reloadPage()
{
    location.reload();
}

function hamburgerMenu()
{
    var links = document.getElementById("links");
    if (links.style.display === "block")
    {
        links.style.display = "none";
    }
    else
    {
        links.style.display = "block";
    }
}