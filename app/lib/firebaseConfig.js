// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCYRdd4yFtSqa9Tt5T2scMwOx1WcxOh3q0",
    authDomain: "software-dev-portfolio-1c3d1.firebaseapp.com",
    projectId: "software-dev-portfolio-1c3d1",
    storageBucket: "software-dev-portfolio-1c3d1.firebasestorage.app",
    messagingSenderId: "339342976499",  
    appId: "1:339342976499:web:c1cabb1d9b1ffe023f1e86"
  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
