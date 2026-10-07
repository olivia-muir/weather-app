import { test, expect } from '@playwright/test';
import { sunnyWeather } from './fixtures/weather';

test('shows loading message until weather is loaded', async ({ page }) => {
    const { promise: gate, resolve: openGate } = Promise.withResolvers<void>();
    await page.route('**/api/weather*', async route => {
        await gate;
        await route.fulfill({ json: sunnyWeather });
    });
    await page.goto('/');
    await expect(page.getByRole('status')).toBeVisible();
    openGate();
    await expect(page.getByText('Temperature: 72°F')).toBeVisible();
    await expect(page.getByRole('status')).toBeHidden();
});


test('shows current weather', async ({ page }) => {
    await page.route('**/api/weather*', async route => {
        await route.fulfill({ json: sunnyWeather });
    });
    await page.goto('/');

    await expect(page.getByText('Temperature: 72°F')).toBeVisible();
    await expect(page.getByText('Wind speed: 8 mph')).toBeVisible();

});

test('shows an error message when weather API fails', async ({ page }) => {
    await page.route('**/api/weather*', async route => {
        await route.fulfill({ status: 500 });
    });
    await page.goto('/');

    await expect(page.getByRole('alert').filter({ hasText: 'Weather is unavailable right now.' })).toBeVisible();
});