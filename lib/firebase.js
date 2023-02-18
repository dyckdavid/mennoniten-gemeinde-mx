import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Add your Firebase project configuration here
  apiKey: "AIzaSyDZTs1SKfx2J8k-RLBXJ7RT8Lp93d0k5B8",
    authDomain: "mennoniten-gemeinde-797ac.firebaseapp.com",
    projectId: "mennoniten-gemeinde-797ac",
    storageBucket: "mennoniten-gemeinde-797ac.appspot.com",
    messagingSenderId: "231523817643",
    appId: "1:231523817643:web:a708dde12e10b80ad87fee",
    measurementId: "G-JRJXL0PQZH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;