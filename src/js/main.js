import ExternalServices from "./externalServices.js";
import ProductListing from "./productList.js";
import { loadHeaderFooter } from "./utils.js";

const data = new ExternalServices("tents");
const list = new ProductListing(
  "tents",
  data,
  document.querySelector(".product-list")
);
list.init();
loadHeaderFooter();
