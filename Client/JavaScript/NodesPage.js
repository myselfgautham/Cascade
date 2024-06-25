// Fetch Nodes POST API
fetch("/user/nodes", {
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
        const nodes = data["Response"];
    }
})
.catch(error => console.error("Error : ", error));