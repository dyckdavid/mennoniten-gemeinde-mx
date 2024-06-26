// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, query, where } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import "firebase/database";
import { getStorage } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, auth, storage };
