// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth';                      //For the Login Authentication
import {getFirestore} from 'firebase/firestore';            //For the Firestore Database


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi_-tPpQlVxraL1v_ptb8yALXaADEskGQ",
  authDomain: "slideexample.firebaseapp.com",
  projectId: "slideexample",
  storageBucket: "slideexample.appspot.com",
  messagingSenderId: "146845361318",
  appId: "1:146845361318:web:8bf814e3e05a17926c4067"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Export them all so that your app can access them
export const auth = getAuth(app);
export const db = getFirestore(app);