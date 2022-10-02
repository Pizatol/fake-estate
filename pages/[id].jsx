import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LoginContext } from "../context/LoginContext";
import LoginForm from "../Components/LoginForm";
import NavBar from "../Components/NavBar";
import SendMessage from "../Components/SendMessage";

import Link from "next/link";
import Image from "next/image";
import css from "../styles/slug.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function CustomPage() {
    const router = useRouter();
    const idItem = router.query.id;

    const { user, setUser, products, setProducts } = useContext(LoginContext);

    const [product, setProduct] = useState("");

    useEffect(() => {
    
        const imgfilter = products.filter((item) => item.id === idItem);
       const  imgArray = imgfilter[0].dataImage;
        setProduct(imgArray);
    }, [idItem, product, products]);

    // const filteringData = () => {
    //     const filterArray = products.filter((item) => item.id === idItem);
    // };

    return (
        <div className={css.slug_global_container}>
            <NavBar />
            <LoginForm />

            <div className={css.slug_global_container}>
                {product ? (
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
                            {product.map((img, index) => (
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
                ) : null}

                <div>
                    <SendMessage />
                    
                </div>
            </div>
        </div>
    );
}

//   adress, dataImage, elevator, foor, heating, price, publishDate, sellRental,

//  surface, textDetailled, textSummary
