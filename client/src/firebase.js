// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-estate-543de.firebaseapp.com",
  projectId: "mern-estate-543de",
  storageBucket: "mern-estate-543de.firebasestorage.app",
  messagingSenderId: "879211148740",
  appId: "1:879211148740:web:4a3c93a4cb41bf29bda091"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);