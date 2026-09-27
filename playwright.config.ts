import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

    testDir: './tests',

    fullyParallel: true,

    retries: process.env.CI ? 2 : 0,

    reporter: 'html',

    use: {
        baseURL: 'https://www.saucedemo.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },

    projects: [

        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari']
            }
        },
        {
        name: 'mobile-chrome',
        use: { ...devices['Pixel 5'] },
    },
    ]
});