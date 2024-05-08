import {getCookieFromStorage} from "/static/JavaScript/Cookies.js"
import {fetchFlaskWithData} from "/static/JavaScript/FlaskAPI.js"
const email = getCookieFromStorage("Email");
fetchFlaskWithData("/api/phone", {Email: email})
document.addEventListener("DOMContentLoaded", () => {
    var phone = document.getElementById("phone");
    var btn = document.getElementById("next");
    var note = document.getElementById("note");
    var text = document.getElementById("buffer");
    fetchFlaskWithData("/api/phone",{Email: email})
    .then(response => {
        phone.innerText = response.Phone;
    })
    .catch(error => console.log("Error : ",error))
    btn.addEventListener("click",() => {
        fetchFlaskWithData("/api/verify-otp", {OTP: text.value, Email: email})
        .then(response => {
            console.log(response)
            if (response.State == "true")
            {
                note.innerText = "Verified Successfully";
                note.style.display = "block";
                note.style.color = "green";
            }
            else if (response.State == "verified")
            {
                note.innerText = "Invalid Session";
                note.style.display = "block";
                note.style.color = "red";
            }
            else {
                note.innerText = "Invalid Credential";
                note.style.display = "block";
            }
        })
        .catch(error => console.log("Error : ",error))
    })
})