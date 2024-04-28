function hideText() {
    const TextBox = document.getElementById("text");
    if (TextBox.className === "text") {
        TextBox.className = "hidden";
    }
    else {
        TextBox.className = "text";
    }
}