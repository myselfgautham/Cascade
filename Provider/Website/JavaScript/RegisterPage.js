let note = document.getElementById("note")

let login = document.getElementById("login");
login.addEventListener("click", () => {
    window.location.href = "/account/login"
})

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    const inputs = document.querySelectorAll("input");
    let valid = false;
    inputs.forEach((e) => {
        if (e.value !== "") {
            valid = true
        } else {
            valid = false
        }
    })
    if (!valid) {
        note.innerHTML = "Please Fill In All Fields";
        note.style.color = "red";
        note.style.display = "block";
    }
    else if (!isStrongPassword(document.getElementById("password").value)) {
        note.innerHTML = "Choose A Stronger Password";
        note.style.color = "red";
        note.style.display = "block";
    } else if (!plausibleEmail(document.getElementById("email").value)) {
        note.innerHTML = "Invalid Email";
        note.style.color = "red";
        note.style.display = "block";
    } else if (!isValidE164PhoneNumber(document.getElementById("phone").value)) {
        note.innerHTML = "Invalid Phone Number";
        note.style.color = "red";
        note.style.display = "block";
    } else {
        note.innerHTML = "";
        note.style.display = "none";
    }
    if (note.innerHTML === "") {
        note.style.color = "green";
        note.innerHTML = "Creating Account";
        note.style.display = "block";
        fetch("/account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                business: document.getElementById("name").value,
                owner: document.getElementById("owner").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                password: document.getElementById("password").value
            })
        })
        .then(res => res.json())
        .then(data => {
            note.innerHTML = data["Response"]
            if (data["Response"] === "Account Created") {
                note.style.color = "green"
                localStorage.setItem("LoggedIn", "true");
                localStorage.setItem("Email", document.getElementById("email").value);
                localStorage.setItem("PreviouslyLoggedIn", "true");
            } else {
                note.style.color = "red";
            }
            note.style.display = "block";
        })
        .catch(error => console.error("Error : ", error))
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