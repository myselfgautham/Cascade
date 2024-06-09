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