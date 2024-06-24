// Imports From Scripts
import {inputFilterCheck} from "/static/JavaScript/Globals.js";

// Input Fields Of The Form
let user = document.getElementById("name");
let email = document.getElementById("mail");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let submit = document.getElementById("submit")
let span = document.getElementById("note");

// Submit Clicked
submit.addEventListener("click", () => {
    // Null Safety Check
    if (!inputFilterCheck()) {
        span.innerHTML = "Please Fill In All Fields"
        span.style.display = "block";
    }
    // Strong Password Check
    else if (!isStrongPassword(password.value)) {
        span.innerText = "Choose A Stronger Password";
        span.style.display = "block";
    }
    // Email Check
    else if(email.value.includes(" ") || !plausibleEmail(email.value))
    {
        span.innerText = "Invalid Email Address";
        span.style.display = "block";
    }
    // Phone Number Regex Check
    else if (!isValidE164PhoneNumber(phone.value)) {
        span.innerText = "Incomplete Phone Number";
        span.style.display = "block";
    }
    // Stage I - Initialized
    else {
        span.style.color = "#34A853";
        span.innerHTML = "Creating Account";
        span.style.display = "block";
        // Fetch Endpoint - Stage II
        fetch("/account/create", {
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
            // Show Result To User - Stage III
            span.innerText = data["Response"];
            // Account Created
            if (data["Response"] === "Account Created Successfully") {
                span.style.color = "#34A853";
                setTimeout(() => {
                    window.location.href = "/account/login"
                }, 500)
            } else {
                // Something Went Wrong
                span.style.color = "#FF204E"
            }
            span.style.display = "block";
        })
        .catch(error => console.error(error));
    }
})

// Strong Password Test
function isStrongPassword(password) {
    return (
      typeof password === 'string' &&
      password.length >= 8 &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    );
}

// Email Check
function plausibleEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

// Valid E164 Phone Number Check
function isValidE164PhoneNumber(phoneNumber) {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phoneNumber);
}

// Login Forwarding
document.getElementById("login").addEventListener("click", () => {
    window.location.href = "/account/login"
})