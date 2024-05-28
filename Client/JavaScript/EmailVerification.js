let url = new URL(window.location.href);
let note = document.getElementById("note");
if ((localStorage.getItem("Email") === "") ||
    (localStorage.getItem("LoggedIn") !== "true"))
{
    window.location.href = "/account/login";
} else {
    fetch(`/api/verify/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: localStorage.getItem("Email")
        })
    })
    .then(response => response.json())
    .then(data => {
        note.innerHTML = data["Response"];
        if (data["Response"] === "Email Sent") {
            note.style.color = "#34A853";
        }
        note.style.display = "block";
    })
    .catch(err => console.error("Error : ", err));
}

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    fetch(`/api/verify/code/email`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: localStorage.getItem("Email"),
            otp: document.getElementById("otp").value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data["Response"] === "Correct") {
            note.innerHTML = "Login Completed";
            note.style.color = "#34A853";
            localStorage.setItem("VerifiedSession", "true");
        }
        else {
            note.innerHTML = data["Response"];
            note.style.display = "block";
        }
    })
    .catch(err => console.error("Error : ", err));
})