let products = [];
let cart = [];

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// added to be able to get the storage
function getLocalStorage(key) {
  return localStorage.getItem(key);
}

// get tents data
function getProductsData() {
  fetch("../json/tents.json")
    .then(convertToJson)
    .then((data) => {
      products = data;
    });
}
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
function addToCart(e) {
  const product = products.find((item) => item.Id === e.target.dataset.id);
  // A new product is pushed onto the cart
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

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

loadCart();
getProductsData();
// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCart);
