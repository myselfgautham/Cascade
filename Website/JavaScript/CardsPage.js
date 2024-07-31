import {fetchLocation} from "/static/JavaScript/Globals.js"

// Global Scope Index
let index = 0;

// DOM Loaded Event
document.addEventListener("DOMContentLoaded", () => {
    // Fetch Cards API
    fetch(fetchLocation + "api/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: localStorage.getItem("Email"),
            uid: localStorage.getItem("DeviceUID")
        })
    })
    .then(res => res.json())
    .then(data => {
        // Set Response To User Side
        document.getElementById("loaderWrapper").style.display = "none";
        // Unauthorized Device
        if (data["Response"] === "Unauthorized Device") {
            window.location.href = "/account/login";
        } else if (Object.keys(data["Response"]).length === 0) {
            // No Cards
            document.getElementById("nothing").style.display = "flex";
        } else if (Object.keys(data["Response"]).length === 1) {
            // Hide Controls If Only One Card Is There
            document.getElementById("controls").style.visibility = "hidden";
        }
        // Set Item To Local Storage
        localStorage.setItem("Data", JSON.stringify(data["Response"]));
    })
    .then(_ => {
        // Parse Data Stored
        let data = JSON.parse(localStorage.getItem("Data"));
        // !Nothing Check
        if (document.getElementById("nothing").style.display === "none")
        {
            // Set Card To View
            setCardToView(index, data);
            // Controls
            let prev = document.getElementById("prev");
            let nxt = document.getElementById("next");
            // Previous
            prev.addEventListener("click", () => {
                if (index === 0) {
                    index = (Object.keys(data).length) - 1; 
                } else {
                    index--;
                }
                setCardToView(index, data);
            })
            // Next
            nxt.addEventListener("click", () => {
                if (index === (Object.keys(data).length) - 1) {
                    index = 0;
                } else {
                    index++;
                }
                setCardToView(index, data);
            })
            // CVV Copy To Clipboard
            let cvv = document.getElementById("cvv");
            cvv.addEventListener("click", () => {
                let value = data[Object.keys(data)[index]]["CVV"];
                navigator.clipboard.writeText(String(value))
            })
        }
    })
    .catch(error => console.error("Error : ", error))
})

// Set Card To View On The Basis Of Index
function setCardToView(index, data)
{
    let keys = Object.keys(data);
    let current = data[keys[index]]
    document.getElementById("cardNumber").innerText = current["Number"];
    document.getElementById("from").innerText = current["From"];
    document.getElementById("till").innerText = current["Till"];
    document.getElementById("vendorName").innerText = current["Vendor"];
    if (current["Logo"] !== undefined) {
        document.getElementById("vendorLogo").setAttribute("src", current["Logo"])
    } else {
        document.getElementById("vendorLogo").setAttribute("src", "/static/Assets/Favicon.svg")
    }
    if (current["Flags"]["CVV"]) {
        document.getElementById("cvv").style.display = "flex";
    } else {
        document.getElementById("cvv").style.display = "none";
    }
    if (current["Flags"]["Encrypt"]) {
        document.getElementById("encrypted").style.display = "flex";
    } else {
        document.getElementById("encrypted").style.display = "none";
    }
    if (current["Owners"].length > 1) {
        document.getElementById("shared").style.display = "flex";
    } else {
        document.getElementById("shared").style.display = "none";
    }
    if (current["Flags"]["Verification"]) {
        document.getElementById("verification").style.display = "flex";
    } else {
        document.getElementById("verification").style.display = "none";
    }
    document.getElementById("container").style.display = "flex";
}

// Delete Card Button Event Listener
document.getElementById("removeCard").addEventListener("click", () => {
    removeCard()
})

// Delete Card
function removeCard() {
    // Confirm
    if (confirm("Are You Sure You Want To Delete This Card ?\nDeleted Cards Cannot Be Recovered"))
    {
        // Get Data From Storage
        let data = JSON.parse(localStorage.getItem("Data"));
        // Fetch Deletion POST Endpoint
        fetch(fetchLocation + "api/cards/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: localStorage.getItem("DeviceUID"),
                card: Object.keys(data)[index],
                email: localStorage.getItem("Email")
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data["Response"] === "Card Deleted")  {
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
            document.getElementById("notifierContent").innerHTML = data["Response"];
            document.getElementById("notifierx").style.display = "flex";
        })
        .catch(error => {
            console.error("Error : ", error);
            setTimeout(() => {
                window.location.href = "/";
            }, 200)
        });
    }
}