import { getApp as _getApp, getApps, initializeApp } from "firebase/app";
import { getAuth as _getAuth } from "firebase/auth";
import { getFirestore as _getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfmhTNUqxXEDQMSRCL6NqD_uXV3njmN8o",
  authDomain: "moviesproject-c8186.firebaseapp.com",
  projectId: "moviesproject-c8186",
  storageBucket: "moviesproject-c8186.appspot.com",
  messagingSenderId: "148481338700",
  appId: "1:148481338700:web:2dbadcd4a0ce74950a73e9",
  measurementId: "G-CVH091NZB7",
};
const firebaseIsRunning = () => !!(getApps().length);

export function getApp() {
  if (!firebaseIsRunning()) initializeApp(firebaseConfig);
  return _getApp();
}
export function getFirestore() {
  const isRunning = firebaseIsRunning();
  if (!isRunning) getApp();

  const db = _getFirestore();

  if (!isRunning)
    if (typeof window !== undefined) enableIndexedDbPersistence(db)

  return db;
}
export function getAuth() {
  if (!firebaseIsRunning()) getApp();
  return _getAuth();
}