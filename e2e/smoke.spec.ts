import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'What\'s the weather?', level: 1 })).toBeVisible();
});