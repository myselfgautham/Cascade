function hideText() {
    const TextBox = document.getElementById("text");
    if (TextBox.className === "wrapper") {
        TextBox.className = "hidden";
    }
    else {
        TextBox.className = "wrapper";
    }
}