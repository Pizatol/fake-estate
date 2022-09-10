import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import css from "../styles/NavBar.module.css";
import Image from "next/image";

import logoFakeEstate from '../Assets/logo/logoFakeEstate.png'
import loginLogo from '../Assets/icons/login_icon.svg'
import logoutLogo from '../Assets/icons/logout_icon.svg'

export default function NavBar({ existingUser }) {
    const { formOn, setFormOn } = useContext(LoginContext);
    const { user, setUser } = useContext(LoginContext);

    const toggleForm = () => {
        setFormOn(!formOn);
    };
    function handleLogout() {
        FirebaseAuthService.logoutUser();
        
    }

    return (
        <div className={css.global_container}>
            <div>LOGO</div>
            <div className={css.buttons_navigation_container}>
                <div>BOUTON1</div>
                <div>BOUTON1</div>
                <div>BOUTON1</div>
            </div>
            

            {user ? (
                <button onClick={handleLogout}>
                <Image
                    src={logoutLogo}
                    width={20}
                    height={20}
                    alt="Log Out button"
                />
                </button>
            ) : (
                <button onClick={toggleForm}>
                <Image
                    src={loginLogo}
                    width={20}
                    height={20}
                    alt="Log In button"
                />
                    
                   
                </button>
            )}
        </div>
    );
}