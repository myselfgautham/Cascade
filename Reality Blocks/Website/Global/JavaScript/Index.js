// Responsive Menu
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
});

// Reload Menu
function reloadPage()
{
    window.location.reload()
}

// Text Hiding
function hideText()
{
    var text = document.getElementById("textBox");
    if (text.className === "centerText")
    {
        text.className = "hide";
    }
    else
    {
        text.className = "centerText";
    }
}