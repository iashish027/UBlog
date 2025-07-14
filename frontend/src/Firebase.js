// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ublog-3695f.firebaseapp.com",
  projectId: "ublog-3695f",
  storageBucket: "ublog-3695f.firebasestorage.app",
  messagingSenderId: "111983809177",
  appId: "1:111983809177:web:ab132f95c2f9327564de08",
  measurementId: "G-WEHC0R5JC0",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
