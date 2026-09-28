class CategoryPage {
  constructor(page) {
    this.page = page;
    this.categoryButton = this.page.getByRole("button", { name: "Categories" });
    this.handToolsLink = this.page.locator('[data-test="nav-hand-tools"]');
    this.measuresFilter = this.page.getByLabel("Measures");
    this.productCards = this.page.locator(".card");
  }

  //Methods/ Actions

  async filterByHandToolsAndMeasures() {
    await this.categoryButton.click();
    await this.handToolsLink.click();
    await this.measuresFilter.check();
    await this.page.waitForLoadState("networkidle");
  }

  async selectProductByName(expectedProductName) {
    // Wait until at least one product card is visible after filtering.
    await this.productCards.first().waitFor();

    // Inspect the filtered product list and find the target product.
    const listOfProducts = await this.productCards;

    for (let i = 0; i < (await listOfProducts.count()); i++) {
      const productName = await listOfProducts
        .nth(i)
        .locator("[data-test='product-name']")
        .textContent();

      console.log(productName);

      // Click the specific product when it matches the expected item name.
      if (productName.trim() === expectedProductName) {
        await listOfProducts
          .nth(i)
          .locator("[data-test='product-name']")
          .click();
      }
      break;
    }
  }
}

module.exports = { CategoryPage };
