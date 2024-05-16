let user: string = "gauthamkrishnav@icloud.com"
let address: string = "http://192.168.39.200:1920";

fetch(`${address}/api/user`, {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({Email: user})
})
.then(response => response.json())
.then(payload => {
    console.log(payload)
})
.catch(error => console.error("Error : ", error))