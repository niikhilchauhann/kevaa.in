// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFmXDHFmy3TpNuIhZb7v1xJsBYUOogp2E",
  authDomain: "kevaa-platform.firebaseapp.com",
  projectId: "kevaa-platform",
  storageBucket: "kevaa-platform.firebasestorage.app",
  messagingSenderId: "67340750185",
  appId: "1:67340750185:web:6e8cba2c9b70576d8d01f8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
