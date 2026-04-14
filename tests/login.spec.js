import { test, expect } from '@playwright/test';
import LoginPage from './loginpage.js';
import loginData from './logincredentails.js';

test('SauceDemo - Data Driven Login Test', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.open();

  for (const data of loginData) {

    // clear inputs before each iteration
    await page.fill('#user-name', '');
    await page.fill('#password', '');

    // perform login
    await loginPage.login(data.username, data.password);

    // =========================
    // VALIDATION
    // =========================
    if (data.expected === 'error') {

      const error = await loginPage.getError();
      await expect(error).toBeVisible();
      const errorText = (await error.textContent()).trim();
      expect(errorText).toMatch(
        /Username is required|Password is required|Username and password do not match/
      );

    } else {

      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('.inventory_list')).toBeVisible();

      // reset back to login page for next iteration
      await page.goto('https://www.saucedemo.com/');
    }
  }

});