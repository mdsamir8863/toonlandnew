// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF2YCGKAfyEwvEAtqVuLsbjY4A6z8A5GI",
  authDomain: "toonland-1007a.firebaseapp.com",
  projectId: "toonland-1007a",
  storageBucket: "toonland-1007a.appspot.com",
  messagingSenderId: "724505599598",
  appId: "1:724505599598:web:f30ef84364adf456ca507f",
  measurementId: "G-PLQ6HP0TC8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
