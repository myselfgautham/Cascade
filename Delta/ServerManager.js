const servers = {
    Main: "http://192.168.16.200:1920/api/usage"
};

const pingDelay = (1) * 1000;

function setCPU(value, id)
{
    var x = document.getElementById(id);
    x.innerText = value;
    if (value <= 50)
    {
        x.style.borderColor = "green";
    }
    else if (value <= 79)
    {
        x.style.borderColor = "yellow";
    }
    else {
        x.style.borderColor = "red";
    }
}

function fetchCPU(url, id) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        setCPU(data.Usage,id)
    })
    .catch(console.log("Error Happened While Fetching API Endpoint"))
}

setInterval(() => fetchCPU(servers.Main,"usageMain"),pingDelay);