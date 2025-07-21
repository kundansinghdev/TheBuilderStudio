import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBoB8Bkstb6K8qlpZTgxp7kFTIbXWtPrNo',
  authDomain: 'thebuilderstudio-13515.firebaseapp.com',
  projectId: 'thebuilderstudio-13515',
  storageBucket: 'thebuilderstudio-13515.appspot.com',
  messagingSenderId: '857033197325',
  appId: '1:857033197325:web:34e5ff19f1b7c3a975d244',
  measurementId: 'G-QZFDHZT2Z0',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
