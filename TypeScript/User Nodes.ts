let url: string = "http://192.168.114.200:1920";
fetch(`${url}/user/nodes`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email: "gauthamkrishnav@icloud.com",
        uid: "7aef2e78-b037-4482-ab1c-d5e15a46e97a"
    })
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});