let url: string = "SERVER_URL";
fetch(`${url}/user/manage`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: "EMAIL"
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
})
.catch(err => console.log(err));