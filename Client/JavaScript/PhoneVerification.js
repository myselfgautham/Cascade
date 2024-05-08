import {getCookieFromStorage} from "/static/JavaScript/Cookies.js"
import {fetchFlaskWithData} from "/static/JavaScript/FlaskAPI.js"
const email = getCookieFromStorage("Email");
fetchFlaskWithData("/api/phone", {Email: email})
document.addEventListener("DOMContentLoaded", () => {
    var phone = document.getElementById("phone");
    var btn = document.getElementById("next")
    fetchFlaskWithData("/api/phone",{Email: email})
    .then(response => {
        phone.innerText = response.Phone;
    })
    .catch(error => console.log("Error : ",error))
})