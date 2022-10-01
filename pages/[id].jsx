import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LoginContext } from "../context/LoginContext";
import LoginForm from "../Components/LoginForm";
import NavBar from "../Components/NavBar";

import Link from "next/link";
import Image from "next/image";
import css from "../styles/slug.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function CustomPage() {
    const router = useRouter();
    const idItem = router.query.id;
    
    const { user, setUser, products, setProducts } = useContext(LoginContext);

    const [product, setProduct] = useState([]);
   
    let imgArray = [];
    const imgfilter = products.filter((item) => item.id === idItem);
   
    imgArray = imgfilter[0].dataImage
    // setProduct(imgArray)
    console.log(imgArray);
   

    // 	const filteringData = async () => {

    // 			 const filterArray = await products.filter(
    // 				  (item) => String(item.id) ===  String(idItem)
    // 			 );
    // 			 setProduct(filterArray);
    // 			 imgArray = product.dataImage
    // 			 console.log("product",  product);

    //   };

    const filteringData = () => {
        const filterArray = products.filter((item) => item.id === idItem);

        // imgArray = filterArray[0].dataImage;

    //     for(let i =0; i < filterArray[0].dataImage.length; i++ ){
    //         setProduct(prev => [...prev, filterArray[0].dataImage[i].url])
    //         imgArray.push(filterArray[0].dataImage[i].url)
    //     }
    //    console.log(imgArray);
    //    console.log(product);
    
  
        // console.log('filetARRAY', filterArray[0].dataImage.length);

    
    
    
};


    //   adress, dataImage, elevator, foor, heating, price, publishDate, sellRental,

    //  surface, textDetailled, textSummary

    

    return (
        <div className={css.slug_global_container}>
            <NavBar />
            <LoginForm />
            <div className={css.slug_global_container}>
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
                        {imgArray.map((img, index) => (
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
               
            </div>
        </div>
    );
}


  {/* <div className={css.slug_carousel_container}>
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        navigation={false}
                        // pagination={{
                        //     type: "progressbar",
                        // }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                        }}
                        spaceBetween={0}
                        centeredSlides={true}
                        slidesPerView={1}
                        loop={true}
                    >
                        {imgArray.map((img, index) => (
                            <SwiperSlide
                                className={css.slug_img_container}
                                key={index}
                            >
                                <Image
                                    src={img.url}
                                    width={1932}
                                    heigh={1288}
                                    layout="responsive"
                                    alt="picture carousel"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div> */}