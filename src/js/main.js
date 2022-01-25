import ProductData from "./productData.js";
import ProductList from "./productList.js";
const data = new ProductData("tents")
const listElement = document.querySelector(".product-list")
const listData = new ProductList("tents", data, listElement)
listData.init();
console.log(listData)

