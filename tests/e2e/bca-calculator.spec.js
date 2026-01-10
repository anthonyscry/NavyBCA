/**
 * BCA Calculator E2E Tests
 *
 * Tests the complete BCA calculation workflow from a user perspective
 */
const { test, expect } = require('@playwright/test');

test.describe('BCA Calculator', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html');
        // Wait for BCA tables to load
        await page.waitForSelector('.calculate-btn:not([disabled])');
    });

    test('should display calculator form', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Navy BCA Calculator');
        await expect(page.locator('.gender-btn[data-gender="male"]')).toBeVisible();
        await expect(page.locator('.gender-btn[data-gender="female"]')).toBeVisible();
        await expect(page.locator('#weight')).toBeVisible();
        await expect(page.locator('#waist')).toBeVisible();
    });

    test('should calculate passing BCA for fit male', async ({ page }) => {
        // Set inputs for a passing scenario
        await page.click('.gender-btn[data-gender="male"]');
        await page.selectOption('#heightFeet', '5');
        await page.selectOption('#heightInches', '10');
        await page.fill('#weight', '175');
        await page.fill('#waist', '32');

        // Calculate
        await page.click('.calculate-btn');

        // Check results
        await expect(page.locator('#statusText')).toContainText('WITHIN STANDARDS');
        await expect(page.locator('#step1Status')).toContainText('PASS');
    });

    test('should calculate failing BCA for overweight scenario', async ({ page }) => {
        // Set inputs for a failing scenario
        await page.click('.gender-btn[data-gender="male"]');
        await page.selectOption('#heightFeet', '5');
        await page.selectOption('#heightInches', '8');
        await page.fill('#weight', '250');
        await page.fill('#waist', '45');

        // Calculate
        await page.click('.calculate-btn');

        // Check results
        await expect(page.locator('#statusText')).toContainText('NOT WITHIN STANDARDS');
        await expect(page.locator('#warningBox')).toBeVisible();
        await expect(page.locator('#goalSection')).toBeVisible();
    });

    test('should switch between male and female', async ({ page }) => {
        // Click female
        await page.click('.gender-btn[data-gender="female"]');
        await expect(page.locator('#maxBfDisplay')).toContainText('36%');
        await expect(page.locator('#genderDisplay')).toContainText('females');

        // Click male
        await page.click('.gender-btn[data-gender="male"]');
        await expect(page.locator('#maxBfDisplay')).toContainText('26%');
        await expect(page.locator('#genderDisplay')).toContainText('males');
    });

    test('should display correct body fat for female', async ({ page }) => {
        await page.click('.gender-btn[data-gender="female"]');
        await page.selectOption('#heightFeet', '5');
        await page.selectOption('#heightInches', '4');
        await page.fill('#weight', '130');
        await page.fill('#waist', '28');

        await page.click('.calculate-btn');

        await expect(page.locator('#maxBfValue')).toContainText('36%');
        await expect(page.locator('#statusText')).toContainText('WITHIN STANDARDS');
    });

    test('should show metrics grid after calculation', async ({ page }) => {
        await page.fill('#weight', '180');
        await page.fill('#waist', '34');
        await page.click('.calculate-btn');

        await expect(page.locator('#resultHeight')).toBeVisible();
        await expect(page.locator('#resultWeight')).toContainText('180');
        await expect(page.locator('#resultWaist')).toContainText('34');
    });

    test('should reset calculator', async ({ page }) => {
        // Calculate first
        await page.fill('#weight', '180');
        await page.fill('#waist', '34');
        await page.click('.calculate-btn');

        // Reset
        await page.click('.reset-btn');

        // Check form is reset
        await expect(page.locator('#resultsSection')).not.toHaveClass(/show/);
    });

    test('should persist data with remember toggle', async ({ page }) => {
        // Enable remember
        await page.click('#rememberBcaToggle');

        // Fill form
        await page.fill('#weight', '185');
        await page.fill('#waist', '35');

        // Reload page
        await page.reload();
        await page.waitForSelector('.calculate-btn:not([disabled])');

        // Check data persisted
        await expect(page.locator('#weight')).toHaveValue('185');
        await expect(page.locator('#waist')).toHaveValue('35');
    });

    test('should show goal paths when failing', async ({ page }) => {
        // Set failing inputs
        await page.click('.gender-btn[data-gender="male"]');
        await page.fill('#weight', '220');
        await page.fill('#waist', '42');

        await page.click('.calculate-btn');

        // Check goal section appears
        await expect(page.locator('#goalSection')).toBeVisible();
        await expect(page.locator('.goal-path-card')).toHaveCount(3);
        await expect(page.locator('.goal-path-badge')).toContainText('Easiest');
    });

    test('should scroll to results after calculation', async ({ page }) => {
        await page.fill('#weight', '180');
        await page.fill('#waist', '34');
        await page.click('.calculate-btn');

        // Results section should be visible
        await expect(page.locator('#resultsSection')).toBeVisible();
    });

    test('should have working export buttons', async ({ page }) => {
        await page.fill('#weight', '180');
        await page.fill('#waist', '34');
        await page.click('.calculate-btn');

        // Export section should be visible
        await expect(page.locator('.export-section')).toBeVisible();
        await expect(page.locator('button:has-text("Export to CSV")')).toBeVisible();
        await expect(page.locator('button:has-text("Print")')).toBeVisible();
    });
});

test.describe('BCA Calculator Edge Cases', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html');
        await page.waitForSelector('.calculate-btn:not([disabled])');
    });

    test('should handle minimum height', async ({ page }) => {
        await page.selectOption('#heightFeet', '4');
        await page.selectOption('#heightInches', '0');
        await page.fill('#weight', '100');
        await page.fill('#waist', '24');

        await page.click('.calculate-btn');

        await expect(page.locator('#resultHeight')).toContainText('48');
    });

    test('should handle maximum height', async ({ page }) => {
        await page.selectOption('#heightFeet', '7');
        await page.selectOption('#heightInches', '0');
        await page.fill('#weight', '280');
        await page.fill('#waist', '40');

        await page.click('.calculate-btn');

        await expect(page.locator('#resultHeight')).toContainText('84');
    });

    test('should validate weight input bounds', async ({ page }) => {
        // Weight input has min/max validation
        const weightInput = page.locator('#weight');
        await expect(weightInput).toHaveAttribute('min', '61');
        await expect(weightInput).toHaveAttribute('max', '400');
    });

    test('should validate waist input bounds', async ({ page }) => {
        const waistInput = page.locator('#waist');
        await expect(waistInput).toHaveAttribute('min', '20');
        await expect(waistInput).toHaveAttribute('max', '60');
    });
});

test.describe('BCA Calculator Navigation', () => {

    test('should have working navigation links', async ({ page }) => {
        await page.goto('/index.html');

        await expect(page.locator('a[href="generator.html"]')).toBeVisible();
        await expect(page.locator('a[href="exercises.html"]')).toBeVisible();
        await expect(page.locator('a[href="watchbill.html"]')).toBeVisible();
    });

    test('should navigate to PT Generator', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('a[href="generator.html"]');
        await expect(page).toHaveURL(/generator\.html/);
    });
});

test.describe('BCA Calculator Accessibility', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html');
    });

    test('should have proper ARIA labels', async ({ page }) => {
        await expect(page.locator('.gender-btn[data-gender="male"]')).toHaveAttribute('aria-label');
        await expect(page.locator('.calculate-btn')).toHaveAttribute('aria-label');
    });

    test('should have proper form labels', async ({ page }) => {
        await expect(page.locator('label[for="weight"]')).toBeVisible();
        await expect(page.locator('label[for="waist"]')).toBeVisible();
    });

    test('should update ARIA pressed state on gender toggle', async ({ page }) => {
        await expect(page.locator('.gender-btn[data-gender="male"]')).toHaveAttribute('aria-pressed', 'true');
        await expect(page.locator('.gender-btn[data-gender="female"]')).toHaveAttribute('aria-pressed', 'false');

        await page.click('.gender-btn[data-gender="female"]');

        await expect(page.locator('.gender-btn[data-gender="male"]')).toHaveAttribute('aria-pressed', 'false');
        await expect(page.locator('.gender-btn[data-gender="female"]')).toHaveAttribute('aria-pressed', 'true');
    });
});
