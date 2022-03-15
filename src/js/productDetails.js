import { setLocalStorage, getLocalStorage, alertMessage, getTotalNumItems } from "./utils.js";
import { displayProductPageBreadcrumbs } from "./breadcrumbs.js";
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.cart = [];
    this.selectedColor = "";
  }
  addToCart(e) {
    // const product = this.products.find((item) => item.Id === e.target.dataset.id);
    let foundItem = false;
    this.product.SelectedColor = this.selectedColor;
    // change the color image
    if (this.product.Colors.length != 1) {
      this.product.Colors.forEach((color) => {
        if (color.ColorName === this.selectedColor) {
          this.product.CartImage = color.ColorPreviewImageSrc;
        }
      });
    } else {
      this.product.CartImage = this.product.Images.PrimaryMedium;
    }

    for (var cartItem of this.cart) {
      if (
        this.productId === cartItem.Id &&
        this.selectedColor === cartItem.SelectedColor
      ) {
        // if the product is found, update the quantity
        cartItem.qty += 1;
        foundItem = true;
      } else if (foundItem) {
        // break out of the loop, if the product is found
        break;
      }
    }
    if (!foundItem) {
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
    getTotalNumItems();
  
    alertMessage("Item successfully added to cart.");
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
        <p><b>Color:</b> ${this.selectedColor}</p>
        <div class="product-colors">${this.getColors()}</div>
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="card__discount">${discount}% off</p>
        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${
            this.product.Id
          }">Add to Cart</button>
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
    // start with the first color
    this.selectedColor = this.product.Colors[0].ColorName;
    // once we have the product details we can render out the HTML
    document.querySelector("main").innerHTML = this.renderProductDetails();
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));

    if (this.product.Colors.length != 1) {
      document.querySelectorAll(".product-colors div").forEach((color) => {
        color.addEventListener("click", this.changeColor.bind(this));
      });
    }

    // add breadcrumbs to the page
    displayProductPageBreadcrumbs(this.product);
  }
  // use this to get the colors then style them somehow (make them selectable)
  // add event listeners to each and make it so that it changes the color value!!!
  // maybe make it a box with an image kind of like amazon does, but make it different!!!
  getColors() {
    let colorHMTL = "";
    if (this.product.Colors.length === 1) return colorHMTL;
    this.product.Colors.forEach((color) => {
      if (color.ColorName === this.selectedColor) {
        colorHMTL += `
        <div class="color selected-color" id="${color.ColorName}">
          <img
              src="${color.ColorChipImageSrc}"
              alt="${color.ColorName}}" width="25px"
              id="${color.ColorName}"
            />
          <img
              src="${color.ColorPreviewImageSrc}"
              alt="${color.ColorName}}"
              width="25px"
              id="${color.ColorName}"
            />
        </div>
        `;
      } else {
        colorHMTL += `
        <div class="color" id="${color.ColorName}">
        <img
            src="${color.ColorChipImageSrc}"
            alt="${color.ColorName}}" width="25px"
            id="${color.ColorName}"
          />
        <img
            src="${color.ColorPreviewImageSrc}"
            alt="${color.ColorName}}"
            width="25px"
            id="${color.ColorName}"
          />
      </div>
      `;
      }
    });
    return colorHMTL;
  }
  changeColor(e) {
    // this gets the id out of the element, which will be the product name
    this.selectedColor = e.srcElement.id;
    // re-render the products page and adds the event listeners again
    document.querySelector("main").innerHTML = this.renderProductDetails();
    document.querySelectorAll(".product-colors div").forEach((color) => {
      color.addEventListener("click", this.changeColor.bind(this));
    });
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
}
