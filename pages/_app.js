import "../styles/globals.css";
import { LoginContext } from "../context/LoginContext";
import {useState} from 'react'

function MyApp({ Component, pageProps }) {

  const [formOn, setFormOn] = useState(false)

    return (

      <LoginContext.Provider value={{formOn, setFormOn}}>
        <Component {...pageProps} />
    </LoginContext.Provider>
      )
}

export default MyApp;
