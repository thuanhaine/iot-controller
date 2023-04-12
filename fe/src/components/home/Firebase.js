// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REDIRECT_API_KEY,
  authDomain: "iot2023-ee39e.firebaseapp.com",
  databaseURL: "https://iot2023-ee39e-default-rtdb.firebaseio.com",
  projectId: "iot2023-ee39e",
  storageBucket: "iot2023-ee39e.appspot.com",
  messagingSenderId: "794s173369284",
  appId: "1:794173369284:web:3b1ea1eea553f812421291",
  measurementId: "G-8QXBG5EMX6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase = getDatabase(app);
