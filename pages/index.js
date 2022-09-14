import Head from "next/head";
import Image from "next/image";
import css from "../styles/Home.module.scss";
import react, { useState, useContext, useEffect } from "react";

import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import FirebaseFirestoreService from "../Firebase/FirebaseFirestoreService";
import firebaseConfig from "../Firebase/FirebaseConfig";

import {
    handleFetchProducts,
    handleUpdateProduct,   
    handleAddProduct,
    handleEditProductClick,
    handleEditProductCancel,
} from "../Logic/Crud";

import { LoginContext } from "../context/LoginContext";

import NavBar from "../Components/NavBar";
import LoginForm from "../Components/LoginForm";
import Carousel from "../Components/Carousel";
import CreateEditForm from "../Components/CreateEditForm";

export default function Home() {
    const { user, setUser } = useContext(LoginContext);
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleFetchProducts()
            .then((fetchedProducts) => {
                setProducts(fetchedProducts);
            })
            .catch((error) => {
                console.error(error.message);
                throw error;
            });
    }, [user]);

    return (
        <div className={css.container}>
            <Head>
                <title>Fake Estate</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={css.global_container}>
                <NavBar existingUser={user} />
                <LoginForm />

                {/* {user  ? "" : <Carousel />} */}

                <section className={css.test_section}>


                


                    {user ? (
                        <CreateEditForm handleAddProduct={handleAddProduct} />
                    ) : (
                        ""
                    )}
                </section>
            </div>
        </div>
    );
}
