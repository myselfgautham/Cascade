import { fetchLocation, checkLocalStoragePermission } from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();

document.addEventListener("DOMContentLoaded", () => {
    fetch(fetchLocation + "user/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: localStorage.getItem("Email"),
            uid: localStorage.getItem("DeviceUID")
        })
    })
    .then(res => res.json())
    .then(data => {
        const res = data["Response"];
        
        if (res === "Unauthorized Device") {
            alert("Unauthorized Device Found\nPlease Clear Browser Data\nIf Issue Persists\nPlease Contact Support");
            setTimeout(() => window.location.href = "/", 200);
            return;
        }

        if (res === "Error") {
            alert("Something Went Wrong\nPlease Try Again\nIf Issue Persists Please Contact Support");
            setTimeout(() => window.location.href = "/", 200);
            return;
        }

        document.getElementById("vendors").innerHTML = res["Vendors"];
        document.getElementById("userName").innerHTML = res["Name"];
        document.getElementById("devices").innerHTML = res["Devices"];
        document.getElementById("nodesCount").innerHTML = res["Nodes"];
        document.getElementById("cardsCount").innerHTML = res["Cards"];
        document.getElementById("avatar").setAttribute("src", `https://api.dicebear.com/8.x/initials/svg?seed=${res["Name"]}`);

        setTimeout(() => {
            document.getElementById('loaderWrapper').style.display = "none";
            document.getElementById("idk").style.display = "flex";
        }, 400);

        document.getElementById("logout").addEventListener("click", () => {
            if (confirm("Are You Sure You Want To Sign Out?\nIf You Sign Out You Will Have To Login Again")) {
                const notifier = document.getElementById("notifierx");
                document.getElementById("notifierContent").innerHTML = "Signing Out";
                document.getElementById("cox").setAttribute("name", "log-out-outline");
                notifier.style.display = "flex";

                fetch(fetchLocation + "api/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ uid: localStorage.getItem("DeviceUID") })
                })
                .then(res => res.json())
                .then(data => {
                    if (data["Response"] === "S") {
                        localStorage.clear();
                        setTimeout(() => window.location.href = "/", 200);
                    } else {
                        alert("Log Out Failed Please Try Again");
                    }
                })
                .catch(error => console.error("Error:", error));
            }
        });

        document.getElementById("clearLocalStorage").addEventListener("click", () => {
            if (confirm("Are You Sure That You Want To Clear LocalStorage\nYou Will Have To Login Again")) {
                localStorage.clear();
                setTimeout(() => window.location.href = '/', 200);
            }
        });
    })
    .catch(error => {
        console.error("Error:", error);
        setTimeout(() => window.location.href = "/", 200);
    });
});