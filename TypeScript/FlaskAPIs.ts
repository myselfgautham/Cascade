// Get UID From Flask
async function getUIDFromFlask()
{
    try
    {
        const response = await fetch('/api/getUID');
        if (!response.ok)
        {
            throw new Error('Bad Network Response');
        }
        const data = await response.json();
        return data;
    }
    catch (error)
    {
        console.error('There Was A Problem With The Request :', error);
    }
}

// Send Cookies To Flask
function sendCookiesToFlask(cookies: {})
{
    fetch("/api/receiveCookies", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cookies)
    })
    .then (response => response.json())
    .then (data => {
        console.log("Response : ",data);
    })
    .catch (error => {
        console.log("Error : ",error);
    })
}