import { renderListWithTemplate } from "./utils.js";
import { displayProductListingBreadcrumbs } from "./breadcrumbs.js";

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData(this.category);
    // add the breadcrumbs to the product listing page
    displayProductListingBreadcrumbs(this.category, list.length);
    // product ids to filter out
    // const filterout = ["989CG", "880RT"];
    // // go through the list and filter out each item we don't want
    // filterout.forEach((filterElement) => {
    //   list = list.filter((element) => element.Id != filterElement);
    // });
    this.renderList(list);
  }

  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = "";
    //get the template
    const template = document.getElementById("product-card-template");
    // set the title
    document.querySelector(".title").innerHTML = this.category;
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }

  // renderList(list) {
  //   const template = document.getElementById("product-card-template");
  //   list.forEach(product => {
  //     const clone = template.content.cloneNode(true);
  //     const filledTemplate = this.prepareTemplate(clone, product);
  //     // insert the actual details of the current product into the template
  //     this.listElement.appendChild(filledTemplate);
  //   })
  // }
  prepareTemplate(template, product) {
    // generate the new link for the product page
    let productLink = window.location.href;
    let listIndex = productLink.indexOf("/product-listing");
    productLink =
      productLink.substring(0, listIndex) +
      "/product_pages/product-details.html?product=" +
      product.Id;
    template.querySelector("a").href = productLink;
    template.querySelector("img").src = product.Images.PrimaryMedium;
    template.querySelector("img").alt += product.Name;
    template.querySelector(".card__brand").textContent = product.Brand.Name;
    template.querySelector(".card__name").textContent =
      product.NameWithoutBrand;
    template.querySelector(".product-card__price").textContent +=
      product.FinalPrice;
    template.querySelector(".card__discount").textContent =
      Math.round(
        (1 - product.FinalPrice / product.SuggestedRetailPrice) * 100
      ) + "% off";

    return template;
  }
}
