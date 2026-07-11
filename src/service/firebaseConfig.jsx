// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXVAmOP65bAd1kvmPZVJR5-wTTidcsU1s",
  authDomain: "nextstop-11567.firebaseapp.com",
  projectId: "nextstop-11567",
  storageBucket: "nextstop-11567.firebasestorage.app",
  messagingSenderId: "674357353623",
  appId: "1:674357353623:web:453a2672d2a18fd8fa5dd2",
  measurementId: "G-8FTHR8TWGF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
