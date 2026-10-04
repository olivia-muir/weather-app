import { test, expect } from '@playwright/test';

test('weather API response is ok', async ({ request }) => {
    const response = await request.get('/api/weather');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toEqual({
        temperature: expect.any(Number),
        windSpeed: expect.any(Number),
        weatherCode: expect.any(Number),
    });
});
