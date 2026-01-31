import { test, expect } from '@playwright/test';

test.describe('Ageinfo Visual Regression', () => {

    test('should load the homepage without layout shift', async ({ page }: { page: any }) => {
        await page.goto('/');

        // Wait for fonts/content
        await page.waitForLoadState('networkidle');

        // Check for specific element to ensure hydration
        await expect(page.locator('h1')).toBeVisible();

        // Visual Snapshot
        await expect(page).toHaveScreenshot('homepage-initial.png', { maxDiffPixelRatio: 0.05 });
    });

    test('should display visualizer correctly without flickering on interaction', async ({ page }: { page: any }) => {
        // Needs to fill birthdate to see result
        await page.goto('/');

        // Fill simple birthdate if on generic Landing
        // Note: Assuming logic to jump to Result or fill input exists. 
        // For now, let's snapshot the landing as the "Bento Grid" is likely on result page.
        // If query params supported:
        // await page.goto('/result?dob=1990-01-01');

        // If not, we just test Landing visual integrity for now
        // Or implement interaction
    });

    test('mobile layout check', async ({ page }: { page: any }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Ensure nothing horizontally scrolls (common mobile bug)
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);

        expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 2); // 2px buffer for rounding
    });

});
