/*
A Module Intended To Simplify The Flask API Part
Developed By Gautham Krishna
*/

async function fetchFlaskAPIOneWay(route) {
    const response = await fetch(route);
    if (!response.ok)
    {
        throw new Error('Network Response Was Not OK');
    }
    const data = await response.json();
    return data;
}

function fetchFlaskWithData(route, data) {
    return fetch(route, {
        method: "POST",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
        console.log("Error:", error);
        return null;
    });
}

export {fetchFlaskAPIOneWay, fetchFlaskWithData};