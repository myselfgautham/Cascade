// Document Load Event Fired
document.addEventListener("DOMContentLoaded", () => {
    // Unauthorized Device ( Load Check I )
    if (localStorage.getItem("Data") === "\"Unauthorized Device\"") {
        alert("Unauthorized Device Found\nPlease Clear Browser Data\nIf Issue Persists\nPlease Contact Support");
        setTimeout(() => {
            window.location.href = "/";
        }, 200)
    }
})
// Card Number Box And Autofill From URL Parameters
let card = document.getElementById("number")
let search = new URLSearchParams(window.location.search);
console.log(search);
if (search.get("card") !== undefined)
{
    card.value = search.get("card");
}
// Submit Button Call
document.getElementById("submit").addEventListener("click", () => {
    let note = document.getElementById("note");
    note.style.color = "red";
    // Inputs Check
    let inputs = document.querySelectorAll("input");
    inputs.forEach((e) => {
        if (e.value === "") {
            note.innerHTML = "Please Fill In All Field";
        }
        else if (e.value === inputs[1].value) {
            note.innerHTML = "";
        }
        note.style.display = "block";
    })
    note.style.display = "block";
    // Fetch Finalized
    if (note.innerHTML === "") {
        // Parse JSON Data
        let x = JSON.parse(localStorage.getItem("Data"));
        let crx = document.getElementById("number").value;
        // Card Check
        for (var key in x) {
            if (x[key]["Number"] === document.getElementById("number").value) {
                crx = key;
            }
        }
        // Invalid Card Case
        if (crx === document.getElementById("number").value)
        {
            note.innerHTML = "Invalid Card";
            note.style.display = "block";
            throw new Error();
        }
        // Fetching Initialized
        note.innerHTML = "Loading";
        note.style.display = "block";
        fetch("/cards/share", {
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
            // Shared
            if (data["Response"] === "Added") {
                note.innerHTML = "Card Shared Successfully";
                note.style.color = "green";
                setTimeout(() => {
                    window.location.href = "/user/dashboard";
                }, 400)
            }
            // Share Failed
            else {
                note.innerHTML = data["Response"];
            }
            note.style.display = "block"
        })
        .catch(error => console.error("Error : ", error))
    }
})