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

export {fetchFlaskAPIOneWay};