import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LoginContext } from "../context/LoginContext";
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

export default function CustomPage() {
    const dataCollectionRef = collection(db, "test");
    const router = useRouter();
    const idItem = router.query.id;

    const { user, setUser, products, setProducts } = useContext(LoginContext);

    const [product, setProduct] = useState("");
    const [productImg, setProductImg] = useState("");
    const e = product[0];

    useEffect(() => {
        const productfilter = products.filter((item) => item.id === idItem);
        const imgArray = productfilter[0].dataImage;

        setProductImg(imgArray);
        setProduct(productfilter);
    }, [products, idItem]);

    // const filteringData = () => {
    //     const filterArray = products.filter((item) => item.id === idItem);
    // };
    console.log(product);

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
                                        <li>1 Entrée</li>
                                        <li>1 Salon</li>
                                        <li>1 Salle à manger</li>
                                        <li>1 Cuisine</li>
                                        <li>3 Chambres</li>
                                        <li>1 Salle de bains</li>
                                        <li>1 Salle de douche</li>
                                        <li>1 Toilettes</li>
                                        <li>1 Cave</li>
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
                            <div>
                                <h4>Réglementation immobilière</h4>
                                <div className={css.left_bottom_part}>
                                    <div className={css.bottom_details}>
                                        <div className={css.border_title}></div>
                                        <div>
                                            <div className={css.bottom_details_text}>
                                                <p> Provision sur charges récupérables</p>
                                                <p>300 € / Mois</p>
                                            </div>
                                            <div className={css.bottom_details_text}>
                                                <p> Honoraires locataire</p>
                                                <p>2070 €</p>
                                            </div>
                                            <div className={css.bottom_details_text}>
                                                <p> Dépôt de garantie</p>
                                                <p>3600 €</p>
                                            </div>

                                           
                                        </div>
                                    </div>

                                    <div className={`${css.bottom_details} ${css.bottom_details_second}`}>
                                        <EnergyChartLogo  />                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <SendMessage />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

//   adress, dataImage, elevator, foor, heating, price, publishDate, sellRental,

//  surface, textDetailled, textSummary
