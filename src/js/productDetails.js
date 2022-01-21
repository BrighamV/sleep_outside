export default class ProductDetails  {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource; 
      }
      addToCart(e) {
        // const product = products.find((item) => item.Id === e.target.dataset.id);
        // A new product is pushed onto the cart
        cart.push(this.product);
        setLocalStorage("so-cart", this.product);
      }
      renderProductDetails() {
        // note will have to use specific names
        const productDetails = 
        `
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">Rimrock Tent - 2-Person, 3-Season</h2>
        <img
          class="divider"
          src="../images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg"
          alt="Rimrock Tent - 2-Person, 3-Season"
        />

        <p class="product-card__price">$69.99</p>
        <p class="product__color">Rust/Clay</p>
        <p class="product__description">
          Lightweight and ready for adventure, this Cedar Ridge Rimrock tent
          boasts a weather-ready design that includes a tub-style floor and
          factory-sealed rain fly
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
        </div>        
        `;
        return productDetails;
      }
      async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById("addToCart")
                .addEventListener("click", this.addToCart.bind(this));
      }
  }
