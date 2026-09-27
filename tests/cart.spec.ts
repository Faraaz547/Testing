import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import products from '../test-data/products.json';
import users from '../test-data/users.json';
test('cart shows correct item count', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.standardUser.username,
    users.standardUser.password
    );

    await productsPage.addProductToCart(
        products.backpack
    );

    await productsPage.openCart();

    await expect(page.locator('.cart_item')).toHaveCount(1);
});