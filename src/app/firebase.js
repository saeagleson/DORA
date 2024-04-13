// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD6G8RTTs4MkPxBQsDJh9iM9HPtrkn2040",
    authDomain: "dora-app-3f4de.firebaseapp.com",
    projectId: "dora-app-3f4de",
    storageBucket: "dora-app-3f4de.appspot.com",
    messagingSenderId: "634536800749",
    appId: "1:634536800749:web:e392064b00b3e3099337e4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {app, firestore, auth};