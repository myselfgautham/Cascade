let user = document.getElementById("name");
let email = document.getElementById("mail");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let submit = document.getElementById("submit")
let span = document.getElementById("note");

submit.addEventListener("click", () => {
    if ( (user.value === "") ||
        (email.value === "") ||
        (phone.value === "") ||
        (password.value === "")
    ) {
        span.innerText = "Please Fill In All Fields";
        span.style.display = "block";
    }
    else if (!isStrongPassword(password.value)) {
        span.innerText = "Choose A Stronger Password";
        span.style.display = "block";
    }
    else if(email.value.includes(" ") || !plausibleEmail(email.value))
    {
        span.innerText = "Invalid Email Address";
        span.style.display = "block";
    }
    else if (!isValidE164PhoneNumber(phone.value)) {
        span.innerText = "Incomplete Phone Number";
        span.style.display = "block";
    }
    else {
        span.style.color = "#34A853";
        span.innerHTML = "Creating Account";
        span.style.display = "block";
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
            span.innerText = data["Response"];
            if (data["Response"] === "Account Created Successfully") {
                span.style.color = "#34A853";
                setTimeout(() => {
                    window.location.href = "/account/login"
                }, 500)
            } else {
                span.style.color = "#FF204E"
            }
            span.style.display = "block";
        })
        .catch(error => console.error(error));
    }
})

function isStrongPassword(password) {
    return (
      typeof password === 'string' &&
      password.length >= 8 &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    );
}

function plausibleEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

function isValidE164PhoneNumber(phoneNumber) {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phoneNumber);
}

document.getElementById("login").addEventListener("click", () => {
    window.location.href = "/account/login"
})