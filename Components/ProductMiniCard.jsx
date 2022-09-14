

import React from 'react'
import css from '../styles/ProductMiniCard.module.scss'
import Image from 'next/image'

export default function ProductMiniCard( {name, adress, price, surface, floor, elevator, heating, textSmmary, textDetailled , publishDate, imageUrl} ) {
  return (
	

	 	<div className={css.card_container} >

			<div className={css.image_container}>
				<Image
					src={imageUrl}
					alt={imageUrl}
					width = {600}
					height = {500}
					layout= "responsive"
				/>
			</div>

			<div className={css.name_price_container} >
				<p> {name} </p>
				<p> {price} € </p>
			</div>

			<div className={css.informations_container} >
				<p> Surface : {surface} m² </p>
				<p> {textSmmary}  </p>
			</div>

		</div>
		
		
	 
  )
}
