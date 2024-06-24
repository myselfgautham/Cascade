// Email Regex And Test
const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
const testEmail = (email) => emailRegex.test(email);

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    // Route To Signup Page
    let btn = document.getElementById('route');
    btn.addEventListener('click', () => {
        window.location.href = "/account/create";
    })
    // Login Beginning
    let login = document.getElementById('login');
    let note = document.getElementById('note');
    // Login Button Clicked
    login.addEventListener("click", () => {
        // Input Check
        let input = document.querySelectorAll("input");
        input.forEach((rax) => {
            if (rax.value === "") {
                note.innerHTML = "Please Fill In All Fields";
                note.style.display = "block";
            }
            // Destroy Note If All Are Filled
            else if (rax.value === input[1].value) {
                note.innerHTML = "";
            }
        })
        // Final Check Before Fetch
        if (note.innerHTML === "") {
            // Test Email
            if (!testEmail(input[0].value)) {
                note.innerHTML = "Enter A Valid Email";
                note.style.display = "block";
            }
            // Do An Endpoint Fetch
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
                    // Login Successful
                    if (data["Response"] === "Login Completed")
                    {
                        note.style.color = "#34A853";
                        // Set User To Storage ( Session Persistance )
                        setUserToLocalStorage(input[0].value)
                        .then(_ => {
                            setTimeout(() => {
                                window.location.href = "/user/dashboard";
                            }, 600)
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

// Sets Email And Login State ( Async Function )
async function setUserToLocalStorage(mail) {
    return new Promise((resolve) => {
        localStorage.setItem("Email",mail);
        localStorage.setItem("LoggedIn", "true");
        resolve(null);
    })
}