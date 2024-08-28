export function inputFilterCheck() {
    const inputs = document.querySelectorAll("input");
    for (const input of inputs) {
        if (input.value === "") return false;
    }
    return true;
}

export function plausibleEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isValidE164PhoneNumber(phoneNumber) {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phoneNumber);
}

export function isStrongPassword(password) {
    return (
        typeof password === 'string' &&
        password.length >= 8 &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    );
}

export const fetchLocation = "/";

export function checkLocalStoragePermission() {
    if (localStorage.getItem("cookiesAccepted") === null) {
        throw new Error("LocalStorage Permissions Not Granted");
    }
}