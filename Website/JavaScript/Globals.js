// Input Null Safety Check Function
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

// Email Check Regex
export function plausibleEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
}

// Valid E164 Phone Number Check
export function isValidE164PhoneNumber(phoneNumber) {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phoneNumber);
}

// Strong Password Test
export function isStrongPassword(password) {
    return (
      typeof password === 'string' &&
      password.length >= 8 &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    );
}

// Global Fetch Location
export let fetchLocation = "/";

// Local Storage Permissions Manager
export function checkLocalStoragePermission() {
    if (localStorage.getItem("cookiesAccepted") === null) {
        throw new Error("LocalStorage Permissions Not Granted");
    }
}