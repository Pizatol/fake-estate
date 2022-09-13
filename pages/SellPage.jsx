import React, { useState, useEffect } from "react";

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
    const db = firebaseConfig.firestore;

    const [products, setProducts] = useState();

    const collectionRef = collection(db, "Products");

    useEffect(() => {
        const getUsers = async () => {
            let fetchedProducts = [];
            const response = await getDocs(collectionRef);

            const newProducts = response.docs.map((productDoc) => {
                const id = productDoc.id;
                const data = productDoc.data();
                data.publishDate = new Date(data.publishDate.seconds * 1000);

                return {
                    ...data,
                    id,
                };
            });
            fetchedProducts = [...newProducts];

            setProducts(fetchedProducts);
        };
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(products);

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
                              publishDate={product.publishDate}
                          />
                      );
                  })
                : null}
        </div>
    );
}
