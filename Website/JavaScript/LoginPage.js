// Imports From Scripts
import {
    inputFilterCheck,
    plausibleEmail,
    fetchLocation,
    checkLocalStoragePermission
} from "/static/JavaScript/Globals.js";

// DOM Content Loaded
checkLocalStoragePermission()
document.addEventListener("DOMContentLoaded", () => {
    // Input Fields
    let input = document.querySelectorAll("input");
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
        if (!inputFilterCheck()) {
            note.innerHTML = "Please Fill All Fields";
            note.style.display = "block";
        } else {
            note.innerHTML = ""; 
        }
        // Final Check Before Fetch
        if (note.innerHTML === "") {
            // Test Email
            if (!plausibleEmail(input[0].value)) {
                note.innerHTML = "Enter A Valid Email";
                note.style.display = "block";
            }
            // Do An Endpoint Fetch
            else {
                note.innerHTML = "Please Wait";
                note.style.display = "block";
                note.style.color = "#34A853";
                fetch(fetchLocation + "account/login", {
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
                .catch(error => {
                    console.error("Error : ", error);
                    
                });
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