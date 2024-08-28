import { fetchLocation, checkLocalStoragePermission } from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();

const negatives = new Set([null, undefined, "null", false, "false", "undefined", ""]);
const deviceUID = localStorage.getItem("DeviceUID");

if (negatives.has(deviceUID)) {
    fetch(fetchLocation + "api/device", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("DeviceUID", data.Response);
        console.log("Device UID Created");
    })
    .catch(error => {
        console.error("Error:", error);
        setTimeout(() => window.location.href = "/", 200);
    });
}