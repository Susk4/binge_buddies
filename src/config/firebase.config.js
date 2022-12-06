import { getApps, initializeApp } from "firebase/app";
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

if (!getApps.length) {
  initializeApp(firebaseConfig);
  if (typeof window !== "undefined") {
    if ("measurementId" in firebaseConfig) {
      getAnalytics();
    }
  }
}