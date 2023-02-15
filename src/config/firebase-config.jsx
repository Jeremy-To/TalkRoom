// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDK4YZGD-_ozeywQzk_9QJZxuXL32saT8g",
  authDomain: "talkroom-c254f.firebaseapp.com",
  projectId: "talkroom-c254f",
  storageBucket: "talkroom-c254f.appspot.com",
  messagingSenderId: "1022465334870",
  appId: "1:1022465334870:web:f903560788fa76ec86e5f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
