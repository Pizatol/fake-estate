import React from "react";
import css from "../styles/ProductMiniCard.module.scss";
import Image from "next/image";

export default function ProductMiniCard({
    reference,
    name,
    adress,
    city,
    price,
    surface,
    sellRental,
    floor,
    nbRooms,
    elevator,
    heating,
    textSmmary,
    textDetailled,
    publishDate,
    images,
}) {
    return (
        <div className={css.card_container}>
            <div className={css.image_part_container}>
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
            <div className={css.text_part_container}>
            
                <div className={css.name_price_container}>
                    <p> {sellRental} appartement, {adress} {city}, {nbRooms} pièces, {surface} m² </p>
                    <p>ref : {reference}  </p>
                    <p> {price} € </p>
                </div>

                <div className={css.informations_container}>
                   
                    <p> {textSmmary} </p>
                </div>
            </div>
        </div>
    );
}

//  reference,
// adress,
// city,
// price,
// nbRooms,
// surface,
// floor,
// elevator,
// heating,
// textDetailled,
// textSummary,
// sellRental,
// isPublished,
// dataImage,