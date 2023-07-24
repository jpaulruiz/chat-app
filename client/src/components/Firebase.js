// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1CAwHdUwElV3KitdyeJB0aCtxrLaUsZQ",
  authDomain: "chat-app-1c02b.firebaseapp.com",
  projectId: "chat-app-1c02b",
  storageBucket: "chat-app-1c02b.appspot.com",
  messagingSenderId: "487684024333",
  appId: "1:487684024333:web:af163fdadb206f963a8d44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const updateprofile = updateProfile;
export const authChanged = onAuthStateChanged;