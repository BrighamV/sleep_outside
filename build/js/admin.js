var o=(n,s,t)=>new Promise((e,a)=>{var c=r=>{try{i(t.next(r))}catch(l){a(l)}},h=r=>{try{i(t.throw(r))}catch(l){a(l)}},i=r=>r.done?e(r.value):Promise.resolve(r.value).then(c,h);i((t=t.apply(n,s)).next())});import m from"./externalServices.js";import{alertMessage as u,removeAllAlerts as g}from"./utils.js";export default class d{constructor(){let s=null,t=null,e=null;this.services=new m}login(s,t){return o(this,null,function*(){try{this.token=yield this.services.loginRequest(s),t()}catch(e){this.handleErrors(e)}})}showLogin(){const s=`
        <form class="login-form">
        <fieldset>
        <legend>Login</legend>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" required />
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button type="submit" id="loginButton">Login</button>
        </form>
        `;document.querySelector(".login-section").innerHTML=s,document.querySelector("#loginButton").addEventListener("click",t=>{t.preventDefault(),this.email=document.querySelector("#email").value,this.password=document.querySelector("#password").value,this.login({email:this.email,password:this.password},this.showOrders.bind(this))})}showOrders(){return o(this,null,function*(){try{const s=yield this.services.getOrders(this.token);console.log(s),document.querySelector(".login-section").innerHTML=p();const t=document.querySelector("#orders tbody");t.innerHTML=s.map(e=>`<tr><td>${e.id}</td><td>${new Date(e.orderDate).toLocaleDateString("en-US")}</td><td>${e.street}, ${e.city}, ${e.state} ${e.zip}</td><td>${e.items.length}</td><td>$${e.orderTotal}</td></tr>`).join("")}catch(s){this.handleErrors(s)}})}handleErrors(s){return o(this,null,function*(){g();const t=yield s.message;for(let e in t)isNaN(t[e])&&u(t[e])})}}function p(){return`<h2>Current Orders</h2>
    <table class="orders-table" id="orders">
    <thead>
    <tr><th>Id</th><th>Date</th><th>Address</th><th>#Items</th><th>Total</th>
    </thead>
    <tbody class="order-body"></tbody>
    </table>
    `}let w=new d;w.showLogin();
