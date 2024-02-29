// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-a-ykjBQWjMkNSwSh-H2E5fZW7pW2tn4",
  authDomain: "todo-list-fbba7.firebaseapp.com",
  projectId: "todo-list-fbba7",
  storageBucket: "todo-list-fbba7.appspot.com",
  messagingSenderId: "736620548580",
  appId: "1:736620548580:web:cb1d08f92e2296e1e977f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Authentication
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
