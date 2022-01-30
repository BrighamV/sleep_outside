function getLocalStorage(key) {
  // console.log(localStorage.getItem(key));
  // console.log(JSON.parse(localStorage.getItem(key)));
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = "";
  let total = 0;
  
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
  document.getElementById(".cart-card__remove").addEventListener("click", removeFromCart);
  // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

// renders the total for the items in the cart
function renderTotal(total) {
  // remove the hide class
  document.querySelector(".cart-footer").classList.remove("hide");
  // render the total in the cart
  document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
}

function removeFromCart(id){
  // console.log(id);
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
  <p class="cart-card__remove" id="${item.Id}">X</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  // document.getElementById(item.Id).addEventListener("click", removeFromCart);
  // console.log(newItem);
  return newItem;
}

getCartContents();
