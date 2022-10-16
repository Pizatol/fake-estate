import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import css from "../styles/NavBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import logoFakeEstate from "../Assets/logo/logoFakeEstate.png";
import loginLogo from "../Assets/icons/login_icon.svg";
import logoutLogo from "../Assets/icons/logout_icon.svg";

export default function NavBar({ existingUser }) {
    const { formOn, setFormOn } = useContext(LoginContext);
    const { user, setUser } = useContext(LoginContext);

    const router = useRouter();

    const toggleForm = () => {
        setFormOn(!formOn);
    };
    function handleLogout() {
        FirebaseAuthService.logoutUser();
        router.push("/");

        alert("You are now log OUT");
    }

    return (
        <div className={css.global_container}>
            <div>
                <Link href="/">
                    <a className={css.logo_navigation}>
                        <Image
                            src={logoFakeEstate}
                            width={100}
                            height={100}
                            alt='Brand Logo'
                        />
                    </a>
                </Link>
            </div>
            <div className={css.buttons_navigation_container}>
                <Link href="/SellPage">
                    <a className={css.button_navigation}>VENTE</a>
                </Link>
                <Link href="/LocationPage">
                    <a className={css.button_navigation}>LOCATION</a>
                </Link>
                <Link href="/AboutPage">
                    <a className={css.button_navigation}> A PROPOS</a>
                </Link>

                {user ? (
                    <Link href="/NewProductPage">
                        <a className={css.button_new_product} >New Product</a>
                    </Link>
                ) : null}
            </div>
            <div>
                {user ? (
                    <a  className={css.login_logout_button} onClick={handleLogout}>
                        <Image
                            src={logoutLogo}
                            width={20}
                            height={20}
                            alt="Log Out button"
                        />
                    </a>
                ) : (
                    <a className={css.login_logout_button} onClick={toggleForm}>
                        <Image
                            src={loginLogo}
                            width={20}
                            height={20}
                            alt="Log In button"
                        />
                    </a>
                )}
            </div>
        </div>
    );
}
