window.addEventListener("load", () => {
    if (
        (localStorage.getItem("Email") === null) &&
        (localStorage.getItem("LoggedIn") !== "true")
    ) {
        console.log("User Not Logged In");
        window.location.href = "/";
    }
})

document.addEventListener("DOMContentLoaded", () => {
    fetch("/analytics", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": localStorage.getItem("Email")
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data["Response"] === "Something Went Wrong") {
            handleDisputes()
        } else {
            let dataFetched = data["Response"];
            if ((dataFetched === null) || (dataFetched === undefined)) {
                handleDisputes()
            } else {
                document.getElementById("loader").style.display = "none"
                document.getElementById("cards").innerHTML = dataFetched["Cards Issued"]
                document.getElementById("root").style.display = "flex";
            }
        }
    })
})

function handleDisputes() {
    alert("Something Went Wrong With Our Servers\nPlease Try Again Later\nYou Will Now Be Redirected");
    setTimeout(() => {
        window.location.href = "/dashboard";
    }, 200);
}