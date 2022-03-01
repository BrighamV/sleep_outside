import ExternalServices from "./externalServices.js";
import { alertMessage, removeAllAlerts } from "./utils.js";

export default class Admin{
    constructor(){
        let token = null;
        let email = null;
        let password = null;
        this.services = new ExternalServices();
    }
    async login(creds){
    // I built the login method with a callback: next. 
  // This makes it much more flexible...
  // there could be many different things the user wants to do after logging in...
  // this allows us that flexibility without having to write a bunch of login methods
    try {
        this.token = await this.services.loginRequest(creds);
    } 
    catch(err) {
        removeAllAlerts();
        alertMessage(err.message.message);
    }
    }
    showLogin(){
        // TODO: REMOVE THE DEFAULT VALUES FOR EMAIL AND PASSWORD
        const loginForm = `
        <form class="login-form">
        <fieldset>
        <legend>Login</legend>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" value="user1@email.com" required />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" value="user1" required />
        <button type="submit" id="loginButton">Login</button>
        </form>
        `
        document.querySelector(".login-section").innerHTML = loginForm;
        document.querySelector("#loginButton").addEventListener("click", (e) =>{
            e.preventDefault();
            this.email = document.querySelector("#email").value;
            this.password = document.querySelector("#password").value;
            this.login({email: this.email, password: this.password});
        });
    }
}

let myAdmin = new Admin;
myAdmin.showLogin();