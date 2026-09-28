const { LoginPage } = require("./LoginPage");
const { CategoryPage } = require("./CategoryPage");
const { ProductPage } = require("./ProductPage");
const { CartPage } = require("./CartPage");
const { CheckoutSignInPage } = require("./CheckoutSignInPage");
const { CheckoutBillingPage } = require("./CheckoutBillingPage");
const { CheckoutPaymentPage } = require("./CheckoutPaymentPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.categoryPage = new CategoryPage(this.page);
    this.productPage = new ProductPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutSignInPage = new CheckoutSignInPage(this.page);
    this.checkoutBillingPage = new CheckoutBillingPage(this.page);
    this.checkoutPaymentPage = new CheckoutPaymentPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getCategoryPage() {
    return this.categoryPage;
  }

  getProductPage() {
    return this.productPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutSignInPage() {
    return this.checkoutSignInPage;
  }

  getCheckoutBillingPage() {
    return this.checkoutBillingPage;
  }

  getCheckoutPaymentPage() {
    return this.checkoutPaymentPage;
  }
}

module.exports = { POManager };
