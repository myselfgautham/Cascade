// Hamburger Menu
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbg = document.querySelector('.nav-bg');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbg.classList.toggle('active');
});

// Cookies Check
document.addEventListener("DOMContentLoaded", () => {
    const negativeValue = [null,"null",false,"false"];
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    const member = negativeValue.includes(cookiesAccepted)
    if (member === true)
    {
        window.location.href = "/";
    }
})