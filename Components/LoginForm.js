import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import css from "../styles/LoginForm.module.css";

export default function LoginForm() {
  
    const {formOn, setFormOn} = useContext(LoginContext)

    const toggleForm = () => {
        setFormOn(!formOn)
    }

  

    return (
        <>
            {formOn ? (
                <div className={css.global_containerOn}>
                    <div onClick={toggleForm} className={css.overlay}></div>
                    <div className={css.form_card}>LoginForm</div>
                </div>
            ) : null}
        </>
    );
}
