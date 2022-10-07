import "../styles/globals.css";
import { LoginContext } from "../context/LoginContext";
import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

function MyApp({ Component, pageProps }) {

    const dataCollectionRef = collection(db, "test");
    const fetchData = async () => {
        const data = await getDocs(dataCollectionRef);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

       
    };
  
    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [user, setUser] = useState(null);
    const [formOn, setFormOn] = useState(false);
    const [products, setProducts] = useState([]);

    return (
        <LoginContext.Provider value={{ user, setUser, formOn, setFormOn, products, setProducts }}>
            <Component {...pageProps} />
        </LoginContext.Provider>
    );
}

export default MyApp;
