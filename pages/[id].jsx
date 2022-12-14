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


    useEffect(() => {
        const productfilter = products.filter((item) => item.id === idItem);
        const imgArray = productfilter[0].uploadImage;

        setProductImg(imgArray);
        setProduct(productfilter);

        
    }, [products, idItem]);

    const e = product[0];

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
                                    <h2>D??tails des pi??ces</h2>
                                    <div className={css.border_title}></div>
                                    <ul>
                                        {e.entry > 0 ? (
                                            <li> Entr??e : {e.entry} </li>
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
                                                Salle ?? manger : {
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
                                    <h2>Prestations Immobili??res</h2>
                                    <div className={css.border_title}></div>
                                    <ul>
                                    {
                                        e.particularityList.map((item, index) => (
                                            <li key={index}> 
                                                {item}
                                            </li>
                                        ))
                                    }
                                       
                                    </ul>
                                </div>
                            </div>

                            {e.sellRental === "location" ? (
                                <div>
                                    <h4>R??glementation immobili??re</h4>
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
                                                        r??cup??rables
                                                    </p>
                                                    <p>300 ??? / Mois</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p> Honoraires locataire</p>
                                                    <p>2070 ???</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p> D??p??t de garantie</p>
                                                    <p>3600 ???</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            className={`${css.bottom_details} ${css.bottom_details_second}`}
                                        >
                                            <EnergyChartLogo />


                                             
                                           
                                        </div>
                                    </div>
                                     {/* EDIT BUTTON */}
                                     {user ? (
                                        <div className={css.edit_button}>

                                                <Link
                                                    href={{
                                                        pathname:
                                                        "/NewProductPage",
                                                        query: e,
                                                    }}
                                                >
                                                    <a > Edit</a>
                                                </Link>
                                        </div>
                                            ) : (
                                                ""
                                            )}
                                </div>
                            ) : (
                                <div>
                                    <h4>R??glementation immobili??re</h4>
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
                                                    <p> 10 m??</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>Taxe fonci??re</p>
                                                    <p>130 ??? / an</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>
                                                        Charges de copropri??t??
                                                    </p>
                                                    <p>300 ??? / an</p>
                                                </div>
                                                <div
                                                    className={
                                                        css.bottom_details_text
                                                    }
                                                >
                                                    <p>
                                                        nombre lot dans la
                                                        copropri??t??
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
                                            
                                        </div>
                                    </div>
                                    {user ? (
                                        <div className={css.edit_button}>

                                                <Link
                                                    href={{
                                                        pathname:
                                                        "/NewProductPage",
                                                        query: e,
                                                    }}
                                                >
                                                    <a > Edit</a>
                                                </Link>
                                        </div>
                                            ) : (
                                                ""
                                            )}
                                    
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
