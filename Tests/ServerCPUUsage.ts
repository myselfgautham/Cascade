let server: string = "http://192.168.39.200:1920";

fetch(`${server}/api/usage`, {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({})
})
.then(response => response.json())
.then(payload => console.log(payload))
.catch(error => console.error("Error : ", error))