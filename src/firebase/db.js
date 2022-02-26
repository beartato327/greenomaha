import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAIsSu95HFq-ZqN8m70__UkBnL4DduGxj0",
    authDomain: "greenomaha-137ec.firebaseapp.com",
    projectId: "greenomaha-137ec",
    storageBucket: "greenomaha-137ec.appspot.com",
    messagingSenderId: "1024398843752",
    appId: "1:1024398843752:web:a7a6f1356470955256c0dd",
    measurementId: "G-ZE13R9710B"
  };

  export const db = firebase.initializerApp(firebaseConfig).firestore()