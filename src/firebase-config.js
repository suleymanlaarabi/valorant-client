// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyAIOXC5l88VWJS9JgjXbID6qg9-wn9tI9w",
    authDomain: "valorant-client.firebaseapp.com",
    projectId: "valorant-client",
    storageBucket: "valorant-client.appspot.com",
    messagingSenderId: "320058708675",
    appId: "1:320058708675:web:bc56e350b6405290d14876",
    measurementId: "G-YVVY3TNK9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)


export const db = getFirestore(app)