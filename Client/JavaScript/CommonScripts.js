// Hides Element (Mostly Text) In A Document
function hideText(ID,CLASS) {
    var ELEMENT = document.getElementById(ID);
    if (ELEMENT.className === CLASS) {
        ELEMENT.className = "hidden";
    }
    else {
        ELEMENT.className = CLASS;
    }
}