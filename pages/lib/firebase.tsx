// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const analytics = () => getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage(app);




