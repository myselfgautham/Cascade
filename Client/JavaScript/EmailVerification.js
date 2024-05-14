import {
    getCookieFromStorage,
    setCookieToStorage
}
from "/static/JavaScript/Cookies.js"
import {fetchFlaskWithData} from "/static/JavaScript/FlaskAPI.js"
import {routeToPage} from "/static/JavaScript/Server.js"
let email = document.getElementById("phone");
let note = document.getElementById("note");
if (getCookieFromStorage("Email") != "")
{
    email.innerText = getCookieFromStorage("Email");
    fetchFlaskWithData("/api/generate-email", {Email: getCookieFromStorage("Email")})
    .then(response => {console.log(response)})
    let btn = document.getElementById("next");
    btn.addEventListener("click", ()  => {
        fetchFlaskWithData("/api/verify-email", {Email: getCookieFromStorage("Email"),OTP: document.getElementById("buffer").value})
        .then(response => {
            if (response.Response == true) {
                setCookieToStorage("UserState", true);
                note.innerText = "Verified Successfully";
                note.style.color = "green"
                note.style.display = "block"
                fetchFlaskWithData("/api/complete", {
                    UID: getCookieFromStorage("UID"),
                    Email: getCookieFromStorage("Email")
                })
                .then(response => {
                    if (response.Response != "True") {
                        resetCookies(cookies);
                        window.location.href = "/";
                    }
                })
                setTimeout(routeToPage("/dashboard"),400);
            }
            else {
                note.innerText = "Invalid Credentials"
                note.style.display = "block"
            }
        })
        .catch(error => console.error("Error : ", error))
    })
}