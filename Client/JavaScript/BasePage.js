// Scripts Import
import {enforceCookiesPolicy} from "/static/JavaScript/Cookies.js"

// Hamburger Menu
const menuIcon = document.querySelector('#menu-icon');
const navigation = document.querySelector('.navbar');
const background = document.querySelector('.nav-bg');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navigation.classList.toggle('active');
    background.classList.toggle('active');
    console.log(getCookieFromStorage("UID"));
});

// Cookies Enforcement
document.addEventListener("DOMContentLoaded",enforceCookiesPolicy());