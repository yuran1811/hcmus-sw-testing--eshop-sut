import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';
import cases from '../data/fr02-login.json';

const DB_PATH = path.join(__dirname, '../../../backend/database.sqlite');

// Precondition helpers — arrange account state directly in the DB (fixture
// setup, not calling the SUT's own API/UI) so setup is deterministic even
// while the account is currently locked. The actual test ACTION under
// verification always goes through the real login form below.
function resetAccountDb() {
  execSync(
    `sqlite3 "${DB_PATH}" "UPDATE users SET login_attempts=0, locked_until=NULL WHERE email='test@eshop.com';"`
  );
}

function lockAccountDb() {
  // Must match the app's own ISO-8601 format (toISOString()) — sqlite's built-in
  // datetime('now', ...) emits "YYYY-MM-DD HH:MM:SS" with no 'T'/'Z', which
  // Node's Date parser reads as LOCAL time instead of UTC and silently
  // miscomputes the lock check.
  const lockedUntil = new Date(Date.now() + 60_000).toISOString();
  execSync(
    `sqlite3 "${DB_PATH}" "UPDATE users SET login_attempts=3, locked_until='${lockedUntil}' WHERE email='test@eshop.com';"`
  );
}

async function fillLoginForm(page, email: string, password: string) {
  const inputs = page.locator('form input[type="text"]');
  await inputs.nth(0).fill(email);
  await inputs.nth(1).fill(password);
}

/** One real submit through the login form; returns the backend response. */
async function submitLogin(page, email: string, password: string) {
  await fillLoginForm(page, email, password);
  const responsePromise = page.waitForResponse((res) => res.url().includes('/api/login'));
  await page.getByRole('button', { name: 'Sign In' }).click();
  return responsePromise;
}

test.describe('FR-02 — Login and Account Lockout', () => {
  for (const tc of cases) {
    test(`${tc.id} — ${tc.description}`, async ({ page }) => {
      if (tc.resetFirst) resetAccountDb();
      if (tc.lockFirst) lockAccountDb();

      await page.goto('/login');

      if (tc.oneFailedAttemptFirst) {
        // FR02-TC03 precondition: exactly one prior wrong-password submit,
        // through the real form — not a direct API call.
        const setupResponse = await submitLogin(page, 'test@eshop.com', 'WrongPass');
        expect(setupResponse.status()).toBe(401);
        await page.goto('/login');
      }

      if (tc.clientBlockedRequired) {
        // FR02-TC10/TC11: empty required field — the browser's own HTML5
        // validation should block submission before any request is sent.
        await fillLoginForm(page, tc.input.email, tc.input.password);
        await page.getByRole('button', { name: 'Sign In' }).click();

        const inputs = page.locator('form input[type="text"]');
        const blockedInput = inputs.nth(tc.expected.blockedFieldIndex);
        // Assertion pattern 1 — value/state: the empty field reports itself invalid.
        expect(await blockedInput.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false);
        // Assertion pattern 2 — UI navigation state: no submission happened, still on /login.
        await expect(page).toHaveURL(/\/login$/);
        return;
      }

      if (tc.threeFailsViaUI) {
        // FR02-TC07: 3 consecutive wrong-password submits through the real UI.
        for (let attempt = 1; attempt <= 3; attempt++) {
          const response = await submitLogin(page, tc.input.email, tc.input.password);
          // Assertion pattern 1 — API/network: every attempt is rejected.
          expect(response.status()).toBe(401);
          if (attempt < 3) await page.goto('/login');
        }
        // Assertion pattern 2 — API/network (state check): a 4th attempt with the
        // CORRECT password, through the real form, must now be rejected with 403,
        // proving the account locked.
        await page.goto('/login');
        const afterLock = await submitLogin(page, tc.input.email, 'Test1234!');
        expect(afterLock.status()).toBe(403);
        return;
      }

      const response = await submitLogin(page, tc.input.email, tc.input.password);

      // Assertion pattern 1 — API/network: response status from the backend.
      expect(response.status()).toBe(tc.expected.apiStatus);

      if (tc.expected.uiOutcome === 'home') {
        // Assertion pattern 2 — UI navigation state.
        await expect(page).toHaveURL(/\/$/);
      } else if (tc.expected.uiOutcome === 'errorShown') {
        // Assertion pattern 3 — text/value: generic error banner text.
        // Note: Login.jsx always shows the SAME generic message regardless of the
        // real backend error (e.g. lockout's specific message never reaches the UI),
        // so this only proves an error was surfaced, not which one — the precise
        // reason is verified separately via the API status assertion above.
        await expect(page.locator('.bg-red-100')).toContainText('Đăng nhập thất bại');
      }

      if (tc.expected.attemptsResetTo !== undefined) {
        // Confirm attempts were reset by driving one more real wrong-password
        // submit through the form: under spec (+1/fail) it must NOT be locked.
        await page.goto('/login');
        const followUpFail = await submitLogin(page, tc.input.email, 'WrongPass');
        expect(followUpFail.status()).toBe(401);
      }
    });
  }
});

// Performance note: login lockout state persists across browser contexts

