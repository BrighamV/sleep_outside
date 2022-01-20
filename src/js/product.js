import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParams } from "./utils.js";

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

let products = [];
let cart = [];

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// added to be able to get the storage
function getLocalStorage(key) {
  return localStorage.getItem(key);
}


// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
// moved to product details
// function addToCart(e) {
//   const product = products.find((item) => item.Id === e.target.dataset.id);
//   // A new product is pushed onto the cart
//   cart.push(product);
//   setLocalStorage("so-cart", cart);
// }

// loads up the current cart, when the page is loaded
// this allows the cart to be added to
function loadCart() {
  let currentCart = getLocalStorage("so-cart");
  if (currentCart != null) {
    // need to convert the cart to a JSON object
    currentCart = JSON.parse(currentCart);
    // adds every item to the current cart
    for (var cartItem of currentCart) {
      cart.push(cartItem);
    }
  }
}

getParams();
loadCart();
// getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
