import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const config = {
    apiKey: "AIzaSyCWWqa75gqnCpbp9uMSsS-n1six0pHq3Lo",
    authDomain:"fake-estate-ca321.firebaseapp.com",
    databaseURL: "https://test-db-46eef-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fake-estate-ca321",
    storageBucket:"fake-estate-ca321.appspot.com",
    messagingSenderId:"360683300468",
    appId: "1:360683300468:web:1089e104bdcb0633f5d321",
};

const firebaseApp = initializeApp(config);
 export const auth = getAuth(firebaseApp);
 export const db = getFirestore(firebaseApp);
 export const storage = getStorage(firebaseApp);




