import {getFirestore} from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPovfMJIf9a_q-FSiR_O8WurysU65b7Do",
  authDomain: "noterapp-d16cc.firebaseapp.com",
  projectId: "noterapp-d16cc",
  storageBucket: "noterapp-d16cc.appspot.com",
  messagingSenderId: "853855766286",
  appId: "1:853855766286:web:32889d71049da3718d395f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);
