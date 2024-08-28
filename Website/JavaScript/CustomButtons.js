const acc = document.getElementById("acc");
const cards = document.getElementById("cards");
const nodes = document.getElementById("nodes");

acc.addEventListener("click", () => window.location.href = "/user/manage");
cards.addEventListener("click", () => window.location.href = "/user/dashboard");
nodes.addEventListener("click", () => window.location.href = "/user/nodes");