let url: string = "SERVER_URL";
fetch(`${url}/api/cards`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: "EMAIL",
        uid: "DEVICE_UID"
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
})
.catch(err => console.log(err));