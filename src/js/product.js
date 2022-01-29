import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParams } from "./utils.js";

const productId = getParams("product");
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);
product.init();
product.loadCart();
