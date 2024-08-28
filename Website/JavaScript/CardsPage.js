import { fetchLocation, checkLocalStoragePermission } from "/static/JavaScript/Globals.js";

let index = 0;

checkLocalStoragePermission();

document.addEventListener("DOMContentLoaded", () => {
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
        document.getElementById("loaderWrapper").style.display = "none";
        if (data.Response === "Unauthorized Device") {
            window.location.href = "/account/login";
        } else if (Object.keys(data.Response).length === 0) {
            document.getElementById("nothing").style.display = "flex";
        } else if (Object.keys(data.Response).length === 1) {
            document.getElementById("controls").style.visibility = "hidden";
        }
        localStorage.setItem("Data", JSON.stringify(data.Response));
    })
    .then(() => {
        let data = JSON.parse(localStorage.getItem("Data"));
        if (document.getElementById("nothing").style.display === "none") {
            setCardToView(index, data);

            document.getElementById("prev").addEventListener("click", () => {
                index = (index === 0) ? Object.keys(data).length - 1 : index - 1;
                setCardToView(index, data);
            });

            document.getElementById("next").addEventListener("click", () => {
                index = (index === Object.keys(data).length - 1) ? 0 : index + 1;
                setCardToView(index, data);
            });

            document.getElementById("cvv").addEventListener("click", () => {
                navigator.clipboard.writeText(String(data[Object.keys(data)[index]].CVV));
            });
        }
    })
    .catch(error => console.error("Error:", error));
});

function setCardToView(index, data) {
    let keys = Object.keys(data);
    let current = data[keys[index]];

    document.getElementById("cardNumber").innerText = current.Number;
    document.getElementById("from").innerText = current.From;
    document.getElementById("till").innerText = current.Till;
    document.getElementById("vendorName").innerText = current.Vendor;

    document.getElementById("vendorLogo").setAttribute("src", current.Logo || "/static/Assets/Favicon.svg");

    document.getElementById("cvv").style.display = current.Flags.CVV ? "flex" : "none";
    document.getElementById("encrypted").style.display = current.Flags.Encrypt ? "flex" : "none";
    document.getElementById("shared").style.display = current.Owners.length > 1 ? "flex" : "none";
    document.getElementById("verification").style.display = current.Flags.Verification ? "flex" : "none";

    document.getElementById("container").style.display = "flex";
}

document.getElementById("removeCard").addEventListener("click", removeCard);

function removeCard() {
    if (confirm("Are You Sure You Want To Delete This Card?\nDeleted Cards Cannot Be Recovered")) {
        fetch(fetchLocation + "api/cards/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid: localStorage.getItem("DeviceUID"),
                card: Object.keys(JSON.parse(localStorage.getItem("Data")))[index],
                email: localStorage.getItem("Email")
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.Response === "Card Deleted") {
                setTimeout(() => window.location.reload(), 1000);
            }
            document.getElementById("notifierContent").innerHTML = data.Response;
            document.getElementById("notifierx").style.display = "flex";
        })
        .catch(error => {
            console.error("Error:", error);
            setTimeout(() => window.location.href = "/", 200);
        });
    }
}