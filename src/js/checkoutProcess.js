import { getLocalStorage } from "./utils.js";
import ExternalServices from "./externalServices.js";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.

  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}
      
    
export default class CheckoutProcess{
    constructor(key, outputSelector){
        this.shipping = 0;
        this.tax = 0;
        this.itemTotal = 0;
        this.orderTotal = 0;
        this.numItems = 0;
        this.list = [];
        this.key = key;
        this.outputSelector = outputSelector;
    }
    init(){
        // get the items 
        this.list = getLocalStorage(this.key);
        // calculate the item subtotal when the page loads
        this.calculateItemSummary();
    }
    calculateItemSummary(){
        // calculate the number of items in the cart and the total of those items
        for (var product of this.list){
            // multiply by the quantity
            this.itemTotal += product.FinalPrice;
            // this.numItems += product.quantity;
        }
        
        // put the number of items and the itemTotal into the form
        document.querySelector("#subtotal").innerHTML += "$" + (this.itemTotal).toFixed(2);
    }
    // run this function when the zip code is filled in
    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        // FIXME: make this work with the quantity
        this.shipping = 10 + ((this.list.length - 1) * 2);
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
          parseFloat(this.itemTotal) +
          parseFloat(this.shipping) +
          parseFloat(this.tax)
        ).toFixed(2);
        // display the totals.
        this.displayOrderTotals();
      }
      displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        document.querySelector("#tax").innerHTML += "$" + this.tax;
        document.querySelector("#shippingEst").innerHTML += "$" + this.shipping;
        document.querySelector("#orderTotal").innerHTML += "$" + (this.orderTotal);
      }

      async checkout() {
        // build the data object from the calculated fields, the items in the cart, and the information entered into the form
        const formElement = document.forms["checkout"];
        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
        const res = await services.checkout(json);
        console.log(res);
        } catch (err) {
        console.log(err);
        }
        }
        // call the checkout method in our ExternalServices module and send it our data object.
}


