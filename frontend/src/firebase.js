// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dallas-dosa.firebaseapp.com",
  projectId: "dallas-dosa",
  storageBucket: "dallas-dosa.appspot.com",
  messagingSenderId: "266398722853",
  appId: "1:266398722853:web:ba629bc007f40b791048cc",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
