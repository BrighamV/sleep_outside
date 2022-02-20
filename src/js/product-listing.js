// eslint-disable-next-line import/namespace
import ExternalServices from "./externalServices.js";
import ProductListing from "./productList.js";
import { loadHeaderFooter, getParams } from "./utils.js";

const category = getParams("category");
const data = new ExternalServices();
const list = new ProductListing(
  category,
  data,
  document.querySelector(".product-list")
);
list.init();
loadHeaderFooter();
