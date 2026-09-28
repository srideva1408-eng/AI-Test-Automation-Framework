const { expect, test, request } = require("@playwright/test");

const dataSet = JSON.parse(
  JSON.stringify(require("../../fixtures/testdata.json")),
);
test("Login through API", async ({ page }) => {
  const firstRecord = dataSet[0];
  const username = firstRecord.username;
  const password = firstRecord.password;
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    "https://api.practicesoftwaretesting.com/users/login",
    {
      data: {
        email: username,
        password: password,
      },
    },
  );
  const responseBody = await response.json();
  const acessToken = responseBody.access_token;
  console.log(acessToken);

  await page.addInitScript(
    (token) => window.localStorage.setItem("auth-token", token),
    acessToken,
  );

  // Navigate to the login page.
  await page.goto("https://practicesoftwaretesting.com/account");
  // Verify the user is redirected to the account page after successful login.
  const homePageText = await page.locator("[data-test='page-title']");

  await expect(homePageText).toHaveText("My account");

  await page.pause();
});
