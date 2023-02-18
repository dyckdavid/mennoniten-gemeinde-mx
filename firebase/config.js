// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZTs1SKfx2J8k-RLBXJ7RT8Lp93d0k5B8",
    authDomain: "mennoniten-gemeinde-797ac.firebaseapp.com",
    projectId: "mennoniten-gemeinde-797ac",
    storageBucket: "mennoniten-gemeinde-797ac.appspot.com",
    messagingSenderId: "231523817643",
    appId: "1:231523817643:web:a708dde12e10b80ad87fee",
    measurementId: "G-JRJXL0PQZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }

export const auth = getAuth();

