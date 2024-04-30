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
    else
    {
        var uid = getCookie("uid");
        var state = getCookie("userStatus");
        if (uid === "" || state === "")
        {
            getUID();
            console.log("Added Cookie Successfully");
        }
        else {
            console.log("Cookie Already Set");
            console.log("UID : ",getCookie("uid"));
            console.log("Logged In : ",getCookie("userStatus"));
        }
    }
})

// Flask UID API
async function getUID()
{
    try
    {
      const response = await fetch('/api/getUID');
      if (!response.ok)
      {
        throw new Error('Bad Network Response');
      }
      const data = await response.json();
      setCookie("uid",data.uid,128);
      setCookie("userStatus","false",128);
    }
    catch (error)
    {
      console.error('There Was A Problem With The Request :', error);
    }
}

// Cookies Generate
function setCookie(cookieName, cookieValue, expirationDays)
{
    var time = new Date();
    time.setTime(time.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+time.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Cookie Existence Check
function getCookie(cookieName)
{
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++)
    {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ')
        {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0)
        {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}