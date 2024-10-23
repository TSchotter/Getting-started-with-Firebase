// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth, connectAuthEmulator} from 'firebase/auth';                  //For the Login Authentication
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';   //For the Firestore Database


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "emulatortroytest.firebaseapp.com",
  databaseURL: "https://emulatortroytest-default-rtdb.firebaseio.com",
  projectId: "emulatortroytest",
  storageBucket: "emulatortroytest.appspot.com",
  messagingSenderId: "175938759275",
  appId: "1:175938759275:web:493401927a9e18fbba5f2e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

//If you're connecting via localhost, try to connect to emulator instead
if (window.location.hostname === 'localhost'){
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
}

export {app, db, auth}
