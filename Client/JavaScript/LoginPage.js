const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
const testEmail = (email) => emailRegex.test(email);
document.addEventListener("DOMContentLoaded", () => {
    let btn = document.getElementById('route');
    btn.addEventListener('click', () => {
        window.location.href = "/account/create";
    })
    let login = document.getElementById('login');
    let note = document.getElementById('note');
    login.addEventListener("click", () => {
        let input = document.querySelectorAll("input");
        input.forEach((rax) => {
            if (rax.value === "") {
                note.innerHTML = "Please Fill In All Fields";
                note.style.display = "block";
            }
            else if (rax.value === input[1].value) {
                note.innerHTML = "";
            }
        })
        if (note.innerHTML === "") {
            if (!testEmail(input[0].value)) {
                note.innerHTML = "Enter A Valid Email";
                note.style.display = "block";
            }
            else {
                note.innerHTML = "Please Wait";
                note.style.display = "block";
                note.style.color = "#34A853";
                fetch("/account/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: input[0].value,
                        password: input[1].value,
                        uid: localStorage.getItem("DeviceUID")
                    })
                })
                .then(res => res.json())
                .then(data => {
                    note.innerHTML = data["Response"];
                    note.style.display = "block";
                    if (data["Response"] === "Login Completed")
                    {
                        note.style.color = "#34A853";
                        setUserToLocalStorage(input[0].value)
                        .then(_ => {
                            setTimeout(() => {
                                window.location.href = "/dashboard";
                            }, 500)
                        })
                    } else {
                        note.style.color = "#FF204E";
                    }
                })
                .catch(err => console.error(err));
            }
        }
    })
})

async function setUserToLocalStorage(mail) {
    return new Promise((resolve) => {
        localStorage.setItem("Email",mail);
        localStorage.setItem("LoggedIn", "true");
        resolve(null);
    })
}