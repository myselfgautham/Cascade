// Accounts Page
let acc = document.getElementById("acc");
acc.addEventListener("click", () => {
    window.location.href = "/user/manage"; 
})

// Cards Page
let cards = document.getElementById("cards");
cards.addEventListener('click', () => {
    window.location.href = "/user/dashboard";
})

// Nodes Manager Page
let Nodes = document.getElementById("nodes");
Nodes.addEventListener("click", () => {
    window.location.href = "/user/nodes";
})