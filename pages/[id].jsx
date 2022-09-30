

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router'
import { LoginContext } from "../context/LoginContext";
import Link from "next/link";
import Image from "next/image";
import css from '../styles/slug.module.scss'

export default function CustomPage ({reference}) {

	const router = useRouter()
	const idItem = router.query;



	const { user, setUser, products, setProducts } = useContext(LoginContext);

	const [product, setProduct] = useState([])


	const filteringData =  () => {
		if (products) {
			 const filterArray =  products.filter(
				  (item) => String(item.id) ===  String(router.query.id)
			 );
			 setProduct(filterArray);
		}
  };

//   adress, dataImage, elevator, foor, heating, price, publishDate, sellRental,

//  surface, textDetailled, textSummary

  useEffect(() => {
	filteringData()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
	 <div>
	 <Link href='/'>
		<a>HOME</a>
	 </Link>


		<h1>Custom Page</h1>

		<div>

		</div>

	 </div>
  )
}
