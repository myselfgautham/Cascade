import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-performance.js";

const firebaseConfig = {
    apiKey: "AIzaSyCDyvXeVLxNr3g8oYHu9EU1BU5pSofbpt8",
    authDomain: "swiftjs-development.firebaseapp.com",
    projectId: "swiftjs-development",
    storageBucket: "swiftjs-development.appspot.com",
    messagingSenderId: "396909879457",
    appId: "1:396909879457:web:ae7c737edc1368336fd0e0",
    measurementId: "G-X4ZX4VY8E2"
};

try {
    const application = initializeApp(firebaseConfig);
    const analytics = getAnalytics(application);
    const performance = getPerformance(application);
    console.log("Firebase Initialized")
} catch {
    console.log("Firebase Failed To Initialize")
}