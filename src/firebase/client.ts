// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHM_nDHs0OoJ_XGmWEAPQwtaXtyJs3OZE",
  authDomain: "synthera-1fcd0.firebaseapp.com",
  projectId: "synthera-1fcd0",
  storageBucket: "synthera-1fcd0.firebasestorage.app",
  messagingSenderId: "563699586584",
  appId: "1:563699586584:web:0c589b27ae7a9b55be556d",
  measurementId: "G-ED9ZXZ2PX8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);