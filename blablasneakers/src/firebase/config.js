// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDftHauj3aujDDfjjg0qQzlzUXhC0kiDyM",
  authDomain: "blablasneakers-53b20.firebaseapp.com",
  projectId: "blablasneakers-53b20",
  storageBucket: "blablasneakers-53b20.appspot.com",
  messagingSenderId: "614554299423",
  appId: "1:614554299423:web:fefc8ebf038b9c8f28f92a",
  measurementId: "G-FBNDDNEJ91",
  databaseURL:
    "https://blablasneakers-53b20-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export {
  auth,
  db,
};
