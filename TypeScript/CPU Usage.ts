let url: string = "http://192.168.153.200:1920";
fetch(`${url}/api/cpu`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({})
})
.then(res => res.json())
.then(data => {
    console.log(data["Response"])
})
.catch(error => {
    console.error("Error : ", error);
})