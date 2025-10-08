// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6USiyXpjciP-X8cEGERPlpxTE-hMxgOw",
  authDomain: "macro-precinct-430614-b7.firebaseapp.com",
  projectId: "macro-precinct-430614-b7",
  storageBucket: "macro-precinct-430614-b7.firebasestorage.app",
  messagingSenderId: "881315152927",
  appId: "1:881315152927:web:b220dace012d3f6856012a",
  measurementId: "G-8JJ0S01473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);