import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import Image from "next/image";
import css from "../styles/LoginForm.module.css";

import personIcon from "../Assets/icons/person_icon.svg";

export default function LoginForm() {
    const { user, setUser } = useContext(LoginContext);
    const { formOn, setFormOn } = useContext(LoginContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const toggleForm = () => {
        setFormOn(!formOn);
    };
    // login
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            await FirebaseAuthService.loginUser(username, password);
            setUsername("");
            setPassword("");
            toggleForm();
            FirebaseAuthService.subscribeToAuthChanges(setUser);
        } catch (error) {
            alert(error.message);
        }
    };
    // logout
    function handleLogout() {
        FirebaseAuthService.logoutUser();
        toggleForm();
    }

    const resetPassword = async () => {
        if (!username) {
            alert("Missing email !");
            return;
        }
        try {
            await FirebaseAuthService.sendPasswordResetEmail(username);
            alert("sent the password reset email");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={css.global_containerOn}>
            {formOn ? (
                <div>
                    <div onClick={toggleForm} className={css.overlay}></div>

                    <div className={css.login_form_card}>
                        <div className={css.login_form_icon_member_container}>
                            <Image
                                src={personIcon}
                                width={75}
                                height={75}
                                alt="icon member"
                            />
                        </div>
                        <h2 className={css.login_form_title}>MEMBER LOGIN</h2>

                        <form
                            onSubmit={handleSubmitForm}
                            className={css.login_form_form_container}
                        >
                            <label>
                                <input
                                    className={css.form_input}
                                    type="email"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                    placeholder="Email ID"
                                />
                            </label>
                            <label>
                                <input
                                 className={css.form_input}
                                    type="password"
                                    required
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </label>
                            <div>
                                <button 
                                className={css.login_form_login_button}
                                >LOGIN</button>
                            </div>
                            <div>
                            <p className={css.login_form_reset_text} >Forget Password ? 
                                <button type="button"
                                className={css.login_form_reset_button}
                                 onClick={resetPassword}>
                                   Click to reset
                                </button>{" "}
                            </p>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
