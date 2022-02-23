import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBjT9cgDhEkNwdx44No4oVxr78vALO-ue8",
    authDomain: "wildislanddatabase.firebaseapp.com",
    projectId: "wildislanddatabase",
    storageBucket: "wildislanddatabase.appspot.com",
    messagingSenderId: "200523390887",
    appId: "1:200523390887:web:024b57d65e8909ebb0a082"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();