import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyChiTPHywKm2SQdklIvKASGdg5JoFduU-U",
    authDomain: "my-project-e6483.firebaseapp.com",
    projectId: "my-project-e6483",
    storageBucket: "my-project-e6483.appspot.com",
    messagingSenderId: "820754954872",
    appId: "1:820754954872:web:d0db8742cec9cf4db54b8d",
    measurementId: "G-QG9CPTFCKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth }