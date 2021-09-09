let cartProductList = JSON.parse(localStorage.getItem("cart"));
const isCartEmpty = !cartProductList || cartProductList.length == 0;

renderCartProducts(cartProductList);

function isCartEmpty() {
	if (!isCartEmpty) {

	} else {

	}
}

function renderCartProducts(cartProductList) {
  if (isCartEmpty) {
    let emptyCart = document.createElement("p");
    emptyCart.textContent = "Votre panier est vide.";
    document.getElementById("cartContainer").appendChild(emptyCart);
  } else {
    cartProductList.forEach((product) => {
      const productInCart = document.createElement("div");
      productInCart.classList.add("cartProductsContainer");

      const removeButton = document.createElement("button");
      removeButton.classList.add("btn-primary");
      removeButton.innerText = "Retirer du panier";

		removeButton.addEventListener("click", function() {
			removeProductFromLocalStorage(product);
			productInCart.remove();
		})

      const img = getProductInCartImg(product);
      const info = getProductInCart(product);

      productInCart.appendChild(img);
      productInCart.appendChild(info);
      productInCart.appendChild(removeButton);

      document.getElementById("cartContainer").appendChild(productInCart);
    });
  }
}

function removeProductFromLocalStorage(product) {
	let index = cartProductList.indexOf(product);
	cartProductList.splice(index,1);
	localStorage.setItem("cart", JSON.stringify(cartProductList));

}

function getProductInCart(product) {
  const description = document.createElement("div");
  description.classList.add("cart_description");
  const productName = document.createElement("p");
  const productPrice = document.createElement("p");

  productName.className = "cart_name";
  productPrice.className = "cart_price";
  productName.innerText = product.name;
  productPrice.innerText = product.price + " €";

  description.appendChild(productName);
  description.appendChild(productPrice);

  return description;
}

function getProductInCartImg(product) {
  const image = document.createElement("img");
  image.setAttribute("src", product.imageUrl);
  image.className = "cartItemImage";
  return image;
}

function removeButton() {
  const removeDiv = document.createElement("div");
  const removeText = document.createElement("p");

  removeText.textContent = "Supprimer";
  removeText.setAttribute("title", "Supprimer");
  removeText.classList.add("removeText");

  deleteProduct(removeText);

  removeDiv.appendChild(removeText);
  removeDiv.classList.add("removeDiv");
}

// FORM //

formOrder = document.getElementsByTagName("form")[0];

formOrder.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!isCartEmpty) {
    let contact = getContactInfo();
    let productList = getProductList();
    sendOrder(contact, productList);
  } else {
    alert("Votre panier est vide");
    formOrder.reset();
  }
});

// regex check

const regexText = new RegExp("^[A-Za-z-äë]");

const regexAddress = new RegExp("^[a-zA-Z0-9_-èé ]*$");

const regexPostalCode = new RegExp("^(?!00000)\\d{5}$");

const regexEmail = new RegExp("^[A-Za-z0-9-_.]+@[a-z]{3,}[.][a-z]{2,4}$");

function textCheck(value) {
	if (regexText.test(value)) {
		return true;
	} else {
		console.log(regexText);
		console.log("entrée non valide!");
		return false;
	}
}
function addressCheck(value) {
  if (regexAddress.test(value)) {
    return true;
  } else {
    console.log(regexAddress);
    console.log("adresse non valide!");
    return false;
  }
}

function postalCodeCheck(value) {
  if (regexPostalCode.test(value)) {
    return true;
  } else {
    console.log(regexPostalCode);
    console.log("code postal non valide!");
    return false;
  }
}

function emailCheck(value) {
  value = value.toString();
  if (regexEmail.test(value)) {
    return true;
  } else {
    console.log(regexEmail);
    console.log("mail non valide");
    return false;
  }
}

let validAddress = false;
let validPostalCode = false;
let validEmail = false;

function formListnener(element) {
  element.addEventListener("change", function () {
    if (element.name == "address" || element.name == "complement") {
      element.setAttribute("value", this.value);
      validAddress = addressCheck(this.value);

      if (!validAddress) {
        element.classList.add("errorText");
        element.setAttribute("value", "");
      } else {
        element.classList.remove("errorText");
      }
    }

    if (element.name === "postalCode") {
      element.setAttribute("value", this.value);
      validPostalCode = postalCodeCheck(this.value);

      if (!validPostalCode) {
        element.classList.add("errorText");
        element.setAttribute("value", "");
      } else {
        element.classList.remove("errorText");
      }
    }

    if (element.type === "email") {
      element.setAttribute("value", this.value);
      validEmail = emailCheck(this.value);

      if (!validEmail) {
        element.classList.add("errorText");
        element.setAttribute("value", "");
      } else {
        element.classList.remove("errorText");
        localStorage.emailAddress = JSON.stringify(element.value);
      }
    }
  });
}

function getContactInfo() {
  let contact = {};

  return contact;
}

function getProductList() {
  let products = [];
  cartProductList.forEach((element) => {
    products.push(element.id);
  });
  return products;
}

// POST //

function sendOrder(contact, productList) {
  let orderData = { contact: contact, products: productList };

  const url = "http://​localhost:3000/api/furniture/order";
  //const orderId = "";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (res) {
      localStorage.orderId = JSON.stringify(res.orderId);
      if (localStorage.orderId) {
        window.location.href = "order.html";
      } else {
        console.log(
          "localStorage.orderId does not exist, look for post fetch promise"
        );
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
