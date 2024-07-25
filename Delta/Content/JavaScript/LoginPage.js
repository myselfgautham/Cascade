let note = document.getElementById("note");

let register = document.getElementById("register");
register.addEventListener("click", () => {
    window.location.href = "/account/register";
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
    } else if (!plausibleEmail(document.getElementById("email").value)) {
        note.innerHTML = "Invalid Email";
        note.style.color = "red";
        note.style.display = "block";
    } else if (!isStrongPassword(document.getElementById("password").value)) {
        note.innerHTML = "Choose A Stronger Password";
        note.style.color = "red";
        note.style.display = "block";
    } else {
        note.innerHTML = "";
        note.style.display = "none";
    }
    if (note.innerHTML === "") {
        note.style.color = "green";
        note.innerHTML = "Logging In";
        note.style.display = "block";
        fetch("/account/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            })
        })
        .then(res => res.json())
        .then(data => {
            let result = data["Response"];
            if (result == true) {
                note.innerHTML = "Login Completed";
                note.style.color = "green";
                localStorage.setItem("LoggedIn", "true");
                localStorage.setItem("Email", document.getElementById("email").value);
                localStorage.setItem("PreviouslyLoggedIn", "true");
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 400)
            } else if (result == false) {
                note.innerHTML = "Invalid Credentials";
                note.style.color = "red";
            } else {
                note.innerHTML = result;
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