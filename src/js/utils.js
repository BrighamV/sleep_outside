// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const params = urlParams.get(param);
  return params;
}

export function renderListWithTemplate(template, parent, list, callback) {
  list.forEach((item) => {
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parent.appendChild(templateWithData);
  });
}

export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }
  parent.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

function getTotalNumItems() {
  // this gets the number of items in the local storage for the cart's superscript
  let number = localStorage.getItem("so-cart");
  console.log(Math.round(Object.keys(number).length / 1152));
  let items = Math.round(Object.keys(number).length / 1152);
  // document.querySelector("#superScript").innerHTML = items;
  return items;
}

export async function loadHeaderFooter() {
  const head = await loadTemplate("../partials/header.html");
  const foot = await loadTemplate("../partials/footer.html");
  const header = document.getElementById("main-header");
  const footer = document.getElementById("main-footer");
  
  renderWithTemplate(head, header);
  renderWithTemplate(foot, footer);
  let items = getTotalNumItems();
  document.querySelector("#superScript").innerHTML = items;
}
function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error("Bad Response");
  }
}
