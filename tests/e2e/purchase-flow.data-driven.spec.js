const { expect, test } = require("@playwright/test");
const { POManager } = require("../pageobject/POManager");

// This test reads multiple user credentials and expected product names from a JSON file,
// then runs the full purchase flow for each dataset entry using the page object model.
const dataSet = JSON.parse(
  JSON.stringify(require("../../fixtures/testdata.json")),
);

test(`EndToEnd test for ${dataSet[0].username}`, async ({ browser }) => {
  // Create a fresh browser context for the test to isolate state.
  const context = await browser.newContext();

  // Open a new page in the isolated browser context.
  const page = await context.newPage();

  const poManager = new POManager(page);

  const data = dataSet[0];

  const loginPage = poManager.getLoginPage();

  await loginPage.goTo();
  await loginPage.loginToApplication(data.username, data.password);
  await loginPage.verifyUserIsRedirectedToAccountPage();

  const categoryPage = poManager.getCategoryPage();
  await categoryPage.filterByHandToolsAndMeasures();
  await categoryPage.selectProductByName(data.expectedproductname);

  const productPage = poManager.getProductPage();
  await productPage.addingToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.clickOnCart();

  const checkoutsigninPage = poManager.getCheckoutSignInPage();
  await checkoutsigninPage.verifyAlreadyLoggedIn();
  await checkoutsigninPage.proceedToCheckout();

  const checkoutbillingPage = poManager.getCheckoutBillingPage();
  await checkoutbillingPage.billingDetails();

  const checkoutPaymentPage = poManager.getCheckoutPaymentPage();
  await checkoutPaymentPage.selectCashOnDeliveryAndConfirm();
});
