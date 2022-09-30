import React from "react";
import css from "../styles/ProductMiniCard.module.scss";
import Image from "next/image";

export default function ProductMiniCard({
    name,
    adress,
    price,
    surface,
    floor,
    elevator,
    heating,
    textSmmary,
    textDetailled,
    publishDate,
    images,
}) {
   

    return (
        <div className={css.card_container}>

            <div className={css.image_container}>
                {/* {images.map((img, index) => (
					<div className={css.image} key={index}>
                    <Image                        
                        src={img.url}
                        alt={img.name}
                        width={600}
                        height={500}
                        layout="intrinsic"
                    />
					</div>
                ))} */}

					 <div className={css.image}>				 
                <Image
                    src={images[0].url}
                    alt={images[0].name}
                    width={600}
                    height={500}
                    layout="responsive"
                />
					 </div>
            </div>

            <div className={css.name_price_container}>
                <p> {name} </p>
                <p> {price} € </p>
            </div>

            <div className={css.informations_container}>
                <p> Surface : {surface} m² </p>
                <p> {textSmmary} </p>
            </div>
        </div>
    );
}
