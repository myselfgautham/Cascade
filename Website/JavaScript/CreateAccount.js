import {
    inputFilterCheck,
    plausibleEmail,
    isValidE164PhoneNumber,
    isStrongPassword,
    fetchLocation,
    checkLocalStoragePermission
} from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();

const user = document.getElementById("name");
const email = document.getElementById("mail");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const span = document.getElementById("note");

submit.addEventListener("click", () => {
    if (!inputFilterCheck()) {
        span.innerText = "Please Fill In All Fields";
        span.style.display = "block";
    } else if (!isStrongPassword(password.value)) {
        span.innerText = "Choose A Stronger Password";
        span.style.display = "block";
    } else if (email.value.includes(" ") || !plausibleEmail(email.value)) {
        span.innerText = "Invalid Email Address";
        span.style.display = "block";
    } else if (!isValidE164PhoneNumber(phone.value)) {
        span.innerText = "Incomplete Phone Number";
        span.style.display = "block";
    } else {
        span.style.color = "#34A853";
        span.innerText = "Creating Account";
        span.style.display = "block";

        fetch(fetchLocation + "account/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: user.value,
                email: email.value,
                phone: phone.value,
                password: password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            span.innerText = data.Response;
            if (data.Response === "Account Created Successfully") {
                span.style.color = "#34A853";
                setTimeout(() => window.location.href = "/account/login", 500);
            } else {
                span.style.color = "#FF204E";
            }
            span.style.display = "block";
        })
        .catch(error => {
            console.error("Error:", error);
            setTimeout(() => window.location.href = "/", 200);
        });
    }
});

document.getElementById("login").addEventListener("click", () => {
    window.location.href = "/account/login";
});