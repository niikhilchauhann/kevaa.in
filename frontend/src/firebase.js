import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2e51fKS5aAjMOZrJTr_NWX_3flYKtPGc",
  authDomain: "kevaa-app.firebaseapp.com",
  projectId: "kevaa-app",
  storageBucket: "kevaa-app.firebasestorage.app",
  messagingSenderId: "1054341373002",
  appId: "1:1054341373002:web:2763f4c109af32040c1ab3",
  measurementId: "G-HL9KMR2DMH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
  