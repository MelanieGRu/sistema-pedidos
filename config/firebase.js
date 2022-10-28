import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZqFX7WQuCJD0N9nUa45z48ZK_DkirdAQ",
  authDomain: "consultorio-firebase-6ab14.firebaseapp.com",
  projectId: "consultorio-firebase-6ab14",
  storageBucket: "consultorio-firebase-6ab14.appspot.com",
  messagingSenderId: "310337869006",
  appId: "1:310337869006:web:55c203539569e1735bec9f",
  measurementId: "G-TPH3XGHQRD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
