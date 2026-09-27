import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

test('products page visual regression', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );

    await expect(page).toHaveScreenshot('products-page.png');
});
