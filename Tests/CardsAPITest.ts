let email: string = "gauthamkrishnaoct@gmail.com";
let address: string = "http://192.168.39.200:1920";

fetch(`${address}/api/cards`, {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({Email: email})
})
.then(response => response.json())
.then(payload => {
    let count = 0;
    payload.Result.forEach(element => {
        console.log(`\nCard ${count} ->\n`)
        console.log(element, "\n");
        count++;
    });
})
.catch(error => console.error("Error : ", error))