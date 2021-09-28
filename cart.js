let cartProductList = JSON.parse(localStorage.getItem("cart"));
const isCartEmpty = !cartProductList || cartProductList.length == 0;

renderCartProducts(cartProductList);
addListenerOnContactForm();

// Pour chaque produit dans le panier, création d'une div avec les infos du produit + un bouton retirer du panier
function renderCartProducts(cartProductList) {
  if (isCartEmpty) {
    let emptyCart = document.createElement("p");
    emptyCart.textContent = "Votre panier est vide.";
    document.getElementById("totalPriceContainer").appendChild(emptyCart);
  } else {
    cartProductList.forEach((product) => {
      const productInCart = document.createElement("div");
      productInCart.classList.add("cartProductsContainer");

      const removeButton = document.createElement("button");
      removeButton.classList.add("btn-primary");
      removeButton.innerText = "Retirer";

      removeButton.addEventListener("click", function () {
        removeProductFromLocalStorage(product);
        productInCart.remove();
      });

      const img = getProductInCartImg(product);
      const info = getProductInCart(product);

      productInCart.appendChild(img);
      productInCart.appendChild(info);
      productInCart.appendChild(removeButton);

      document.getElementById("cartContainer").appendChild(productInCart);
    });
    displayTotalPrice(cartProductList);
  }
}

// fonction pour retirer un produit du local storage
function removeProductFromLocalStorage(product) {
  let index = cartProductList.indexOf(product);
  cartProductList.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartProductList));
  displayTotalPrice(cartProductList);
}

// Récupération des informations à afficher d'un produit et création des balises de textes les contenant
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


// Récupération de l'image du produit et création de la balise img
function getProductInCartImg(product) {
  const image = document.createElement("img");
  image.setAttribute("src", product.imageUrl);
  image.className = "cartItemImage";
  return image;
}

// Ajout d'un bouton Retirer à chaque item du panier
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

// Affichage du prix total des produits dans le panier
function displayTotalPrice(cartProductList) {
  let totalPrice = 0;

  cartProductList.forEach((product) => {
    totalPrice += product.price;
  });

  var div = document.getElementById("totalPriceContainer");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  let totalPriceDisplay = document.createElement("div");
  totalPriceDisplay.classList.add("totalPriceDisplay");
  totalPriceDisplay.innerText =
    "Montant total du panier : " + totalPrice + " €.";

  document.getElementById("totalPriceContainer").appendChild(totalPriceDisplay);
}

// Les différents test regex
const regexText = new RegExp("^[A-Za-z-äë]+$");

const regexAddress = new RegExp("^[a-zA-Z0-9_-èé ]*$");

const regexPostalCode = new RegExp("^(?!00000)\\d{5}$");

const regexEmail = new RegExp("^[A-Za-z0-9-_.]+@[a-z]{3,}[.][a-z]{2,4}$");

function textCheck(value) {
  if (regexText.test(value)) {
    return true;
  } else {
    console.log("entrée non valide!");
    return false;
  }
}
function addressCheck(value) {
  if (regexAddress.test(value)) {
    return true;
  } else {
    console.log("adresse non valide!");
    return false;
  }
}

function postalCodeCheck(value) {
  if (regexPostalCode.test(value)) {
    return true;
  } else {
    console.log("code postal non valide!");
    return false;
  }
}

function emailCheck(value) {
  value = value.toString();
  if (regexEmail.test(value)) {
    return true;
  } else {
    console.log("mail non valide");
    return false;
  }
}



// On exécute le check sur le form client
function execCheckContactForm() {
  let result = true;
  let elements = getContactHtmlElement();
  elements.forEach((element) => {
    if (!isValidContactForm(element)) {
      result = false;
    }
  });
  return result;
}

let validTexts = false;
let validAddress = false;
let validPostalCode = false;
let validEmail = false;

function isValidContactForm(element) {
  // vérification des 3 champs de texte
  if (
    element.name == "firstName" ||
    element.name == "lastName" ||
    element.name == "city"
  ) {
    element.setAttribute("value", element.value);
    validTexts = textCheck(element.value);

    if (!validTexts) {
      element.classList.add("errorText");
      element.setAttribute("value", "");
      return false;
    } else {
      element.classList.remove("errorText");
    }
  }

  // vérification de l'adresse
  if (element.name == "address" || element.name == "complement") {
    element.setAttribute("value", element.value);
    validAddress = addressCheck(element.value);

    if (!validAddress) {
      element.classList.add("errorText");
      element.setAttribute("value", "");
      return false;
    } else {
      element.classList.remove("errorText");
    }
  }

  // vérification du code postal
  if (element.name === "postalCode") {
    element.setAttribute("value", element.value);
    validPostalCode = postalCodeCheck(element.value);

    if (!validPostalCode) {
      element.classList.add("errorText");
      element.setAttribute("value", "");
      return false;
    } else {
      element.classList.remove("errorText");
    }
  }

  //vérification de l'adresse email
  if (element.type === "email") {
    element.setAttribute("value", element.value);
    validEmail = emailCheck(element.value);

    if (!validEmail) {
      element.classList.add("errorText");
      element.setAttribute("value", "");
      return false;
    } else {
      element.classList.remove("errorText");
      // localStorage.emailAddress = JSON.stringify(element.value);
    }
  }
  return true;
}

// un evenement qui s'active au changement de l'un des element du form
function formListnener(element) {
  element.addEventListener("change", function () {
    isValidContactForm(element);
  });
}

// FORM //

formOrder = document.getElementsByTagName("form")[0];

// ajouter un evenement sur le click du submit du formulaire pour commander

formOrder.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!isCartEmpty) {
    if (execCheckContactForm()) {
      let contact = getContactInfo();
      let productList = getProductList();
      sendOrder(contact, productList);
    } else {
      alert("Le formulaire n'est pas valide.");
    }
  } else {
    alert("Votre panier est vide");
    formOrder.reset();
  }
});

// remplir l'objet contact avec les réponses du client
function getContactInfo() {
  let contact = {};
  contact.firstName = document.getElementById("firstName").value;
  contact.lastName = document.getElementById("lastName").value;
  contact.address = document.getElementById("address").value;
  contact.city = document.getElementById("city").value;
  contact.email = document.getElementById("email").value;

  return contact;
}

// Pour activer le listener sur le changement dans un des encarts du form
function addListenerOnContactForm() {
  let elements = getContactHtmlElement();
  elements.forEach((element) => {
    formListnener(element);
  });
}

function getContactHtmlElement() {
  let elements = [];
  let formAnswers = document.querySelectorAll(".input-box > input");

  for (let element = 0; element < formAnswers.length; element++) {
    elements.push(formAnswers[element]);
  }
  return elements;
}

// remplir une liste avec les pruduits commandés, à envoyer
function getProductList() {
  let products = [];
  cartProductList.forEach((element) => {
    products.push(element._id);
  });
  return products;
}

// POST //

// envoi des objets contacts et de la liste de produits commandés
function sendOrder(contact, productList) {
  let orderData = { contact: contact, products: productList };

  const url = "http://​localhost:3000/api/furniture/order";
  const orderId = "";

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
