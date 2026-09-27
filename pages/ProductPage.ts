import { Page, Locator } from '@playwright/test';

export class ProductsPage {

    private productItems: Locator;
    private cartLink: Locator;

    constructor(private page: Page) {

        this.productItems = page.locator('.inventory_item');
        this.cartLink = page.locator('.shopping_cart_link');
    }

    async getProductCount() {
        return await this.productItems.count();
    }

    async addProductToCart(productName: string) {

        const product = this.page
            .locator('.inventory_item')
            .filter({ hasText: productName });

        await product
            .getByRole('button', { name: /Add to cart/i })
            .click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}