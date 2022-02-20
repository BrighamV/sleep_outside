import ExternalServices from "./externalServices.js";
import ProductDetails from "./productDetails.js";
import { getParams } from "./utils.js";

const productId = getParams("product");
const dataSource = new ExternalServices();
console.log(productId);
const product = new ProductDetails(productId, dataSource);
product.init();
product.loadCart();
