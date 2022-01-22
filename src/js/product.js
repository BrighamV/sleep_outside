let products = [];
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

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
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
  console.log('clicked')
  let cartItems = getLocalStorage("so-cart");
  console.log(cartItems, typeof cartItems)
  const product = products.find((item) => item.Id === e.target.dataset.id);
  cartItems.push(product)
  setLocalStorage("so-cart", cartItems);
}

getProductsData();
// add listener to Add to Cart button
console.log(document)
document.getElementById("addToCart").addEventListener("click", addToCart);
