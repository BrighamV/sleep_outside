import ExternalServices from "./externalServices.js";
import { alertMessage, removeAllAlerts } from "./utils.js";

export default class Admin {
  constructor() {
    let token = null;
    let email = null;
    let password = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    // I built the login method with a callback: next.
    // This makes it much more flexible...
    // there could be many different things the user wants to do after logging in...
    // this allows us that flexibility without having to write a bunch of login methods
    try {
      this.token = await this.services.loginRequest(creds);
      next()
    } catch (err) {
      this.handleErrors(err);
    }
  }
  showLogin() {
    // TODO: REMOVE THE DEFAULT VALUES FOR EMAIL AND PASSWORD
    // !!!use user1@email.com and user1!!!
    const loginForm = `
        <form class="login-form">
        <fieldset>
        <legend>Login</legend>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button type="submit" id="loginButton">Login</button>
        </form>
        `;
    document.querySelector(".login-section").innerHTML = loginForm;
    document.querySelector("#loginButton").addEventListener("click", (e) => {
      e.preventDefault();
      this.email = document.querySelector("#email").value;
      this.password = document.querySelector("#password").value;
      this.login(
        { email: this.email, password: this.password },
        this.showOrders.bind(this)
      );
    });
  }
  async showOrders() {
    try {
      const orders = await this.services.getOrders(this.token);
      console.log(orders);
     // change the login section to display the orders instead
      document.querySelector(".login-section").innerHTML = orderHtml();
      const parent = document.querySelector("#orders tbody");
     // map the orders
    //   parent.innerHTML = orders.map(order=> `<tr><td>${order.id}</td><td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td><td>${order.items.length}</td><td>$${order.orderTotal}</td></tr>`).join("");
      parent.innerHTML = orders.map(order=> `<tr><td>${order.id}</td><td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td><td>${order.street}, ${order.city}, ${order.state} ${order.zip}</td><td>${order.items.length}</td><td>$${order.orderTotal}</td></tr>`).join("");
      
    } catch (err) {
      this.handleErrors(err);
    }
  }

  async handleErrors(err) {
    removeAllAlerts();
    const errorMessages = await err.message;
    for (let message in errorMessages) {
      // dont show the error code message
      if (isNaN(errorMessages[message])) {
        alertMessage(errorMessages[message]);
      }
    }
  }
}

function orderHtml() {
    return `<h2>Current Orders</h2>
    <table class="orders-table" id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>Address</th><th>#Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>
    `;
  }

let myAdmin = new Admin();
myAdmin.showLogin();
