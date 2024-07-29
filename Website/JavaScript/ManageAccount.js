import {fetchLocation} from "/static/JavaScript/Globals.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch(fetchLocation + "user/manage", {
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
        // Endpoint Response
        let res = data["Response"];
        // Unauthorized Device
        if (res === "Unauthorized Device") {
            alert("Unauthorized Device Found\nPlease Clear Browser Data\nIf Issue Persists\nPlease Contact Support");
            setTimeout(() => {
                window.location.href = "/";
            }, 200);
        }
        // Error Message
        else if (res === "Error") {
            alert("Something Went Wrong\nPlease Try Again\nIf Issue Persists Please Contact Support");
            setTimeout(() => {
                window.location.href = "/";
            }, 200);
        }
        // Set User Details
        document.getElementById("vendors").innerHTML = res["Vendors"];
        document.getElementById("userName").innerHTML = res["Name"];
        document.getElementById("devices").innerHTML = res["Devices"];
        document.getElementById("nodesCount").innerHTML = res["Nodes"];
        document.getElementById("cardsCount").innerHTML = res["Cards"];
        document.getElementById("avatar").setAttribute("src", `https://api.dicebear.com/8.x/initials/svg?seed=${res["Name"]}`)
        // Disable Loader
        setTimeout(() => {
            document.getElementById('loaderWrapper').style.display = "none";
            document.getElementById("idk").style.display = "flex";
        }, 400)
        // Logout Functionality
        let logout = document.getElementById("logout")
        logout.addEventListener("click", () => {
            if (confirm("Are You Sure You Want To Sign Out ?\nIf You Sign Out You Will Have To Login Again"))
            {
                // Set Notifier Content
                let notifier = document.getElementById("notifierx");
                document.getElementById("notifierContent").innerHTML = "Signing Out";
                document.getElementById("cox").setAttribute("name", "log-out-outline");
                notifier.style.display = "flex";
                // Fetch Endpoint
                fetch(fetchLocation + "api/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        uid: localStorage.getItem("DeviceUID")
                    })
                })
                .then(res => res.json())
                .then(data => {
                    // Logout Successful
                    if (data["Response"] === "S") {
                        // Rewrite Local Storage
                        localStorage.setItem("DeviceUID", "")
                        localStorage.setItem("LoggedIn", "false")
                        localStorage.setItem("Email", "")
                        localStorage.setItem("Data", "")
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 200)
                    } else {
                        // Logout Failed
                        alert("Log Out Failed Please Try Again")
                    }
                })
                .catch(error => console.error("Error : ", error))
            }
        })
    })
    .catch(error => {
        console.error("Error : ", error);
        setTimeout(() => {
            window.location.href = "/";
        }, 200)
    });
})