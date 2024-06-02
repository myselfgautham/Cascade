let url: string = "http://192.168.97.200:1920";
fetch(`${url}/account/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: "john@example.com",
        password: "Test@Example.1"
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
})
.catch(err => console.log(err));