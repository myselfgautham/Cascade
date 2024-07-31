import {inputFilterCheck, fetchLocation} from "/static/JavaScript/Globals.js";
let note = document.getElementById("note");
document.getElementById("activate").addEventListener("click", () => {
    if (!inputFilterCheck()) {
        note.innerHTML = "Please Fill All Fields";
        note.style.color = "red";
        note.style.display = "block";
    } else if (document.getElementById("code").value.length < 6) {
        note.innerHTML = "Invalid Activation Code";
        note.style.color = "red";
        note.style.display = "block";
    } else {
        note.innerHTML = "Activating Node";
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
                code: document.getElementById("code").value
            })
        })
        .then(res => res.json())
        .then(data => {
            let res = data["Response"];
            note.innerHTML = res;
            if (res === "Node Activated") {
                note.style.color = "green";
                setTimeout(() => {
                    window.location.href = "/user/nodes";
                }, 1000)
            } else {
                note.style.color = "red";
            }
            note.style.display = "block";
        })
        .catch(error => console.error("Error : ", error))
    }
})