import { test, expect } from '@playwright/test';
import registerCases from '../data/register.json';

function resolveEmail(template: string): string {
  return template.replace('{{ts}}', `${Date.now()}${Math.floor(Math.random() * 1000)}`);
}

test.describe('FR-01 smoke — Account registration', () => {
  for (const tc of registerCases) {
    test(`${tc.id} — ${tc.description}`, async ({ page }) => {
      const email = resolveEmail(tc.input.email);

      await page.goto('/register');

      // SUT has no id/data-testid on these inputs, only positional <input> tags
      // inside the form — nth(0)=name, nth(1)=email, password has its own type.
      const textInputs = page.locator('form input[type="text"]');
      await textInputs.nth(0).fill(tc.input.name);
      await textInputs.nth(1).fill(email);
      await page.locator('form input[type="password"]').fill(tc.input.password);

      if (tc.expected.clientBlocked) {
        await page.getByRole('button', { name: 'Đăng Ký' }).click();

        // Assertion pattern 1 — text/value: client-side validation message.
        await expect(page.locator('.bg-red-100')).toContainText(tc.expected.errorText);
        // Assertion pattern 2 — UI navigation state: no request was sent, still on /register.
        await expect(page).toHaveURL(/\/register/);
        return;
      }

      const responsePromise = page.waitForResponse((res) => res.url().includes('/api/register'));
      await page.getByRole('button', { name: 'Đăng Ký' }).click();
      const response = await responsePromise;

      if (tc.expected.httpStatus) {
        // Assertion pattern 3 — API/network: response status from the backend.
        expect(response.status()).toBe(tc.expected.httpStatus);
        // Assertion pattern 2 — UI navigation state: redirected after success.
        await expect(page).toHaveURL(new RegExp(tc.expected.redirectTo));
      }

      if (tc.expected.httpStatusNot) {
        expect(response.status()).not.toBe(tc.expected.httpStatusNot);
        // Assertion pattern 1 — UI state: error banner shown, stayed on the page.
        await expect(page.locator('.bg-red-100')).toBeVisible();
      }
    });
  }
});
