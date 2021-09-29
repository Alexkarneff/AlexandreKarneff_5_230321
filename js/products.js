const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get("id");

// On récupère les données sur le produit sélectionné
fetch("http://localhost:3000/api/furniture/" + product_id)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function (product) {
    document.getElementsByClassName("product_name")[0].textContent =
      product.name;

    document.getElementsByClassName("product_price")[0].textContent = 
    "Prix: " + product.price/100 + " €";

    document.getElementById("imgProduct").setAttribute("src", product.imageUrl);

    document.getElementsByClassName("text_description")[0].textContent =
      product.description;


    document
      .getElementById("addProductToCart")

      .addEventListener("click", function () {
        addToCart(product);
      });

    product.varnish.forEach((varnishColor) => {
      newChoice = addVarnishOption(varnishColor);

      document.getElementById("varnishOptions").appendChild(newChoice);
    });
  })
  .catch(function (error) {
    console.log(error);
  });


// Ajout des options de vernis 
function addVarnishOption(varnishOption) {
  const newOption = document.createElement("option");
  newOption.classList.add("varnishOption");
  newOption.setAttribute("varnishValue", varnishOption);

  newOption.textContent = varnishOption;

  return newOption;
}

// Fonction ajoutant le produit au panier au clic sur le bouton ajouter
function addToCart(product) {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    const newCartProductList = [];
    newCartProductList.push(product);
    localStorage.setItem("cart", JSON.stringify(newCartProductList));
    alert("Produit ajouté au panier avec succès !");
  } else {
    const cartProductList = JSON.parse(cart);
    cartProductList.push(product);
    localStorage.setItem("cart", JSON.stringify(cartProductList));
    alert("Produit ajouté au panier avec succès !");
  }
}
