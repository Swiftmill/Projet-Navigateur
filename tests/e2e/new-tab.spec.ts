import { test, expect } from '@playwright/test';

test('new tab shows hero text', async ({ page }) => {
  await page.goto('http://localhost:5173/#/new-tab');
  await expect(page.locator('text=Bienvenue dans HyperGX')).toBeVisible();
});
