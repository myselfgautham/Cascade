let login = document.getElementById("login");
login.addEventListener("click", () => {
    window.location.href = "/account/login"
})

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
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
    .then(data => {})
    .catch(error => console.error("Error : ", error))
})