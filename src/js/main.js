import ProductData from "./productData.js";
import ProductListing from "./productList.js";
import { loadHeaderFooter } from "./utils.js";

const data = new ProductData("tents");
const list = new ProductListing(
  "tents",
  data,
  document.querySelector(".product-list")
);
list.init();
loadHeaderFooter();

document.querySelector("#newsButton").addEventListener("click", (e) => {
  document.querySelector(".thanks").innerHTML = "Thank you for signing up!"
})