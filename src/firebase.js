import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCP1KlSGxmnW7fsmqpooBx7bF6gnFU0alc",
    authDomain: "mymeals-c52b7.firebaseapp.com",
    databaseURL: "https://mymeals-c52b7-default-rtdb.firebaseio.com",
    projectId: "mymeals-c52b7",
    storageBucket: "mymeals-c52b7.appspot.com",
    messagingSenderId: "138266541430",
    appId: "1:138266541430:web:062c5ab00d69d44c3f0e57"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app, 'gs://mymeals-c52b7.appspot.com/');
const auth = getAuth(app);

export { auth, database, storage };
