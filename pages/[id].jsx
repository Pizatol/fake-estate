import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LoginContext } from "../context/LoginContext";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import LoginForm from "../Components/LoginForm";
import NavBar from "../Components/NavBar";
import SendMessage from "../Components/SendMessage";
import { db } from "../Firebase/FirebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

import Link from "next/link";
import Image from "next/image";
import css from "../styles/slug.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import EnergyChartLogo from "../Components/EnergyChartLogo";
import Footer from "../Components/Footer";

export default function CustomPage() {
    const dataCollectionRef = collection(db, "test");
    const router = useRouter();
    const idItem = router.query.id;

    const { user, setUser, products, setProducts } = useContext(LoginContext);
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    const [product, setProduct] = useState("");
    const [productImg, setProductImg] = useState("");

    const [entry, setEntry] = useState(0);
    const [livingRoom, setLivingRoom] = useState(0);
    const [bedRoom, setBedRoom] = useState(0);
    const [desk, setDesk] = useState(0);
    const [bathroom, setBathroom] = useState(0);
    const [toilet, setToilet] = useState(0);
    const [diningRoom, setDiningRoom] = useState(0);
    const [parking, setParking] = useState(0);

    const e = product[0];
    console.log(e);

    useEffect(() => {
        const productfilter = products.filter((item) => item.id === idItem);
        const imgArray = productfilter[0].uploadImage;

        setProductImg(imgArray);
        setProduct(productfilter);

        // setEntry(e.entry)
        // setLivingRoom(e.livingRoom)
        // setBedRoom(e.bedRoom)
        // setDesk(e.desk)
        // setBathroom(e.bathroom)
        // setToilet(e.toilet)
        // setDiningRoom(e.diningRoom)
        // setParking(e.parking)
    }, [products, idItem]);

    return (
        <div className={css.slug_global_container}>
            <NavBar />
            <LoginForm />

            {product ? (
                <div>
                    <div className={css.slug_carousel_container}>
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            navigation={true}
                            pagination={{
                                type: "progressbar",
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: true,
                            }}
                            spaceBetween={0}
                            centeredSlides={true}
                            slidesPerView={1}
                            loop={true}
                        >
                            {productImg.map((img, index) => (
                                <SwiperSlide
                                    className={css.slug_img_container}
                                    key={index}
                                >
                                    <Image
                                        src={img.url}
                                        width={1932}
                                        height={1288}
                                        layout="responsive"
                                        alt="picture carousel"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className={css.slug_bottom_container}>
                        <div className={css.left_part}>
                            <div className={css.left_top_part}>
                                <h1>
                                    {" "}
                                    {e.city} - {e.adress}{" "}
                                </h1>
                                <p> {e.textDetailled} </p>
                            </div>
                            <div className={css.left_middle_part}>
                                <div className={css.details_lists}>
                                    <h2>Détails des pièces</h2>
                                    <div className={css.border_title}></div>
                                    <ul>
                                        {e.entry > 0 ? (
                                            <li> Entrée : {e.entry} </li>
                                        ) : null}
                                        {e.bedRoom > 0 ? (
                                            <li> Chambre : {e.bedRoom} </li>
                                        ) : null}
                                        {e.bathroom > 0 ? (
                                            <li>
                                                {" "}
                                                Salle de bain : {
                                                    e.bathroom
                                                }{" "}
                                            </li>
                                        ) : null}
                                        {e.toilet > 0 ? (
                                            <li> Toilette : {e.toilet} </li>
                                        ) : null}
                                        {e.diningRoom > 0 ? (
                                            <li>
                                                {" "}
                                                Salle à manger : {
                                                    e.diningRoom
                                                }{" "}
                                            </li>
                                        ) : null}
                                        {e.parking > 0 ? (
                                            <li> Parking : {e.parking} </li>
                                        ) : null}
                                    </ul>
                                </div>

                                <div className={css.details_lists}>
                                    <h2>Prestations Immobilières</h2>
                                    <div className={css.border_title}></div>
                                    <ul>
                                        <li>Cheminée</li>
                                        <li>Ascenseur</li>
                                        <li>Digicode</li>
                                        <li>Interphone</li>
                                    </ul>
                                </div>
                            </div>

                            {e.sellRental === "location" ? (
                                <div>
                                    <h4>Réglementation immobilière</h4>
                                    <div className={css.left_bottom_part}>
                                        <div className={css.bottom_details}>
                                            <div
                                                className={css.border_title}
                                            ></div>
                                            <div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>
                                                        {" "}
                                                        Provision sur charges
                                                        récupérables
                                                    </p>
                                                    <p>300 € / Mois</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p> Honoraires locataire</p>
                                                    <p>2070 €</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p> Dépôt de garantie</p>
                                                    <p>3600 €</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className={`${css.bottom_details} ${css.bottom_details_second}`}
                                        >
                                            <EnergyChartLogo />
                                            {user ? <div></div> : "NO"}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4>Réglementation immobilière</h4>
                                    <div className={css.left_bottom_part}>
                                        <div className={css.bottom_details}>
                                            <div
                                                className={css.border_title}
                                            ></div>
                                            <div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>
                                                        Honoraires charge
                                                        vendeur
                                                    </p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>Loi Carrez</p>
                                                    <p> 10 m²</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>Taxe foncière</p>
                                                    <p>130 € / an</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>
                                                        Charges de copropriété
                                                    </p>
                                                    <p>300 € / an</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>
                                                        nombre lot dans la
                                                        copropriété
                                                    </p>
                                                    <p>23</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className={`${css.bottom_details} ${css.bottom_details_second}`}
                                        >
                                            <EnergyChartLogo />

                                            {/* EDIT BUTTON */}
                                            {user ? (
                                                <Link
                                                    href={{
                                                        pathname:
                                                            "/NewProductPage",
                                                        query: e,
                                                    }}
                                                >
                                                    <a> Edit</a>
                                                </Link>
                                            ) : (
                                                "NO"
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <SendMessage />
                        </div>
                    </div>
                </div>
            ) : null}
            <Footer />
        </div>
    );
}

//   adress, dataImage, elevator, foor, heating, price, publishDate, sellRental,

//  surface, textDetailled, textSummary
