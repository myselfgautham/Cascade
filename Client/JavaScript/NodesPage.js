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
    if (data["Response"] === "Unauthorized Device") {
        alert("Unauthorized Device Found\nPlease Clear Browser Data\nIf Issue Persists\nPlease Contact Support")
        setTimeout(() => {
            window.location.href = "/"
        }, 200)
    } else if (data["Response"] === "Error") {
        alert("Something Went Wrong\nPlease Try Again\nIf Issue Persists Please Contact Support");
        setTimeout(() => {
            window.location.href = "/";
        }, 200);
    }
})
.catch(error => console.error("Error : ", error));