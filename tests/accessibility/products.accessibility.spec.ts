import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';

test('products page accessibility check', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );

    const results = await new AxeBuilder({ page }).analyze();

    console.log(
        `Accessibility violations found: ${results.violations.length}`
    );

    for (const violation of results.violations) {
        console.log(
            `[${violation.impact}] ${violation.id}: ${violation.help}`
        );
    }

    const seriousViolations = results.violations.filter(
        violation =>
            violation.impact === 'critical' ||
            violation.impact === 'serious'
    );

    expect(seriousViolations).toEqual([]);
});
