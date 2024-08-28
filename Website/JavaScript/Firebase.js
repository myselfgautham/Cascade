import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";
import { getPerformance } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-performance.js";
import { checkLocalStoragePermission } from "/static/JavaScript/Globals.js";

checkLocalStoragePermission();

const firebaseConfig = {
    apiKey: "AIzaSyCDyvXeVLxNr3g8oYHu9EU1BU5pSofbpt8",
    authDomain: "swiftjs-development.firebaseapp.com",
    projectId: "swiftjs-development",
    storageBucket: "swiftjs-development.appspot.com",
    messagingSenderId: "396909879457",
    appId: "1:396909879457:web:47e323aa1ca83f686fd0e0",
    measurementId: "G-REWZSYLBHN"
};

try {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    getPerformance(app);
    console.log("Firebase Initialized");
} catch (error) {
    console.error("Firebase Failed To Initialize:", error);
}