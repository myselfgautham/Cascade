import { inputFilterCheck, fetchLocation, checkLocalStoragePermission } from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();
if (localStorage.getItem("Data") === "\"Unauthorized Device\"") {
    alert("Unauthorized Device Found\nPlease Clear Browser Data\nIf Issue Persists\nPlease Contact Support");
    setTimeout(() => {
        window.location.href = "/";
    }, 200);
}

let node = document.getElementById("nodeID");
let Parameters = new URLSearchParams(window.location.search);
let submit = document.getElementById("rename");
let note = document.getElementById("note");

if (Parameters.get("node") !== undefined) {
    node.value = Parameters.get("node");
}

submit.addEventListener("click", () => {
    if (!inputFilterCheck()) {
        note.innerHTML = "Please Fill All Fields";
        note.style.display = "block";
    } else {
        note.innerHTML = "";
    }
    if (note.innerHTML === "") {
        let data = JSON.parse(localStorage.getItem("Nodes"));
        if (!Object.keys(data).includes(node.value)) {
            note.innerHTML = "Please Enter A Valid Node";
            note.style.display = "block";
        } else {
            note.innerHTML = "Please Wait";
            note.style.display = "block";
            fetch(fetchLocation + "user/nodes/rename", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem("Email"),
                    uid: localStorage.getItem("DeviceUID"),
                    node: node.value,
                    common: document.getElementById("nickname").value
                })
            })
            .then(res => res.json())
            .then(data => {
                note.innerHTML = data["Response"];
                if (data["Response"] === "Renamed Successfully") {
                    note.style.color = "green";
                    setTimeout(() => {
                        window.location.href = "/user/nodes";
                    }, 600);
                }
                note.style.display = "block";
            })
            .catch(error => console.error("Error : ", error));
        }
    }
});