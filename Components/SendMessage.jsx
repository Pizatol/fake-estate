import css from "../styles/SendMessage.module.scss";
import React, { useState } from "react";
import Image from "next/image";

import consulting_boy from "../Assets/consulting_boy/consulting_boy.jpg";

export default function SendMessage() {
    const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [message, setMessage] = useState("");
    const [checkBox, setCheckBox] = useState(false);

    const [data, setData] = useState([]);

    const handleForm = (e) => {
		e.preventDefault()
        if (checkBox === false) {
            alert("Please accept condition terms");
            return;
        }

        const informations = {
            gender,
            firstName,
            lastName,
            mail,
            phoneNum,
            message,
            checkBox,
        };
		  setData(informations)

        alert("Message envoyé");
        setGender("");
        setFirstName("");
        setLastName("");
        setMail("");
        setPhoneNum("");
        setMessage("");
        setCheckBox(false);
    };  

    const toggleCheck = () => {
        setCheckBox(!checkBox);
    };

    return (
        <div className={css.global_container}>
            <div className={css.title}>Envoyer un message</div>
            <div className={css.presentation_text}>
                <p>
                    Fake Estate réalise des traitements de données à caractère
                    personnel afin de rendre à la fois fluide et efficace la
                    relation avec ses prospects, futurs clients et clients
                    fidèles.
                </p>
                <a> En savoir plus</a>
            </div>
            <div>
                <form onSubmit={handleForm} className={css.form_container}>
                    <label required>
                        <select
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                            required
                        >
                            <option value="Madame">Madame</option>
                            <option value="Mademoiselle">Mademoiselle</option>
                            <option value="Monsieur">Monsieur</option>
                        </select>
                    </label>
                    <label required>
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                            type="text"
                            placeholder="Prénom"
                        />
                    </label>
                    <label required>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            type="text"
                            placeholder="Nom de famille"
                        />
                    </label>
                    <label required>
                        <input
                            onChange={(e) => setMail(e.target.value)}
                            value={mail}
                            type="mail"
                            placeholder="e-mail"
									 required
                        />
                    </label>
                    <label required>
                        <input
                            onChange={(e) => setPhoneNum(e.target.value)}
                            value={phoneNum}
                            type="tel"
                            placeholder="téléphone"
									 required
                        />
                    </label>
                    <label required>
                        <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            placeholder="Message"
									 required
                        ></textarea>
                    </label>
                    <label  required className={css.checkbox_label}>
                        <input
                            value={checkBox}
                            onChange={toggleCheck}
                            required
                            type="checkbox"
                        />
                        J`&apos` ai lu et j`&apos`accepte la politique de
                        confidentialité de ce site
                    </label>
                    <button  type="submit">Envoyer</button>
                </form>
                <div className={css.consulting_section}>
                    <div className={css.image_container}>
                        <Image
                            src={consulting_boy}
                            width={619}
                            height={928}
                            layout="responsive"
                            alt="consultant"
                        />
                    </div>
                    <div className={css.text_part}>
                        <p>Jean Michel Fougères</p>
                        <p>Consultant</p>
                    </div>
                    <div className={css.phone_part}>
                        <p> +33 6 11 22 33 44</p>
                        <p> +33 6 77 66 55 44</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
