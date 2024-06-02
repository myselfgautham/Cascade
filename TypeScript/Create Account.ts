let url: string = "http://192.168.97.200:1920";
fetch(`${url}/account/create`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        phone: "+12138636476",
        password: "Test@Example.1"
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
})
.catch(err => console.log(err));