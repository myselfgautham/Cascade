document.addEventListener("DOMContentLoaded", () => {
    fetch("/user/manage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: localStorage.getItem("Email")
        })
    })
    .then(res => res.json())
    .then(data => {
        let res = data["Response"];
        document.getElementById("userName").innerHTML = res["Name"];
        document.getElementById("devices").innerHTML = res["Devices"];
        document.getElementById("cardsCount").innerHTML = res["Cards"];
        document.getElementById("avatar").setAttribute("src", `https://api.dicebear.com/8.x/initials/svg?seed=${res["Name"]}`)
        setTimeout(() => {
            document.getElementById('loaderWrapper').style.display = "none";
            document.getElementById("idk").style.display = "flex";
        }, 400)
        let cards = document.getElementById("cards");
        cards.addEventListener('click', () => {
            window.location.href = "/user/dashboard";
        })
        let acc = document.getElementById("acc");
        acc.addEventListener("click", () => {
            window.location.reload();
        })
        let logout = document.getElementById("logout")
        logout.addEventListener("click", () => {
            if (confirm("Are You Sure You Want To Sign Out ?\nIf You Sign Out You Will Have To Login Again"))
            {
                fetch("/api/logout", {
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
                    if (data["Response"] === "S") {
                        localStorage.setItem("DeviceUID", "")
                        localStorage.setItem("LoggedIn", "false")
                        localStorage.setItem("Email", "")
                        localStorage.setItem("Data", "")
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 200)
                    } else {
                        alert("Log Out Failed Please Try Again")
                    }
                })
                .catch(error => console.error("Error : ", error))
            }
        })
    })
    .catch(error => console.error("Error : ", error))
})