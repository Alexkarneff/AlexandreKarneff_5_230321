
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



function getProductLink(product) {
	const link = document.createElement("a");
	link.setAttribute("href", "product.html?id="+product._id);
	return link;
}


 function getProductImg(product){
 	const image = document.createElement("img");
 	image.setAttribute("src", product.imageUrl);
	image.className ="index_image";
 	return image;
}


function getProductDescription(product) {
	const description  = document.createElement("div");
	description.classList.add("index__description");
	const productName = document.createElement("p");
	const productPrice = document.createElement("p");

	productName.className = "index__name";
	productPrice.className = "index__price";
	productName.innerText = product.name;
	productPrice.innerText = product.price + " €";
	
	description.appendChild(productName);
	description.appendChild(productPrice);

	return description;
}
