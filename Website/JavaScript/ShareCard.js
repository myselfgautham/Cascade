import {
    inputFilterCheck,
    plausibleEmail,
    fetchLocation,
    checkLocalStoragePermission
} from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("Data") === "\"Unauthorized Device\"") {
        alert("Unauthorized Device Found\nPlease Clear Browser Data\nIf Issue Persists\nPlease Contact Support");
        setTimeout(() => {
            window.location.href = "/";
        }, 200);
    }
});

let card = document.getElementById("number");
let search = new URLSearchParams(window.location.search);
if (search.get("card") !== undefined) {
    card.value = search.get("card");
}

document.getElementById("submit").addEventListener("click", () => {
    let note = document.getElementById("note");
    note.style.color = "red";
    if (!inputFilterCheck()) {
        note.innerHTML = "Please Fill All Fields";
        note.style.display = "block";
    } else if (!plausibleEmail(document.getElementById("mail").value)) {
        note.innerHTML = "Please Enter A Valid Email";
    } else {
        note.innerHTML = ""; 
    }
    note.style.display = "block";
    if (note.innerHTML === "") {
        let x = JSON.parse(localStorage.getItem("Data"));
        let crx = document.getElementById("number").value;
        for (var key in x) {
            if (x[key]["Number"] === document.getElementById("number").value) {
                crx = key;
            }
        }
        if (crx === document.getElementById("number").value) {
            note.innerHTML = "Invalid Card";
            note.style.display = "block";
            throw new Error();
        }
        note.innerHTML = "Loading";
        note.style.display = "block";
        fetch(fetchLocation + "cards/share", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: localStorage.getItem("DeviceUID"),
                card: crx,
                party: document.getElementById("mail").value,
                email: localStorage.getItem("Email")
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data["Response"] === "Added") {
                note.innerHTML = "Card Shared Successfully";
                note.style.color = "green";
                setTimeout(() => {
                    window.location.href = "/user/dashboard";
                }, 400);
            } else {
                note.innerHTML = data["Response"];
            }
            note.style.display = "block";
        })
        .catch(error => {
            console.error("Error : ", error);
            setTimeout(() => {
                window.location.href = "/";
            }, 200);
        });
    }
});