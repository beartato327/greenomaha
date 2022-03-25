import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAIsSu95HFq-ZqN8m70__UkBnL4DduGxj0",
  authDomain: "greenomaha-137ec.firebaseapp.com",
  projectId: "greenomaha-137ec",
  storageBucket: "greenomaha-137ec.appspot.com",
  messagingSenderId: "1024398843752",
  appId: "1:1024398843752:web:a7a6f1356470955256c0dd",
  measurementId: "G-ZE13R9710B",
});

const analytics = getAnalytics(firebaseApp);

logEvent(analytics, 'first_visit')
logEvent(analytics, 'page_view')


export const db = getFirestore(firebaseApp);
