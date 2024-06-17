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
    .then(data => {})
    .catch(error => console.error("Error : ", error))
})