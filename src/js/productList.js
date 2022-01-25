export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData();
  }
  renderList(list) {
    const template = document.getElementById("");
    list.forEach((product) => {
      const clone = template.content.cloneNode(true);
      this.listElement.appendChild(clone);
    });
  }
}
