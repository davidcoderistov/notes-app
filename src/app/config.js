import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBF6fkBpS9CYwjD8nfLtmU63vTj7cKi1-Y",
    authDomain: "notes-app-8675.firebaseapp.com",
    projectId: "notes-app-8675",
    storageBucket: "notes-app-8675.appspot.com",
    messagingSenderId: "623210644095",
    appId: "1:623210644095:web:0ae6fec345cf3ab0e1b54a",
    measurementId: "G-KHHLFG5DW9"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase
