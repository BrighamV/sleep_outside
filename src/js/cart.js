function getLocalStorage(key) {
  console.log(localStorage.getItem(key));
  console.log(JSON.parse(localStorage.getItem(key)));
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  let total = 0;
  // this needs to be made into an array (did this in product.js)
  const cartItems = getLocalStorage("so-cart");
  // calculate the total of the items
  for (var items of cartItems) {
    total += items.FinalPrice;
  }
  // render the total if there are items in the cart
  if (total > 0) {
    renderTotal(total);
  }
  const htmlItems = cartItems.map((item) => renderCartItem(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

// create a render total function!!!
function renderTotal(total) {
  // remove the hide class
  document.querySelector(".cart-footer").classList.remove("hide");
  // render the total in the cart
  document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
}

function renderCartItem(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();