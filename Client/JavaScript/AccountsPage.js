// Special Show
function onlyShow(ID, CLASS)
{
    var x = document.getElementById(ID);
    if (x.innerText == "")
    {
        x.className = "hidden";
    }
    else if (x.innerText == "Account Created Successfully")
    {
        x.style.color = "green";
    }
    else if (x.innerText != "" && !window.location.href.includes("/createAccount"))
    {
        x.className = "hidden";
    }
    else {
        x.className = CLASS;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var test = true;
    if (window.location.href.includes("/createAccount") && test === false)
    {
        window.location.href = "/signup"
        test = !test;
    }
    onlyShow("notifier", "notifier");
})