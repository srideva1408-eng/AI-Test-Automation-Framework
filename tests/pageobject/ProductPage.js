class ProductPage {
  constructor(page) {
    this.page = page;

    this.addToCart = this.page.getByRole("button", { name: "Add to cart" });
  }

  async addingToCart() {
    await this.addToCart.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { ProductPage };
