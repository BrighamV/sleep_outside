const baseURL = "http://157.201.228.93:2992/";
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {

  }
  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson).then((data) => data.Result);
  }
  async findProductById(id) {
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
        // the API allows us to pull products directly from it by ID...so we can change this method as well to take advantage of that.
        return await fetch(baseURL + `product/${id}`).then(convertToJson)
        .then((data) => data.Result);
  }
  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}