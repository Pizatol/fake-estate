import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import css from "../styles/LoginForm.module.css";

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

    return (
        <>
            {formOn ? (
                <div className={css.global_containerOn}>
                    <div onClick={toggleForm} className={css.overlay}></div>
                    <div className={css.form_card}>
                        <form onSubmit={handleSubmitForm}>
                            <label>
                                Username (email) :
                                <input
                                    type="email"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </label>
                            <label>
                                Password :
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </label>
                            <div>
                                <button>Login</button>
                                <button type="button" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </form>
                       {user ? 'you are LOGIN' : "you are LOGOUT"}
                    </div>
                </div>
            ) : null}
        </>
    );
}
