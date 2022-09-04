import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import css from "../styles/NavBar.module.css";

export default function NavBar({ existingUser }) {


    const {formOn, setFormOn} = useContext(LoginContext)

    const toggleForm = () => {
        setFormOn(!formOn)
    }

    return (
        <div className={css.global_container}>
            <div>LOGO</div>
            <div className={css.buttons_navigation_container}>
                <div>BOUTON1</div>
                <div>BOUTON1</div>
                <div>BOUTON1</div>
            </div>
           <button onClick={toggleForm}>Log In</button>
        </div>
    );
}
