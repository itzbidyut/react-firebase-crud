import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "react-todo-724a0.firebaseapp.com",
  projectId: "react-todo-724a0",
  storageBucket: "react-todo-724a0.appspot.com",
  messagingSenderId: "331438308925",
  appId: "1:331438308925:web:433c01f90877f33f40b454",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
