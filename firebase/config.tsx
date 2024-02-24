import {getFirestore} from 'firebase/firestore';
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAPovfMJIf9a_q-FSiR_O8WurysU65b7Do",
  authDomain: "noterapp-d16cc.firebaseapp.com",
  projectId: "noterapp-d16cc",
  storageBucket: "noterapp-d16cc.appspot.com",
  messagingSenderId: "853855766286",
  appId: "1:853855766286:web:32889d71049da3718d395f"
};

const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);
export const auth= getAuth(app);
export const   provider= new GoogleAuthProvider();