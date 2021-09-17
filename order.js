let cartProductList = JSON.parse(localStorage.getItem("cart"));
const isCartEmpty = !cartProductList || cartProductList.length == 0;
let orderId = localStorage.getItem('orderId');

displayTotalPrice(cartProductList);
displayOrderId(orderId);

// fonction pour calculer et faire apparaitre le prix total du panier commandé
function displayTotalPrice(cartProductList) {

	if (isCartEmpty) {
		let emptyCart = document.createElement("p");
		emptyCart.textContent = "Malheureusement votre panier était vide ! ";
		document.getElementById("totalPriceDisplay").appendChild(emptyCart);
	} else {

	let totalPrice = 0;

    cartProductList.forEach((product) => {
      totalPrice += product.price;
    });


	let totalPriceDisplay = document.createElement("p");
	totalPriceDisplay.classList.add("totalPriceDisplay");
	totalPriceDisplay.innerText = "Le montant total de celle-ci s'élève à " + totalPrice + ' €.';

	
	document.getElementById('totalPriceDisplay').appendChild(totalPriceDisplay);

}};

function displayOrderId(orderId) 
{
	let orderIdDisplay = document.createElement("p");
	orderIdDisplay.classList.add("orderIdDisplay");
	orderIdDisplay.innerText = "Votre identifiant de commande est le suivant: " + orderId + '.';

	document.getElementById('orderIdDisplay').appendChild(orderIdDisplay);
	
}


