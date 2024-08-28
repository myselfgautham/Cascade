import {
    inputFilterCheck,
    fetchLocation,
    checkLocalStoragePermission
} from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();

const note = document.getElementById("note");
const codeInput = document.getElementById("code");

document.getElementById("activate").addEventListener("click", () => {
    if (!inputFilterCheck()) {
        note.innerText = "Please Fill All Fields";
        note.style.color = "red";
        note.style.display = "block";
    } else if (codeInput.value.length < 6) {
        note.innerText = "Invalid Activation Code";
        note.style.color = "red";
        note.style.display = "block";
    } else {
        note.innerText = "Activating Node";
        note.style.color = "green";
        note.style.display = "block";

        fetch(fetchLocation + "user/nodes/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: localStorage.getItem("Email"),
                uid: localStorage.getItem("DeviceUID"),
                code: codeInput.value
            })
        })
        .then(res => res.json())
        .then(data => {
            const res = data.Response;
            note.innerText = res;
            if (res === "Node Activated") {
                note.style.color = "green";
                setTimeout(() => window.location.href = "/user/nodes", 1000);
            } else {
                note.style.color = "red";
            }
            note.style.display = "block";
        })
        .catch(error => console.error("Error:", error));
    }
});