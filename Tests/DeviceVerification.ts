let device: string = "DEVICE UNIQUE IDENTIFIER"
let address: string = "http://192.168.39.200:1920";

fetch(`${address}/api/verify/device`, {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({UID: device})
})
.then(response => response.json())
.then(payload => {
    console.log(payload)
})
.catch(error => console.error("Error : ", error))