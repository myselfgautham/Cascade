import {fetchLocation} from "/static/JavaScript/Globals.js"

// Fetch Nodes POST API
fetch(fetchLocation + "user/nodes", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        uid: localStorage.getItem("DeviceUID"),
        email: localStorage.getItem("Email")
    })
})
.then(response => response.json())
.then(data => {
    // Unauthorized Device
    if (data["Response"] === "Unauthorized Device") {
        alert("Unauthorized Device Found\nPlease Clear Browser Data\nIf Issue Persists\nPlease Contact Support")
        setTimeout(() => {
            window.location.href = "/"
        }, 200)
    }
    // Error Response
    else if (data["Response"] === "Error") {
        alert("Something Went Wrong\nPlease Try Again\nIf Issue Persists Please Contact Support");
        setTimeout(() => {
            window.location.href = "/";
        }, 200);
    }
    // Successful Fetch
    else {
        localStorage.setItem("Nodes", JSON.stringify(data["Response"]))
    }
})
.catch(error => {
    console.error("Error : ", error);
    setTimeout(() => {
        window.location.href = "/";
    }, 200)
});

if (Object.keys(JSON.parse(localStorage.getItem("Nodes"))).length === 0)
{
    document.getElementById("loader").style.display = "none";
    document.getElementById("nothing").style.display = "flex";
} else if (Object.keys(JSON.parse(localStorage.getItem("Nodes"))).length === 1) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("controls").style.display = "none";
    setTimeout(() => {
        document.getElementById("root").style.display = "flex";
    }, 200);
    setItemToView(0);
} else {
    document.getElementById("loader").style.display = "none";
    setTimeout(() => {
        document.getElementById("root").style.display = "flex";
    }, 200)
    let index = 0;
    let max = Object.keys(JSON.parse(localStorage.getItem("Nodes"))).length - 1;
    setItemToView(index);
    let previous = document.getElementById("prev");
    previous.addEventListener("click", () => {
        if (index === 0) {
            index = max;
        } else {
            index--;
        }
        setItemToView(index);
    })
    let next = document.getElementById("next");
    next.addEventListener("click", () => {
        if (index === max) {
            index = 0;
        } else {
            index++;
        }
        setItemToView(index);
    })
}

function setItemToView(index) {
    let keys = Object.keys(JSON.parse(localStorage.getItem("Nodes")));
    document.getElementById("number").innerText = keys[index]
    let data = JSON.parse(localStorage.getItem("Nodes"));
    document.getElementById("user").innerHTML = data[keys[index]]["User Real Name"];
    if (data[keys[index]]["Common Name"] !== undefined)
    {
        document.getElementById("common").style.display = "block";
        document.getElementById("common").innerHTML = data[keys[index]]["Common Name"];
    } else {
        document.getElementById("common").style.display = "none";
    }
    if (data[keys[index]]["Branding Image"] !== undefined) {
        document.getElementById("logoM").setAttribute("src", data[keys[index]]["Branding Image"])
    } else {
        document.getElementById("logoM").setAttribute("src", "/static/Assets/Nodes.svg");
    }
}

function copyToClipboard() {
    try {
        navigator.clipboard.writeText(document.getElementById("number").innerText);
        document.getElementById("notifierContent").innerHTML = "Text Copied";
        document.getElementById("notifierx").style.display = "flex";
    } catch {
        console.log("Clipboard Copying Failed");
    }
}

function removeNode() {
    if (confirm("Are You Sure You Want To Delete This Node\nDeleted Nodes Cannot Never Be Recovered")) {
        let node = document.getElementById("number").innerText;
        if (node === "") {
            document.getElementById("notifierContent").innerHTML = "No Nodes Found";
            document.getElementById("notifierx").style.display = "flex";
        } else {
            fetch(fetchLocation + "user/nodes/remove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid: localStorage.getItem("DeviceUID"),
                    email: localStorage.getItem("Email"),
                    node: node
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data["Response"] === "S") {
                    document.getElementById("notifierContent").innerHTML = "Node Removed";
                    document.getElementById("notifierx").style.display = "flex";
                    setTimeout(() => {
                        window.location.reload()
                    }, 600)
                } else {
                    throw new Error("Something Went Wrong");
                }
            })
            .catch((error) => {
                console.error("Error : ", error);
                document.getElementById("notifierContent").innerHTML = "Something Went Wrong";
                document.getElementById("notifierx").style.display = "flex";
            })
        }
    }
}