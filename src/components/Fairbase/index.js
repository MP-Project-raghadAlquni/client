import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBZyr69yN7R9xIzG-qZZFupLac5LiCfjdE",
    authDomain: "readings-956f3.firebaseapp.com",
    projectId: "readings-956f3",
    storageBucket: "readings-956f3.appspot.com",
    messagingSenderId: "288511227465",
    appId: "1:288511227465:web:40419e8ad1f2a53d7bf198",
    measurementId: "G-41YEJRKJ9Y"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };