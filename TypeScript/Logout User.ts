let url: string = "http://192.168.97.200:1920";
fetch(`${url}/api/logout`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        uid: "Device UID"
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
})
.catch(err => console.log(err));