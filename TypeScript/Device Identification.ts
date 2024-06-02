let url: string = "http://192.168.97.200:1920";
fetch(`${url}/api/device`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({})
})
.then(res => res.json())
.then(data => {
    console.log(data);
})
.catch(error => console.log(error))