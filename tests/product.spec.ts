import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductPage';
import products from '../test-data/products.json';
import users from '../test-data/users.json';
test('user can add a product to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.standardUser.username,
    users.standardUser.password
    );

    await productsPage.addProductToCart(
        products.backpack
    );

    await productsPage.openCart();

    await expect(page.getByText('Sauce Labs Backpack'))
        .toBeVisible();
});