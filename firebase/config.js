// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
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
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
