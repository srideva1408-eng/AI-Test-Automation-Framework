const { expect, test } = require("@playwright/test");
const { title } = require("node:process");

// This test logs in once, saves the authenticated browser state to state.json,
// and then reuses that saved state in later tests to skip the login step and test
// the rest of the purchase flow as an already-authenticated user.
let webContext;

test.beforeAll("Login once for a user", async ({ browser }) => {
  // Create a fresh browser context for the test to isolate state.
  const context = await browser.newContext();

  // Open a new page in the isolated browser context.
  const page = await context.newPage();

  // Navigate to the login page.
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  // Enter valid customer credentials.
  await page
    .getByPlaceholder("Your email")
    .fill("customer2@practicesoftwaretesting.com");
  await page.getByPlaceholder("Your password").fill("welcome01");

  // Submit the login form.
  await page.getByRole("button", { name: "Login" }).click();

  // Make sure login actually completed
  await expect(page).toHaveURL(/account/);

  // Now save authenticated state
  await context.storageState({ path: "state.json" });

  // Create context using saved authentication
  webContext = await browser.newContext({
    storageState: "state.json",
  });
});

test("first test with storage state", async ({}) => {
  const page = await webContext.newPage();

  await page.goto("https://practicesoftwaretesting.com/account");
  // Verify the user is redirected to the account page after successful login.
  const homePageText = await page.locator("[data-test='page-title']");

  await expect(homePageText).toHaveText("My account");
});

// one more test, same user and I want to bypass Login page and land on homePage using storatestate.

test("second test with storagestate", async ({}) => {
  const page = await webContext.newPage();

  await page.goto("https://practicesoftwaretesting.com/account");

  // Open the category menu to browse products.
  await page.getByRole("button", { name: "Categories" }).click();

  // Select the hand tools category from the menu.
  await page.locator('[data-test="nav-hand-tools"]').click();

  // Apply the Measures filter to narrow the product list.
  await page.getByLabel("Measures").check();
  await page.waitForLoadState("networkidle");

  // Wait until at least one product card is visible after filtering.
  await page.locator(".card").first().waitFor();

  // Inspect the filtered product list and find the target product.
  const listOfProducts = await page.locator(".card");

  for (let i = 0; i < (await listOfProducts.count()); i++) {
    const productName = await listOfProducts
      .nth(i)
      .locator("[data-test='product-name']")
      .textContent();

    console.log(productName);

    // Click the specific product when it matches the expected item name.
    if (productName.trim() === "Tape Measure 7.5m") {
      await listOfProducts.nth(i).locator("[data-test='product-name']").click();
    }
    break;
  }

  //Add to Cart

  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "cart" }).click();

  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Proceed to checkout" }).click();

  await expect(
    page.getByText(
      "Hello Jack Howe, you are already logged in. You can proceed to checkout.",
    ),
  ).toBeVisible();

  await page.getByRole("button", { name: "Proceed to checkout" }).click();

  //Billing Address

  await page.locator("#country").selectOption("DZ");

  //postcode
  await page.getByPlaceholder("Your Postcode *").fill("1234");

  //HouseNumber
  await page.locator('[data-test="house_number"]').fill("1234");

  await page.getByRole("button", { name: "Proceed to checkout" }).click();

  await page.locator("#payment-method").selectOption("cash-on-delivery");

  await page.getByRole("button", { name: "Confirm" }).click();
});
