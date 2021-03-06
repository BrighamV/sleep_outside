// // save data to local storage
// function setLocalStorage(key, data) {
//   localStorage.setItem(key, JSON.stringify(data));
// }

// function getLocalStorage(key) {
//   // console.log(localStorage.getItem(key));
//   // console.log(JSON.parse(localStorage.getItem(key)));
//   return JSON.parse(localStorage.getItem(key));
// }

// function getCartContents() {
//   let markup = "";
//   let total = 0;

//   const cartItems = getLocalStorage("so-cart");
//   // calculate the total of the items
//   for (var items of cartItems) {
//     total += items.FinalPrice;
//   }
//   // render the total if there are items in the cart
//   if (total > 0) {
//     renderTotal(total);
//   }
//   const htmlItems = cartItems.map((item) => renderCartItem(item));

//   document.querySelector(".product-list").innerHTML =  htmlItems.join("");
//   // removing items from cart
//   // you can add an event listener to the parent class, since that exists in the DOM
//   // then check to see if what is clicked has the class "cart-card__remove"
//   document.querySelector(".product-list").addEventListener("click", function(e) {
//     if(e.target.classList == "cart-card__remove") {
//       removeFromCart(e.target.id);
//     }
//   });
//   // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
// }

// // renders the total for the items in the cart
// function renderTotal(total) {
//   // remove the hide class
//   document.querySelector(".cart-footer").classList.remove("hide");
//   // render the total in the cart
//   document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
// }

// function removeFromCart(id){
//   // get the item to be removed
//   const cartItems = getLocalStorage("so-cart");
//   let newCart = [];
//   let foundItem = false;
//   // remove the item from so-cart
//   for (var item of cartItems){
//     if(!foundItem){
//       // don't add the item to the new cart, if found
//       if(item.Id === id){
//         foundItem = true;
//       } else {
//         newCart.push(item);
//       }
//     } else {
//       newCart.push(item);
//     }
//   }

//   // set the new cart to the one without the removed item
//   setLocalStorage("so-cart", newCart);
//   // reload the cart contents on the page
//   getCartContents();
//   // if the cart is empty, hide the total
//   if(newCart.length === 0){
//     document.querySelector(".cart-footer").classList.add("hide");
//   }

// }

// function renderCartItem(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Image}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__remove" id="${item.Id}">X</p  >
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;
//   // document.getElementById(item.Id).addEventListener("click", removeFromCart);
//   // console.log(newItem);
//   return newItem;
// }

// getCartContents();

// // old version of get cart contents
// // function getCartContents() {
// //   let markup = "";
// //   let total = 0;

// //   const cartItems = getLocalStorage("so-cart");
// //   // calculate the total of the items
// //   for (var items of cartItems) {
// //     total += items.FinalPrice;
// //   }
// //   // render the total if there are items in the cart
// //   if (total > 0) {
// //     renderTotal(total);
// //   }
// //   const htmlItems = cartItems.map((item) => renderCartItem(item));

// //   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// //   document.getElementById(".cart-card__remove").addEventListener("click", removeFromCart);
// //   // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
// // }

import { loadHeaderFooter, setLocalStorage, getLocalStorage } from "./utils.js";
import CartList from "./cartList.js";

loadHeaderFooter();

const cart = new CartList("so-cart", document.querySelector(".product-list"));
cart.init();

export function removeFromCart(id) {
  // get the item to be removed
  const cartItems = getLocalStorage("so-cart");

  cartItems.forEach((item) => {
    if (item.Id === id) {
      item.qty--;
      if (item.qty <= 0) {
        cartItems.splice(cartItems.indexOf(item), cartItems.indexOf(item) + 1);
      }
    }
  });

  setLocalStorage("so-cart", cartItems);

  // it won't work properly unless the page re-loads (multiple get removed at once)
  location.reload();
}

export function changeQuantity(id, quantity) {
  const cartItems = getLocalStorage("so-cart");
  cartItems.forEach((item) => {
    if (item.Id === id) {
      item.qty = quantity;
      if (item.qty <= 0) {
        cartItems.splice(cartItems.indexOf(item), cartItems.indexOf(item) + 1);
      }
    }
  });

  setLocalStorage("so-cart", cartItems);
  location.reload();
}
