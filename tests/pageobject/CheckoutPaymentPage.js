class CheckoutPaymentPage {
  constructor(page) {
    this.page = page;

    this.paymentMethod = this.page.locator("#payment-method");
    this.confirmOrderButton = this.page.getByRole("button", {
      name: "Confirm",
    });
  }

  async selectCashOnDeliveryAndConfirm() {
    await this.paymentMethod.selectOption("cash-on-delivery");
    await this.confirmOrderButton.click();
  }
}

module.exports = { CheckoutPaymentPage };
