import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");

myCheckout.init();

// Calculate the other things once the zipcode is entered
document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();
    myCheckout.checkout();
});