import { test, expect } from '@playwright/test';

// Not mocked test - tests real API
test('weather API response is ok', async ({ request }) => {
    const response = await request.get('/api/weather?latitude=44.058174&longitude=-121.315308');
    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    expect(body).toEqual({
        temperature: expect.any(Number),
        windSpeed: expect.any(Number),
        weatherCode: expect.any(Number),
    });
});
