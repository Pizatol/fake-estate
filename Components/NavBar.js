import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import css from "../styles/NavBar.module.css";

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
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={toggleForm}>Login</button>
            )}
        </div>
    );
}
