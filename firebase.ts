import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyDBgklHFGo3icVik5eWxRxNVnF4XKSVBk0',
  authDomain: 'speakease-f8636.firebaseapp.com',
  projectId: 'speakease-f8636',
  storageBucket: 'speakease-f8636.appspot.com',
  messagingSenderId: '1060935476580',
  appId: '1:1060935476580:web:dc55110a52c9982b630671',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { app, auth, db, functions };
