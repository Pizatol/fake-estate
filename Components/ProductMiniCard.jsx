

import React from 'react'

export default function ProductMiniCard( {name, adress, price, surface, floor, elevator, heating, publishDate} ) {
  return (
	 <div>
		<h1>{adress}</h1>
		<h3>{price}</h3>
		<p>{floor} </p>
		
	 </div>
  )
}
