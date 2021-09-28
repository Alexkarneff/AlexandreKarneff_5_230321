// GET de l'api des produits pour en faire une liste
fetch('http://localhost:3000/api/furniture')
.then(function(res) {
	if (res.ok) {
		return res.json();
	}
})
.then (function (arrayAllProducts) {

	renderProducts(arrayAllProducts);

})
.catch (function(err) {
	console.log(err);
});

// faire apparaitre les composantes du produits
function renderProducts(productsArray) {
	productsArray.forEach((product) => {

		const newProduct = document.createElement("div");
		newProduct.classList.add("productsContainer");
		
		const link = getProductLink(product);

		const img = getProductImg(product);

		const description = getProductDescription(product);

		link.appendChild(img);
		link.appendChild(description);
        newProduct.appendChild(link);
		
		
	    document.getElementById('productsMainContainer').appendChild(newProduct);
	});
}


// Gcréation du lien href vers la page du produit
function getProductLink(product) {
	const link = document.createElement("a");
	link.setAttribute("href", "products.html?id="+product._id);
	return link;
}

// faire apparaitre l'image du produit
 function getProductImg(product){
 	const image = document.createElement("img");
 	image.setAttribute("src", product.imageUrl);
	image.className ="index_image";
 	return image;
}

// GET de la description du produit
function getProductDescription(product) {
	const description  = document.createElement("div");
	description.classList.add("index_description");
	const productName = document.createElement("p");
	const productPrice = document.createElement("p");

	productName.className = "index_name";
	productPrice.className = "index_price";
	productName.innerText = product.name;
	productPrice.innerText = product.price + " €";
	
	description.appendChild(productName);
	description.appendChild(productPrice);

	return description;
}
