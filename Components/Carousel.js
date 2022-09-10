import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import css from "../styles/Carousel.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import img1 from "../Assets/images_Carousel/1.jpg";
import img2 from "../Assets/images_Carousel/2.jpg";
import img3 from "../Assets/images_Carousel/3.jpg";
import img4 from "../Assets/images_Carousel/4.jpg";
import img5 from "../Assets/images_Carousel/5.jpg";
import img6 from "../Assets/images_Carousel/6.jpg";

export default function Carousel() {
    return (
        <div className={css.carousel_container_global}>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                navigation={false}
                pagination={{
                    type: "progressbar",
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={0}
					 centeredSlides={true}
                slidesPerView={1}
                loop={true}
            >
                <SwiperSlide className="">
                    <Image
                        src={img1}
                        width={1932}
                        heigh={1288}
                        layout="responsive"
                        alt="picture carousel"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={img2}
                        width={1932}
                        heigh={1288}
                        layout="responsive"
                        alt="picture carousel"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={img3}
                        width={1932}
                        heigh={1288}
                        layout="responsive"
                        alt="picture carousel"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={img4}
                        width={1932}
                        heigh={1288}
                        layout="responsive"
                        alt="picture carousel"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={img5}
                        width={1932}
                        heigh={1288}
                        layout="responsive"
                        alt="picture carousel"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src={img6}
                        width={1932}
                        heigh={1288}
                        layout="responsive"
                        alt="picture carousel"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
