import{loadHeaderFooter as r}from"./utils.js";import u from"./checkoutProcess.js";r();const e=new u("so-cart",".checkout-summary");e.init(),document.querySelector("#zip").addEventListener("blur",e.calculateOrdertotal.bind(e)),document.querySelector("#checkoutSubmit").addEventListener("click",c=>{c.preventDefault();var t=document.forms[0],o=t.checkValidity();t.reportValidity(),o&&e.checkout()});
