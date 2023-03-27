// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFODi5Tp26vIs6c64OxzI6LCOG7cFtgOI",
  authDomain: "evangadi-forums.firebaseapp.com",
  projectId: "evangadi-forums",
  storageBucket: "evangadi-forums.appspot.com",
  messagingSenderId: "425751743010",
  appId: "1:425751743010:web:2f6f9fa05ddc076b10987b",
  measurementId: "G-ZN0KCPNX0F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };

// Project Console: https://console.firebase.google.com/project/clone-b93f5/overview

// my project
// Hosting URL: https://clone-b93f5.web.app/
