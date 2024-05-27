const emailRegex = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
const testEmail = (email) => emailRegex.test(email)
const phoneRegex = new RegExp(/^\+\d{1,15}$/);
const validPhone = (phone) => phoneRegex.test(phone)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isStrongPassword = password => passwordRegex.test(password);

document.addEventListener('DOMContentLoaded', () => {
    let loginBtn = document.getElementById('login');
    loginBtn.addEventListener('click', () => {
        window.location.href = "/account/login";
    })
    let submit = document.getElementById('submit');
    let note = document.getElementById('note');
    submit.addEventListener('click', () => {
        let input = document.querySelectorAll("input");
        input.forEach((rax) => {
            if (rax.value === "") {
                note.innerHTML = "Please Fill In All Fields";
                note.style.display = "block";
                return null;
            }
            else if (rax.value === input[3].value) {
                note.innerHTML = "";
            }
        });
        if (note.innerHTML === "") {
            if (!testEmail(input[1].value)) {
                note.innerHTML = "Enter A Valid Email";
                note.style.display = "block";
            } else if (!validPhone(input[2].value)) {
                note.innerHTML = "Enter Valid Phone Number";
                note.style.display = "block";
            } else if (!isStrongPassword(input[3].value)) {
                note.innerHTML = "Enter A Stronger Password";
                note.style.display = "block";
            } else {
                note.innerHTML = "";
                fetch("http://localhost:1920/api/accounts/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: input[0].value,
                        email: input[1].value,
                        phone: input[2].value,
                        password: input[3].value
                    })
                })
                .then(response => response.json())
                .then(data => {
                    note.innerHTML = data["Response"];
                    if (data["Response"] === "Account Created Successfully") {
                        note.style.color = "#34A853";
                        setTimeout(() => {
                            window.location.href = "/account/login";
                        }, 500)
                    } else {
                        note.style.color = "#FF204E";
                    }
                    note.style.display = "block";
                })
                .catch(error => console.error("Error : ", error));
            }
        }
    })
})