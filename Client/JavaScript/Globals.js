export function inputFilterCheck() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++)
    {
        if (inputs[i].value === "") {
            return false
        } else if (inputs[i].value === inputs[inputs.length - 1].value) {
            return true
        }
    }
}