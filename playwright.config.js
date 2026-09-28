const { defineConfig, devices } = require("@playwright/test");

const intConfig = require("./config/int.js");
const uatConfig = require("./config/uat.js");
const preprodConfig = require("./config/preprod.js");

const environment = process.env.TEST_ENV || "int";

const environmentConfig = {
  int: intConfig,
  uat: uatConfig,
  preprod: preprodConfig,
};

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },
  //fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 1,
  reporter: "html",

  use: {
    headless: false,
    baseURL: environmentConfig[environment].baseURL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
