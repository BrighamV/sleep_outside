import {
  renderListWithTemplate,
  getLocalStorage,
  setLocalStorage,
} from "./utils.js";
import { removeFromCart, changeQuantity } from "./cart.js";
export default class CartList {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
    const list = getLocalStorage(this.key);
    this.renderList(list);
  }

  prepareTemplate(template, product) {
    template.querySelector(".cart-card__image img").src = product.CartImage;
    template.querySelector(".cart-card__image img").alt += product.Name;
    template.querySelector(".card__name").textContent = product.Name;
    template.querySelector(".cart-card__color").textContent =
      product.SelectedColor;
    template.querySelector(".cart-card__remove").setAttribute("id", product.Id);
    template.querySelector(".cart-card__quantity").value = product.qty;
    template
      .querySelector(".cart-card__quantity")
      .setAttribute("id", product.Id);
    template.querySelector(".cart-card__price").textContent +=
      product.FinalPrice;
    return template;
  }

  renderTotal(total) {
    // remove the hide class
    document.querySelector(".cart-footer").classList.remove("hide");
    // render the total in the cart
    document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
  }

  renderCheckoutButton() {
    // remove the hide class
    document.querySelector(".checkout").classList.remove("hide");
  }

  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = "";
    //get the template
    const template = document.getElementById("cart-card-template");
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
    // render the total
    let total = 0;
    for (var items of list) {
      // add the value of each item multiplied by the quantity of each!
      total += items.FinalPrice * items.qty;
    }
    // render the total if there are items in the cart
    if (total > 0) {
      this.renderTotal(total.toFixed(2));
      this.renderCheckoutButton();
    }
    //   // you can add an event listener to the parent class, since that exists in the DOM
    //   // then check to see if what is clicked has the class "cart-card__remove"
    document
      .querySelector(".product-list")
      .addEventListener("click", function (e) {
        if (e.target.classList == "cart-card__remove") {
          removeFromCart(e.target.id);
        }
      });

    document
      .querySelector(".product-list")
      .addEventListener("change", function (e) {
        if (e.target.classList == "cart-card__quantity") {
          changeQuantity(e.target.id, e.target.value);
        }
      });
  }
}
