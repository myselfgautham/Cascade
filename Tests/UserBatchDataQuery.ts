let users: readonly string[] = new Array(
    "gauthamkrishnav@icloud.com",
    "gauthamkrishnaoct@gmail.com"
)

let address: string = "http://192.168.39.200:1920";
let count = 0;

users.forEach(element => {
    fetch(`${address}/api/user`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({Email: element})
    })
    .then(response => response.json())
    .then(payload => {
        console.log(`User Query ${count} ->\n`);
        console.log(payload, "\n");
        count++;
    })
    .catch(error => console.error("Error : ", error))
})