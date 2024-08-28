import {
    inputFilterCheck,
    plausibleEmail,
    fetchLocation,
    checkLocalStoragePermission
} from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();

document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("input");
    const routeButton = document.getElementById('route');
    const loginButton = document.getElementById('login');
    const note = document.getElementById('note');

    routeButton.addEventListener('click', () => {
        window.location.href = "/account/create";
    });

    loginButton.addEventListener("click", async () => {
        if (!inputFilterCheck()) {
            note.innerHTML = "Please Fill All Fields";
            note.style.display = "block";
            return;
        }

        note.innerHTML = "";

        if (!plausibleEmail(inputs[0].value)) {
            note.innerHTML = "Enter A Valid Email";
            note.style.display = "block";
            return;
        }

        note.innerHTML = "Please Wait";
        note.style.display = "block";
        note.style.color = "#34A853";

        try {
            const response = await fetch(fetchLocation + "account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: inputs[0].value,
                    password: inputs[1].value,
                    uid: localStorage.getItem("DeviceUID")
                })
            });

            const data = await response.json();
            note.innerHTML = data["Response"];
            note.style.display = "block";
            note.style.color = data["Response"] === "Login Completed" ? "#34A853" : "#FF204E";

            if (data["Response"] === "Login Completed") {
                await setUserToLocalStorage(inputs[0].value);
                setTimeout(() => {
                    window.location.href = "/user/dashboard";
                }, 600);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});

async function setUserToLocalStorage(mail) {
    localStorage.setItem("Email", mail);
    localStorage.setItem("LoggedIn", "true");
}