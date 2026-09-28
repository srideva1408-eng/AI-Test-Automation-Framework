class CheckoutBillingPage {
  constructor(page) {
    this.page = page;
    this.countryName = this.page.locator("#country");
    this.countryPostCode = this.page.getByPlaceholder("Your Postcode *");
    this.houseNumber = this.page.locator('[data-test="house_number"]');
    this.proceedToCheckout = this.page.getByRole("button", {
      name: "Proceed to checkout",
    });
  }

  async billingDetails() {
    await this.countryName.selectOption("DZ");
    await this.countryPostCode.fill("1234");
    await this.houseNumber.fill("1234");
    await this.proceedToCheckout.click();
  }
}
module.exports = { CheckoutBillingPage };
