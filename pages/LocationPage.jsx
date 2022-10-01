import React, { useState, useEffect, useContext } from "react";
import css from "../styles/Sell_Location.module.scss";
import Link from "next/link";
import { LoginContext } from "../context/LoginContext";
import { db } from "../Firebase/FirebaseConfig";
import firebaseConfig from "../Firebase/FirebaseConfig";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import FirebaseFirestoreService from "../Firebase/FirebaseFirestoreService";

import NavBar from "../Components/NavBar";
import LoginForm from "../Components/LoginForm";
import ProductMiniCard from "../Components/ProductMiniCard";

export default function SellPage() {
    const { user, setUser, products, setProducts } = useContext(LoginContext);
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    // const [products, setProducts] = useContext();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const dataCollectionRef = collection(db, "test");

    const fetchData = async () => {
        const data = await getDocs(dataCollectionRef);
        setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        filteringData();
    };

    const filteringData = async () => {
        if (products) {
            const filterArray = await products.filter(
                (item) => item.sellRental === "location"
            );
            setSelectedProducts(filterArray);
        }
    };

    console.log("RELOAD SELL PAGE");
    useEffect(() => {
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <NavBar />
            <LoginForm />

            <div className={css.mini_card_container}>
                {selectedProducts
                    ? selectedProducts.map((product, index) => {
                          return (
                              <div key={index} className={css.mini_card}>
                                  <Link
                                      href={`/${product.id}`}
                                      reference={product.reference}
                                      className={css.mini_card}
                                  >
                                      <a className={css.mini_card_link}>
                                          <ProductMiniCard
                                              reference={product.reference}
                                              id={product.id}
                                              name={product.name}
                                              adress={product.adress}
                                              price={product.price}
                                              surface={product.surface}
                                              floor={product.floor}
                                              elevator={product.elevator}
                                              heating={product.heating}
                                              textDetailled={
                                                  product.textDetailled
                                              }
                                              textSmmary={product.textSummary}
                                              sellRental={product.sellRental}
                                              publishDate={product.publishDate}
                                              images={product.dataImage}
                                          />
                                      </a>
                                  </Link>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
}
