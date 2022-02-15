import { getLocalStorage } from "./utils.js";

export default class CheckoutProcess{
    constructor(key, outputSelector){
        this.shipping = 0;
        this.tax = 0;
        this.itemTotal = 0;
        this.orderTotal = 0;
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
        let numItems = 0;
        for (var product of this.list){
            this.itemTotal += product.FinalPrice;
            numItems++;
        }
        // put the number of items and the itemTotal into the form

    }
    // run this function when the zip code is filled in
    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.shipping = 10 + ((this.list.length - 1) * 2);
        // display the totals.
        this.displayOrderTotals();
      }
      displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        
      }
}