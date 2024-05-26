import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-performance.js";

const firebaseConfig = {
    apiKey: "AIzaSyCDyvXeVLxNr3g8oYHu9EU1BU5pSofbpt8",
    authDomain: "swiftjs-development.firebaseapp.com",
    projectId: "swiftjs-development",
    storageBucket: "swiftjs-development.appspot.com",
    messagingSenderId: "396909879457",
    appId: "1:396909879457:web:b90b8c303d41a61c6fd0e0",
    measurementId: "G-X3X7TMXZQM"
};

try {
    const application = initializeApp(firebaseConfig);
    const analytics = getAnalytics(application);
    const performance = getPerformance(application);
    console.log("Firebase Initialised")
} catch {
    console.log("Firebase Failed To Initialise")
}