// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// ✅ Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6USiyXpjciP-X8cEGERPlpxTE-hMxgOw",
  authDomain: "macro-precinct-430614-b7.firebaseapp.com",
  projectId: "macro-precinct-430614-b7",
  // ❌ wrong: "macro-precinct-430614-b7.firebasestorage.app"
  // ✅ correct:
  storageBucket: "macro-precinct-430614-b7.appspot.com",
  messagingSenderId: "881315152927",
  appId: "1:881315152927:web:b220dace012d3f6856012a",
  measurementId: "G-8JJ0S01473",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional analytics (only works in browsers with measurement enabled)
const analytics = getAnalytics(app);

// ✅ Initialize and export storage
export const storage = getStorage(app);