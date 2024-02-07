// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b6557.firebaseapp.com",
  projectId: "mern-estate-b6557",
  storageBucket: "mern-estate-b6557.appspot.com",
  messagingSenderId: "1077749916674",
  appId: "1:1077749916674:web:6c72b8bbe04759152bf31b",
  measurementId: "G-DN076EJ8VG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);