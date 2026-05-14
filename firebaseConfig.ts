import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN53PTmgP21U6_Rsoh1v85OSzyzv6OhcQ",
  authDomain: "study-planner-124ae.firebaseapp.com",
  projectId: "study-planner-124ae",
  storageBucket: "study-planner-124ae.firebasestorage.app",
  messagingSenderId: "1039222000539",
  appId: "1:1039222000539:web:bbbae258089a79c3086f3e",
  databaseURL: "https://study-planner-124ae-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);    // ← Realtime DB
export const auth = getAuth(app);