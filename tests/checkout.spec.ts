import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import products from '../test-data/products.json';
import { CheckoutPage } from '../pages/CheckoutPage';
import users from '../test-data/users.json';
test('user can complete checkout', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Login
    await loginPage.goto();

    await loginPage.login(
        users.standardUser.username,
    users.standardUser.password
    );

    // 2. Add product
    await productsPage.addProductToCart(
        products.backpack
    );

    // 3. Open cart
    await productsPage.openCart();

    // 4. Checkout
    await cartPage.checkout();

    // 5. Enter customer information
    await checkoutPage.fillCustomerInformation(
        'Faraaz',
        'Shaikh',
        '400001'
    );

    // 6. Continue
    await checkoutPage.continue();

    // 7. Finish order
    await checkoutPage.finish();

    // 8. Verify successful order
    await expect(
        page.getByText('Thank you for your order!')
    ).toBeVisible();
});