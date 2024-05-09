const servers = {
    Main: "http://192.168.43.189:1920/api/usage"
};

const pingDelay = (1) * 1000;
var notifier = document.getElementById("note");
var audio = document.getElementById("audio");

function setCPU(value, id)
{
    var x = document.getElementById(id);
    x.innerText = value;
    if (value <= 50)
    {
        x.style.borderColor = "green";
        notifier.innerText = "Balanced Load";
        notifier.style.color = "green";
    }
    else if (value <= 79)
    {
        x.style.borderColor = "yellow";
        notifier.innerText = "Moderate Load";
        notifier.style.color = "yellow";
    }
    else {
        x.style.borderColor = "red";
        notifier.innerText = "Extreme Load";
        notifier.style.color = "red";
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
        audio.pause();
        notifier.style.color = "white";
        buffer = data.Usage;
        setCPU(data.Usage,id)
    })
    .catch(() => {
        if (buffer == "") {
            console.log("Error Happened While Fetching");
        }
        else {
            document.getElementById("mainName").style.color = "orange";
            notifier.innerText = "Server Down"
            notifier.style.color = "red";
            notifier.style.animation = "blink 1s infinite";
            audio.play();
        }
    })
    let buffer;
}

setInterval(() => fetchCPU(servers.Main,"usageMain"),pingDelay);