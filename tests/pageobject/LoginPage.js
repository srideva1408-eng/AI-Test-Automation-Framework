const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    this.userEmail = this.page.getByPlaceholder("Your email");

    this.userPassword = this.page.getByPlaceholder("Your password");
    this.signIn = this.page.getByRole("button", { name: "Login" });

    this.homePageTitle = this.page.locator("[data-test='page-title']");

    //Locators
  }

  // Methods/Actions

  async goTo() {
    // Navigate to the login page.
    await this.page.goto("/auth/login");
  }

  async loginToApplication(username, password) {
    await this.userEmail.fill(username);
    await this.userPassword.fill(password);
    await this.signIn.click();
  }

  async verifyUserIsRedirectedToAccountPage() {
    await expect(this.homePageTitle).toHaveText("My account");
  }

  async loginToApplicationWithWrongPassword(username, password) {
    await this.userEmail.fill(username);
    await this.userPassword.fill(password);
    await this.signIn.click();

    await expect(
      this.page.getByText("Invalid email or password"),
    ).toBeVisible();
  }
}
module.exports = { LoginPage };

//this.userEmail = this.page.getByPlaceholder("Your email");
//loginPage.property =value
// this refers to the current object (instance)
//loginPage.userEmail = loginPage.page.getByPlaceholder("Your email");
// userEmail =property, loginPage current object
