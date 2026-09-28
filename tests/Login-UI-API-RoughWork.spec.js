const { page, expect, test, request } = require("@playwright/test");
const { title } = require("node:process");

test("Successful Login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://practicesoftwaretesting.com/auth/login");

  await page
    .getByPlaceholder("Your email")
    .fill("customer@practicesoftwaretesting.com");
  await page.getByPlaceholder("Your password").fill("welcome01");

  await page.getByRole("button", { name: "Login" }).click();

  const homePageText = await page.locator("[data-test='page-title']");

  expect(homePageText).toHaveText("My account");

  await page.pause();
});

// Login through API

test("Login through API", async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    "https://api.practicesoftwaretesting.com/users/login",
    {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
      },
    },
  );
  const responseBody = await response.json();
  const acessToken = await responseBody.access_token;
  console.log(acessToken);
});

//Add to cart

test.only("API Flow Add to Cart", async () => {
  const apiContext = await request.newContext();

  // 1. Login
  const loginResponse = await apiContext.post(
    "https://api.practicesoftwaretesting.com/users/login",
    {
      data: {
        email: "customer@practicesoftwaretesting.com",
        password: "welcome01",
      },
    },
  );
  const { access_token } = await loginResponse.json();
  expect(access_token).toBeTruthy();

  // 2. Create a fresh cart
  const cartResponse = await apiContext.post(
    "https://api.practicesoftwaretesting.com/carts",
    {
      headers: { Authorization: `Bearer ${access_token}` },
      data: {},
    },
  );
  const cartBody = await cartResponse.json();
  console.log("Cart creation response:", cartBody); // ← confirm the real shape

  expect(cartResponse.status()).toBe(201); // also assert this call succeeded, not just the later one
  const cartId = cartBody.id; // adjust field name once confirmed from the log above
  expect(cartId).toBeTruthy();

  // 3. Add product to that cart
  const addResponse = await apiContext.post(
    `https://api.practicesoftwaretesting.com/carts/${cartId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        product_id: "01M3726TM7649QTM4GSM5K113Q",
        quantity: 1,
      },
    },
  );

  expect(addResponse.status()).toBe(200);
  console.log(await addResponse.json());
});
