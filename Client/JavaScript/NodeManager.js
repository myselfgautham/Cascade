fetch("/user/nodes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        uid: localStorage.getItem("DeviceUID"),
        email: localStorage.getItem("Email")
    })
})
.then(res => res.json())
.then(data => {})
.catch(error => console.error("Error : ", error))