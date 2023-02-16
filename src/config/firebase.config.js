import { getApp as _getApp, getApps, initializeApp } from "firebase/app";
import { getAuth as _getAuth } from "firebase/auth";
import { getFirestore as _getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
const firebaseIsRunning = () => !!getApps().length;

export function getApp() {
  if (!firebaseIsRunning()) initializeApp(firebaseConfig);
  return _getApp();
}
export function getFirestore() {
  const isRunning = firebaseIsRunning();
  if (!isRunning) getApp();

  const db = _getFirestore();

  if (!isRunning)
    if (typeof window !== undefined) enableIndexedDbPersistence(db);

  return db;
}
export function getAuth() {
  if (!firebaseIsRunning()) getApp();
  return _getAuth();
}
