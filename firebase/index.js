// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDQiJ_WlvwqTKLp1voR4DheGPh2FawKcg4",
    authDomain: "data-driven-full-stack-a-c1cc4.firebaseapp.com",
    projectId: "data-driven-full-stack-a-c1cc4",
    storageBucket: "data-driven-full-stack-a-c1cc4.appspot.com",
    messagingSenderId: "97064426475",
    appId: "1:97064426475:web:291f8191808bc0870d17ae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };