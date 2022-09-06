import "../styles/globals.css";
import { LoginContext } from "../context/LoginContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
    const [user, setUser] = useState(null);
    const [formOn, setFormOn] = useState(false);

    return (
        <LoginContext.Provider value={{ user, setUser, formOn, setFormOn }}>
            <Component {...pageProps} />
        </LoginContext.Provider>
    );
}

export default MyApp;
