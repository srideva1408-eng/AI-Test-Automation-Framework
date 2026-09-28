class CartPage {
  constructor(page) {
    this.page = page;

    this.cartLink = this.page.getByRole("link", { name: "cart" });
    this.proceedToCheckout = this.page.getByRole("button", {
      name: "Proceed to checkout",
    });
  }

  async clickOnCart() {
    await this.cartLink.click();

    await this.page.waitForLoadState("networkidle");

    await this.proceedToCheckout.click();
  }
}

module.exports = { CartPage };
