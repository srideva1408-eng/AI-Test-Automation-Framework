const { expect } = require("@playwright/test");

class CheckoutSignInPage {
  constructor(page) {
    this.page = page;

    this.alreadyLoggedInMessage = this.page.getByText(
      "Hello Jack Howe, you are already logged in. You can proceed to checkout.",
    );
    this.proceedToCheckoutButton = this.page.getByRole("button", {
      name: "Proceed to checkout",
    });
  }

  async verifyAlreadyLoggedIn() {
    await expect(this.alreadyLoggedInMessage).toBeVisible();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = { CheckoutSignInPage };
