let flags = {
    "CVV": false,
    "Encrypt": false,
    "Verification": false
};

function plausibleEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

function validDatesGiven(date) {
    if ((date.length === 7) || (date === "NA")) {
        return true
    }
    return false;
}

function isValidCVV(cvv) {
    if ((cvv >= 100) || (cvv <= 999)) {
        return true;
    }
    return false;
}

function isValidCardNumber(number) {
    let numberx = number.split(" ");
    if (numberx.length === 4) {
        let valid = true;
        numberx.forEach(element => {
            if (element.length !== 4) {
                valid = false;
            }
        });
        return valid;
    }
    return false;
}

function toggleFlagsInSystem(argument) {
    let fields = document.querySelectorAll("ion-icon.fl");
    switch (argument) {
        case 1:
            flags.CVV = !flags.CVV;
            if (flags.CVV) {
                fields[0].style.color = "green";
                document.getElementById("cvvField").style.display = "flex";
            } else {
                fields[0].style.color = "white";
                document.getElementById("cvvField").style.display = "none";
            }
            break;
        case 2:
            flags.Encrypt = !flags.Encrypt;
            if (flags.Encrypt) {
                fields[1].style.color = "green";
            } else {
                fields[1].style.color = "white";
            }
            break;
        case 3:
            flags.Verification = !flags.Verification;
            if (flags.Verification) {
                fields[2].style.color = "green";
            } else {
                fields[2].style.color = "white";
            }
            break;
        default:
            break;
    }
}

function isValidCVV(cvv) {
    cvv = parseInt(cvv);
    if (isNaN(cvv)) {
        return false
    } else if (!((cvv >= 100) && (cvv <= 999))) {
        return false
    }
    return true
}

let note = document.getElementById("note");
let submit = document.getElementById("submit")
submit.addEventListener("click", () => {
    let inputs = document.querySelectorAll("input");
    let allFilled = true;
    for (let i = 0; i < 4; i++) {
        if (inputs[i].value === "") {
            allFilled = false;
        }
    }
    if (flags.CVV) {
        if (inputs[4].value === "") {
            allFilled = false;
        }
    }
    if (!allFilled) {
        note.innerHTML = "Please Fill In All Fields";
        note.style.color = "red";
        note.style.display = "block";
    } else if (!isValidCardNumber(inputs[0].value)) {
        note.innerHTML = "Invalid Card Number";
        note.style.color = "red";
        note.style.display = "block";
    } else if (!validDatesGiven(inputs[1].value)) {
        note.innerHTML = "Invalid From Date";
        note.style.color = "red";
        note.style.display = "block";
    } else if (!validDatesGiven(inputs[2].value)) {
        note.innerHTML = "Invalid To Date";
        note.style.color = "red";
        note.style.display = "block";
    } else if ((flags.CVV) && !(isValidCVV(inputs[4].value))) {
        note.innerHTML = "Please Enter A Valid CVV";
        note.style.color = "red";
        note.style.display = "block";
    } else {
        note.innerHTML = "Please Wait";
        note.style.color = "green";
        note.style.display = "block";
        fetch("/cards/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                flags: flags,
                cardNumber: inputs[0].value,
                from: inputs[1].value,
                till: inputs[2].value,
                owner: inputs[3].value,
                cvv: inputs[4].value,
                vendor: localStorage.getItem("Email")
            })
        })
        .then(res => res.json())
        .then(data => {
            note.innerHTML = data["Response"];
            if (data["Response"] === "Card Created Successfully") {
                note.style.color = "green";
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 800)
            } else {
                note.style.color = "red";
            }
            note.style.display = "block";
        })
        .catch(error => console.error("Error : ", error))
    }
})