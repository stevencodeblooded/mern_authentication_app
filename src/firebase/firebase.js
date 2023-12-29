import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernauthapp.firebaseapp.com",
  projectId: "mernauthapp",
  storageBucket: "mernauthapp.appspot.com",
  messagingSenderId: "835893223593",
  appId: "1:835893223593:web:c2a448557f446f8da1c9b8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);