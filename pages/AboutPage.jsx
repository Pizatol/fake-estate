import React, { useState } from "react";
import css from "../styles/AboutPage.module.scss";
import NavBar from "../Components/NavBar";
import LoginForm from "../Components/LoginForm";
import Image from "next/image";
import Footer from "../Components/Footer";
import logo from "../Assets/logo/logoFakeEstate.png";
import FakeMap from "../Assets/fakeMap/FakeMap.JPG";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Map, Marker, Popup } from "react-leaflet";

export default function AboutPage() {
    const [toggleCallButton, setToggleCallButton] = useState(true);

    const togglecall = () => {
        setToggleCallButton(false);
    };

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 11,
    };

    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    return (
        <div>
            <NavBar />
            <LoginForm />

            <div className={css.global_container}>
                <div className={css.css1}>
                    <h1>AGENCE IMMOBILIÈRE PARIS : FAKE ESTATE</h1>

                    <p>
                        Nous mettons toute notre expérience du métier d'agent
                        immobilier et du secteur pour vous aider à réaliser
                        votre projet immobilier.
                    </p>
                </div>

                <div className={css.css2}>
                    <div className={css.left_part}>
                        <div className={css.left_part_global_container}>
                            <h2>NOS COORDONNÉES</h2>
                            <div className={css.upper_left_container}>
                                <div className={css.logo_container}>
                                    <Image
                                        src={logo}
                                        width={200}
                                        height={200}
                                        alt="logo fake estate"
                                    />
                                </div>
                                <div className={css.upper_left_right_part}>
                                    <h3>Fake Estate</h3>
                                    <p>18 rue coquillière</p>
                                    <p>75001 Paris</p>

                                    {toggleCallButton ? (
                                        <button onClick={togglecall}>
                                            {" "}
                                            Appeler{" "}
                                        </button>
                                    ) : (
                                        <button> 📞 +33143556600 </button>
                                    )}
                                </div>
                            </div>

                            <div className={css.middle_left_container}>
                                <h2>NOUS CONTACTER</h2>

                                <div>
                                    <form className={css.form_container}>
                                        <div className={css.inputs_container}>
                                            <div>
                                                <textarea placeholder="Bonjour, je souhaite être recontacté par un négociateur immobilier. Merci"></textarea>
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="Votre nom"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                />
                                                <input
                                                    type="phone"
                                                    placeholder="Téléphone"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <p>
                                                    Les informations recueillies
                                                    sur ce formulaire sont
                                                    enregistrées dans un fichier
                                                    informatisé par Le
                                                    responssable DPO de l'agence
                                                    pour gérer les inscriptions
                                                    aux alertes immobilières. La
                                                    base légale du traitement
                                                    est l'intérêt légitime.
                                                </p>

                                                <p>
                                                    Les données collectées
                                                    seront communiquées
                                                    uniquement aux seuls
                                                    destinataires suivants :
                                                    FAKE ESTATE .
                                                </p>

                                                <p>
                                                    Les données sont conservées
                                                    pendant 5 ans avant
                                                    anonymisation.
                                                </p>

                                                <p>
                                                    Vous pouvez accéder aux
                                                    données vous concernant, les
                                                    rectifier, demander leur
                                                    effacement ou exercer votre
                                                    droit à la limitation du
                                                    traitement de vos données.
                                                    Consultez le site cnil.fr
                                                    pour plus d'informations sur
                                                    vos droits.
                                                </p>

                                                <p>
                                                    Pour exercer ces droits ou
                                                    pour toute question sur le
                                                    traitement de vos données
                                                    dans ce dispositif, vous
                                                    pouvez contacter à :
                                                    service@fake-estate.com ,
                                                    18 rue de Richelieu 75001
                                                    Paris .
                                                </p>

                                                <p>
                                                    {" "}
                                                    <input
                                                        type="checkbox"
                                                        required
                                                    />{" "}
                                                    Je confirme avoir bien pris
                                                    connaissance des mentions
                                                    d'information relatives à ce
                                                    formulaire et au traitement
                                                    des informations saisies.
                                                </p>
                                                <button> Envoyer </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div>
                                    <h3>QUI SOMMES-NOUS</h3>
                                    <p>
                                        Installés à proximité de la comédie
                                        Française, cela fait maintenant dix ans
                                        que nous sommes spécialisés dans la
                                        vente et location de biens immobiliers
                                        français pour une clientèle japonaise.
                                    </p>
                                    <p>
                                        En vente nous proposons notamment des
                                        appartements, mais aussi des locaux
                                        commerciaux tels que boutiques ou
                                        restaurants, notre périmètre s’étend de
                                        l’Opéra Garnier jusqu’aux alentours du
                                        Musée du Louvre.
                                    </p>
                                    <p>
                                        Notre équipe japonaise se consacre
                                        également à la location d’appartements
                                        pour japonais, et les propriétaires
                                        souhaitant louer leur bien à des
                                        locataires japonais sont les bienvenus.
                                    </p>
                                    <p>
                                        Notre clientèle, faisant preuve d’un
                                        règlement de loyer régulier, est
                                        principalement constituée d’étudiants et
                                        d’expatriés, ces derniers ayant une
                                        grande préférence pour le 15e et 16e
                                        arrondissement lorsqu’ils sont
                                        accompagnés de leur famille.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={css.right_part}>
                        <div className={css.map_container}>
                           

                            <MapContainer
                                className={css.leaflet_container}
                                center={[48.864489, 2.341017]}
                                zoom={13}
                                scrollWheelZoom={true}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[48.864489, 2.341017]}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily
                                        customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
