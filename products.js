const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product_id = urlParams.get("id");

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
      product.price + " €";

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

function addVarnishOption(varnishOption) {
  const newOption = document.createElement("option");
  newOption.classList.add("varnishOption");
  newOption.setAttribute("varnishValue", varnishOption);

  newOption.textContent = varnishOption;

  return newOption;
}

let productQuantity = 0;
let quantity = document.getElementsByTagName("input")[0];
const textQuantity = document.querySelector(".quantity > p ");

quantity.addEventListener("input", function () {
  let quantityTyped = parseFloat(this.value);

  if (Number.isInteger(quantityTyped)) {
    productQuantity = quantityTyped;
  } else {
    alert("Veuillez indiquer un nombre entier");
  }
});

function addToCart(product) {
  const cart = localStorage.getItem("cart");

  if (!cart) {
    const newCartProductList = [];
    newCartProductList.push(product);
    localStorage.setItem("cart", JSON.stringify(newCartProductList));
  } else {
    const cartProductList = JSON.parse(cart);
    cartProductList.push(product);
    localStorage.setItem("cart", JSON.stringify(cartProductList));
  }

  console.log(localStorage.getItem("cart"));
}
