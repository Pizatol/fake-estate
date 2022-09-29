import React, { useState, useEffect } from "react";
import { db } from "../Firebase/FirebaseConfig";
import firebaseConfig from "../Firebase/FirebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore/lite";

import FirebaseFirestoreService from "../Firebase/FirebaseFirestoreService";

import NavBar from "../Components/NavBar";
import LoginForm from "../Components/LoginForm";
import ProductMiniCard from "../Components/ProductMiniCard";

export default function SellPage() {

    const [products, setProducts] = useState();

    const collectionRef = collection(db, "Products");

    useEffect(() => {
       
    }, []);

    return (
        <div>
            <NavBar />
            <LoginForm />

            <div>sellPage</div>

            {products
                ? products.map((product, index) => {
                      return (
                          <ProductMiniCard
                              key={index}
                              name={product.name}
                              adress={product.adress}
                              price={product.price}
                              surface={product.surface}
                              floor={product.floor}
                              elevator={product.elevator}
                              heating={product.heating}
                              textDetailled={product.textDetailled}
                              textSmmary={product.textSummary}
                              sellRental={product.sellRental}
                              publishDate={product.publishDate}
                              imageUrl={product.imageUrl[0]}
                          />
                      );
                  })
                : null}
        </div>
    );
}

// DANS LE USEEFFECT

// const getUsers = async () => {
//     let fetchedProducts = [];
//     const response = await getDocs(collectionRef);

//     const newProducts = response.docs.map((productDoc) => {
//         const id = productDoc.id;
//         const data = productDoc.data();
//         data.publishDate = new Date(data.publishDate.seconds * 1000);

//         return {
//             ...data,
//             id,
//         };
//     });
//     fetchedProducts = [...newProducts];

//     setProducts(fetchedProducts);
// };
// getUsers();
