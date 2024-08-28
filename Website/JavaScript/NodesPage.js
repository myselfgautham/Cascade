import { fetchLocation, checkLocalStoragePermission } from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();

function updateUIWithNodes(nodesData) {
    const nodes = JSON.parse(nodesData);

    if (Object.keys(nodes).length === 0) {
        document.getElementById("loader").style.display = "none";
        document.getElementById("nothing").style.display = "flex";
    } else if (Object.keys(nodes).length === 1) {
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
        }, 200);
        let index = 0;
        let max = Object.keys(nodes).length - 1;
        setItemToView(index);

        document.getElementById("prev").addEventListener("click", () => {
            if (index === 0) {
                index = max;
            } else {
                index--;
            }
            setItemToView(index);
        });

        document.getElementById("next").addEventListener("click", () => {
            if (index === max) {
                index = 0;
            } else {
                index++;
            }
            setItemToView(index);
        });
    }
}

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
    if (data["Response"] === "Unauthorized Device") {
        alert("Unauthorized Device Found\nPlease Clear Browser Data\nIf Issue Persists\nPlease Contact Support");
        setTimeout(() => {
            window.location.href = "/";
        }, 200);
    } else if (data["Response"] === "Error") {
        alert("Something Went Wrong\nPlease Try Again\nIf Issue Persists Please Contact Support");
        setTimeout(() => {
            window.location.href = "/";
        }, 200);
    } else {
        localStorage.setItem("Nodes", JSON.stringify(data["Response"]));
        updateUIWithNodes(JSON.stringify(data["Response"]));
    }
})
.catch(error => {
    console.error("Error : ", error);
    setTimeout(() => {
        window.location.href = "/";
    }, 200);
});

function setItemToView(index) {
    let nodes = JSON.parse(localStorage.getItem("Nodes"));
    let keys = Object.keys(nodes);

    if (keys.length === 0) return;

    let key = keys[index];
    document.getElementById("number").innerText = key;
    document.getElementById("user").innerHTML = nodes[key]["User Real Name"];

    if (nodes[key]["Common Name"] !== undefined) {
        document.getElementById("common").style.display = "block";
        document.getElementById("common").innerHTML = nodes[key]["Common Name"];
    } else {
        document.getElementById("common").style.display = "none";
    }

    if (nodes[key]["Branding Image"] !== undefined) {
        document.getElementById("logoM").setAttribute("src", nodes[key]["Branding Image"]);
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
                        window.location.reload();
                    }, 600);
                } else {
                    throw new Error("Something Went Wrong");
                }
            })
            .catch(error => {
                console.error("Error : ", error);
                document.getElementById("notifierContent").innerHTML = "Something Went Wrong";
                document.getElementById("notifierx").style.display = "flex";
            });
        }
    }
}

document.getElementById("remove-outline").addEventListener("click", () => {
    removeNode();
});