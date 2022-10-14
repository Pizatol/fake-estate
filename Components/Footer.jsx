import React from 'react'
import css from '../styles/Footer.module.scss'
import phoneIcon from '../Assets/icons/phoneIcon.svg'
import Image from 'next/image'
export default function Footer() {
  return (
	 <div className={css.global_container}>

		<div className={css.upper_band} >
			<h3> FAKE ESTATE</h3>
			<p>18 rue du pont - 75008 Paris</p>
			<div className={css.phone}>

		
			<Image
				src={phoneIcon}
				alt='phone icon'
				width={20}
				height={20}
			 />
				<p>  +3314286000 </p>
			</div>
		</div>

		<div className={css.lower_band}>

			<div className={css.lower_band_part} >
				<h3> PLUS D'INFOS</h3>
					<div className={css.lower_band_subpart}>
						<a>Alerte immo</a>
						<a>Notre agence</a>
						<a>Estimez votre bien</a>
						<a>Nos outils</a>
					</div>
			</div>

			<div className={css.lower_band_part}>
				<h3>FAKE ESTATE</h3>
				<div className={css.lower_band_subpart}>
					<a>Nos annonces immobilières</a>
					<a>Mentions légales</a>
					<a>Cookies</a>
					<a>Barème des honoraires</a>
				</div>
			</div>


			

		</div>

	 </div>
  )
}
