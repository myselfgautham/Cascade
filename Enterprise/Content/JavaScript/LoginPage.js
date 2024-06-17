let note = document.getElementById("note");

let register = document.getElementById("register");
register.addEventListener("click", () => {
    window.location.href = "/account/register";
})

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
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
})