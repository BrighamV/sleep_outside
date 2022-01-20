export default class ProductDetails  {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
      addToCart(e) {
        const product = products.find((item) => item.Id === e.target.dataset.id);
        // A new product is pushed onto the cart
        cart.push(product);
        setLocalStorage("so-cart", cart);
      }
      renderProductDetails() {

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
