import ProductData from "./productData.js";
import ProductListing from "./productList.js";
import { loadHeaderFooter,getParams } from "./utils.js";

const category = getParams("category")
const data = new ProductData();
const list = new ProductListing(
  category,
  data,
  document.querySelector(".product-list")
);
list.init();
loadHeaderFooter();