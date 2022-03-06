var c=(a,r,t)=>new Promise((o,i)=>{var l=e=>{try{d(t.next(e))}catch(s){i(s)}},h=e=>{try{d(t.throw(e))}catch(s){i(s)}},d=e=>e.done?o(e.value):Promise.resolve(e.value).then(l,h);d((t=t.apply(a,r)).next())});import{setLocalStorage as u,getLocalStorage as n,alertMessage as p}from"./utils.js";import{displayProductPageBreadcrumbs as C}from"./breadcrumbs.js";export default class m{constructor(r,t){this.productId=r,this.product={},this.dataSource=t,this.cart=[],this.selectedColor=""}addToCart(r){let t=!1;this.product.SelectedColor=this.selectedColor,this.product.Colors.length!=1?this.product.Colors.forEach(i=>{i.ColorName===this.selectedColor&&(this.product.CartImage=i.ColorPreviewImageSrc)}):this.product.CartImage=this.product.Images.PrimaryMedium;for(var o of this.cart)if(this.productId===o.Id&&this.selectedColor===o.SelectedColor)o.qty+=1,t=!0;else if(t)break;t||(this.product.qty=1,this.cart.push(this.product)),u("so-cart",this.cart),p("Item successfully added to cart.")}renderProductDetails(){let r=Math.round((1-this.product.FinalPrice/this.product.SuggestedRetailPrice)*100);return`<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Images.PrimaryLarge}"
          alt="${this.product.NameWithoutBrand}"
        />
        <p><b>Color:</b> ${this.selectedColor}</p>
        <div class="product-colors">${this.getColors()}</div>
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="card__discount">${r}% off</p>
        <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div></section>`}loadCart(){let r=n("so-cart");if(r!=null)for(var t of r)this.cart.push(t)}init(){return c(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),this.selectedColor=this.product.Colors[0].ColorName,document.querySelector("main").innerHTML=this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this)),this.product.Colors.length!=1&&document.querySelectorAll(".product-colors div").forEach(r=>{r.addEventListener("click",this.changeColor.bind(this))}),C(this.product)})}getColors(){let r="";return this.product.Colors.length===1||this.product.Colors.forEach(t=>{t.ColorName===this.selectedColor?r+=`
        <div class="color selected-color" id="${t.ColorName}">
          <img
              src="${t.ColorChipImageSrc}"
              alt="${t.ColorName}}" width="25px"
              id="${t.ColorName}"
            />
          <img
              src="${t.ColorPreviewImageSrc}"
              alt="${t.ColorName}}"
              width="25px"
              id="${t.ColorName}"
            />
        </div>
        `:r+=`
        <div class="color" id="${t.ColorName}">
        <img
            src="${t.ColorChipImageSrc}"
            alt="${t.ColorName}}" width="25px"
            id="${t.ColorName}"
          />
        <img
            src="${t.ColorPreviewImageSrc}"
            alt="${t.ColorName}}"
            width="25px"
            id="${t.ColorName}"
          />
      </div>
      `}),r}changeColor(r){this.selectedColor=r.srcElement.id,document.querySelector("main").innerHTML=this.renderProductDetails(),document.querySelectorAll(".product-colors div").forEach(t=>{t.addEventListener("click",this.changeColor.bind(this))}),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))}}
