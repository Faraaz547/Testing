import { Page, Locator } from '@playwright/test';

export class CartPage {

    private cartItems: Locator;

    constructor(private page: Page) {
        this.cartItems = page.locator('.cart_item');
    }

    async getCartItemCount() {
        return this.cartItems.count();
    }

    async isProductInCart(productName: string) {
        return await this.page
            .locator('.cart_item')
            .filter({ hasText: productName })
            .isVisible();
    }

    async checkout() {
        await this.page
            .getByRole('button', { name: 'Checkout' })
            .click();
    }
}