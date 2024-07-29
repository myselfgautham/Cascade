import {fetchLocation} from "/static/JavaScript/Globals.js"

// Device UID Check
const negatives = new Set([null, undefined, "null", false, "false", "undefined", ""]);
if (negatives.has(localStorage.getItem("DeviceUID")))
{
    // Fetch New UID Endpoint
    fetch(fetchLocation + "api/device", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
        // Set UID To LocalStorage
        localStorage.setItem("DeviceUID", data["Response"]);
        console.log("Device UID Created");
    })
    .catch(error => {
        console.error("Error : ", error);
        setTimeout(() => {
            window.location.href = "/";
        }, 200)
    });
}