cart = JSON.parse(localStorage.cart);





function removeButton() {
    
	const removeDiv = document.createElement('div');
	const removeText = document.createElement('p');


	removeText.textContent = 'Supprimer';
	removeText.setAttribute('title', 'Supprimer');
	removeText.classList.add('removeText');
	
	deleteProduct(removeText);

	removeDiv.appendChild(removeText);
	removeDiv.classList.add('removeDiv');

}


