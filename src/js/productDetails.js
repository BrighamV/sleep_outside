import { setLocalStorage } from "./utils.js";
import { getLocalStorage } from "./utils.js";
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.cart = [];
    
  }
  addToCart(e) {
    // const product = this.products.find((item) => item.Id === e.target.dataset.id);
    let foundItem = false;
    for (var cartItem of this.cart) {
      if (this.productId === cartItem.Id){
        // if the product is found, update the quantity
        cartItem.qty += 1;
        foundItem = true;
      } else if(foundItem){
        // break out of the loop, if the product is found
        break;
      }
    }
    if(!foundItem){
      // if not fount add a quantity variable to the product and set it to one
      this.product["qty"] = 1;
      this.cart.push(this.product);
    }

    // A new product is pushed onto the cart
    
    setLocalStorage("so-cart", this.cart);
    const logo = document.querySelector(".cart");
    let x = 1;
    let y = 1;
    // Animates the cart for a few seconds. 
    const myInt = setInterval(() => {
        if (x < 1.5) {
          x += .1;
          y += .1;
        } else {
          x = 1;
          y = 1;
        }
        
        logo.style.transform = `scale(${x},${y})`;
    }, 1000/3);

    setTimeout(() => {
      clearInterval(myInt);
    }, 4000);
    // this gets the number of items in the local storage for the cart's superscript
    let number = localStorage.getItem("so-cart");
    console.log(Math.round(Object.keys(number).length / 1152));
    let items = Math.round(Object.keys(number).length / 1152);
    document.querySelector("#superScript").innerHTML = items;
  }

  renderProductDetails() {
    // note will have to use specific names
    let discount = Math.round(
      (1 - this.product.FinalPrice / this.product.SuggestedRetailPrice) * 100
    );
    return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="card__discount">${discount}% off</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div></section>`;
  }
  loadCart() {
    let currentCart = getLocalStorage("so-cart");
    if (currentCart != null) {
      // adds every item to the current cart
      for (var cartItem of currentCart) {
        this.cart.push(cartItem);
      }
    }
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    document.querySelector("main").innerHTML = this.renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
}
