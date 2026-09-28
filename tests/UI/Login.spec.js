const { expect, test } = require("@playwright/test");

const { POManager } = require("../pageobject/POManager");

const dataSet = JSON.parse(
  JSON.stringify(require("../../fixtures/testdata.json")),
);

test("Wrong password", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  const poManager = new POManager(page);

  const loginPage = poManager.getLoginPage();

  const data = dataSet[1];

  await loginPage.goTo();
  await loginPage.loginToApplicationWithWrongPassword(
    data.username,
    data.password,
  );

  await page.pause();
});
