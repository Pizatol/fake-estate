import firebaseConfig from "../Firebase/FirebaseConfig";
import FirebaseFirestoreService from "../Firebase/FirebaseFirestoreService";

// FETCH PRODUCT
export const handleFetchProducts = async () => {
	let fetchedProducts = [];
	try {
		 const response = await FirebaseFirestoreService.readDocuments(
			  "Products"
		 );

		 const newProducts = response.docs.map((productDoc) => {
			  const id = productDoc.id;
			  const data = productDoc.data();
			  data.publishDate = new Date(data.publishDate.seconds * 1000);

			  return {
					...data,
					id,
			  };
		 });
		 fetchedProducts = [...newProducts];
		 
	} catch (error) {
		 console.error(error.message);
		 throw error;
	}
	return fetchedProducts;
};

// ADD PRODUCT
export const handleAddProduct = async (newProduct) => {
	try {
		 const response = await FirebaseFirestoreService.createDocument(
			  "Products",
			  newProduct
		 );

		//  handleFetchProducts();
		 alert(
			  `successfully added new product with ID : ${response.id}  ! `
		 );
	} catch (error) {
		 alert(error.message);
	}
};
// UPDATE PRODUCT
export const handleUpdateProduct = async (newProduct, productId) => {
	try {
		 await FirebaseFirestoreService.updateDocument(
			  "Products",
			  productId,
			  newProduct
		 );
		//  handleFetchProducts();

		 alert(`Successfully updated a product with an ID = ${productId} `);
	} catch (error) {
		 alert(error.message);
		 throw error;
	}
};


export const handleEditProductClick = (productId) => {
	const selectedProduct = products.find((product) => {
		 return product.id === productId;
	});
	if (selectedProduct) {
		 setCurrentProduct(selectedProduct);
		 window.scrollTo(0, document.body.scrollHeight);
	}
};

export  const handleEditProductCancel = () => {
	setCurrentProduct(null);
};