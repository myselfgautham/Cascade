let url: string = "http://192.168.97.200:1920";
fetch(`${url}/cards/share`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: "Party Email Address",
        uid: "Device UID",
        card: "Card Number As Integer"
    })
})
.then(response => response.json())
.then(json => {
    console.log(json);
})
.catch(err => console.log(err));