// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyCHmOs8M6sw3spMIz-sMz28DnvxKiS1Ee0",
  authDomain: "ecommerce-dc7ea.firebaseapp.com",
  projectId: "ecommerce-dc7ea",
  storageBucket: "ecommerce-dc7ea.appspot.com",
  messagingSenderId: "464326541032",
  appId: "1:464326541032:web:cd44ee592536e79b0cd35d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
