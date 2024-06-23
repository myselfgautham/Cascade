let index = 0;
document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/cards", {
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
        if (data["Response"] === "Unauthorized Device") {
            window.location.href = "/account/login";
        } else if (Object.keys(data["Response"]).length === 0) {
            document.getElementById("nothing").style.display = "flex";
        } else if (Object.keys(data["Response"]).length === 1) {
            document.getElementById("controls").style.visibility = "hidden";
        }
        localStorage.setItem("Data", JSON.stringify(data["Response"]));
    })
    .then(_ => {
        let data = JSON.parse(localStorage.getItem("Data"));
        if (document.getElementById("nothing").style.display === "none")
        {
            setCardToView(index, data);
            let prev = document.getElementById("prev");
            let nxt = document.getElementById("next");
            prev.addEventListener("click", () => {
                if (index === 0) {
                    index = (Object.keys(data).length) - 1; 
                } else {
                    index--;
                }
                setCardToView(index, data);
            })
            nxt.addEventListener("click", () => {
                if (index === (Object.keys(data).length) - 1) {
                    index = 0;
                } else {
                    index++;
                }
                setCardToView(index, data);
            })
            let cvv = document.getElementById("cvv");
            cvv.addEventListener("click", () => {
                let value = data[Object.keys(data)[index]]["CVV"];
                navigator.clipboard.writeText(String(value))
            })
            let cards = document.getElementById("cards")
            cards.addEventListener("click", () => {
                window.location.reload()
            })
        }
    })
    .catch(error => console.error("Error : ", error))
})

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

function sharePage() {
    window.location.href = `/cards/share?card=${document.getElementById("cardNumber").innerText}`;
}

function removeCard() {
    if (confirm("Are You Sure You Want To Delete This Card ?\nDeleted Cards Cannot Be Recovered"))
    {
        let data = JSON.parse(localStorage.getItem("Data"));
        fetch("/api/cards/delete", {
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
            document.getElementById("notifierContent").innerHTML = data["Response"];
            document.getElementById("notifierx").style.display = "flex";
        })
        .catch(error => console.error("Error : ", error))
    }
}