import { test, expect, BrowserContext } from '@playwright/test';
import cases from '../data/fr10-orderstate.json';
import {
  loginWeb, loginAdmin, placeOrderViaUI, clickAdminOrderAction,
  adminOrderActionButtons, clickWebCancelOrder, webCancelButtonVisible,
  ADMIN_URL,
} from '../support/ui-helpers';

const STATUS_BUTTON: Record<string, string> = {
  confirmed: 'Xác nhận',
  shipping: 'Giao hàng',
  delivered: 'Hoàn thành',
  canceled: 'Hủy',
};

const STATUS_LABEL: Record<string, string> = {
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  canceled: 'Đã hủy',
};

test.describe('FR-10 — Order State Machine (UI only)', () => {
  for (const tc of cases) {
    test(`${tc.id} — ${tc.description}`, async ({ browser }) => {
      // Each test needs its own context(s) (separate user + admin session at
      // once); close them at the end so 15 tests in one file don't
      // accumulate dozens of open contexts and slow the whole run down.
      const contexts: BrowserContext[] = [];
      const openPage = async () => {
        const ctx = await browser.newContext();
        contexts.push(ctx);
        return ctx.newPage();
      };

      try {
        if (tc.kind === 'roleBypassLogin') {
          // The admin panel's OWN client-side role check blocks this login
          // attempt (see App.jsx: `if (user.role !== 'admin') alert(...)`),
          // even though the backend API behind it has no such check at all
          // (BUG-14 — see bug-reports/fr10-orderstate/BUG-14.md). That deeper
          // issue can't be demonstrated through pure UI interaction; this
          // case only verifies the client-side gate itself behaves correctly.
          const page = await openPage();
          let dialogMessage = '';
          page.once('dialog', (d) => { dialogMessage = d.message(); d.accept(); });
          await loginAdmin(page, 'test@eshop.com', 'Test1234!'); // regular user, not admin
          await expect.poll(() => dialogMessage, { timeout: 5_000 }).toBe('Bạn không phải là admin!');
          // Assertion pattern 1 — UI state: dashboard never renders for this login.
          await expect(page.getByText('EShop Admin')).not.toBeVisible();
          return;
        }

        if (tc.kind === 'unauthGate') {
          const page = await openPage();
          await page.goto(`${ADMIN_URL}/`);
          // Assertion pattern 1 — UI state: login form shown, no dashboard leak.
          await expect(page.getByText('Admin Login')).toBeVisible();
          await expect(page.getByText('EShop Admin')).not.toBeVisible();
          return;
        }

        // All remaining cases need one order placed as the regular web user first.
        const userPage = await openPage();
        await loginWeb(userPage, 'test@eshop.com', 'Test1234!');
        const orderId = await placeOrderViaUI(userPage, tc.amount);

        // Advance the order through the admin UI to the required precondition state.
        const adminPage = await openPage();
        await loginAdmin(adminPage, 'admin@eshop.com', 'Admin123!');
        const adminRowLabel = adminPage.locator('tr').filter({ hasText: `#${orderId}` }).locator('span');

        for (const status of tc.preAdvance) {
          await clickAdminOrderAction(adminPage, orderId, STATUS_BUTTON[status]);
          // fetchData() re-renders asynchronously — poll until the label updates
          // instead of racing a single innerText() read against the network call.
          await expect(adminRowLabel).toHaveText(STATUS_LABEL[status], { timeout: 10_000 });
        }

        if (tc.kind === 'adminClick') {
          await clickAdminOrderAction(adminPage, orderId, tc.clickButton);
          // Assert per SPEC (not the buggy actual behavior) so a genuine defect
          // (BUG-06: canceled -> delivered slips through) surfaces as a FAILURE.
          const expected = tc.expectedLabelAfterSpec ?? tc.expectedLabelAfter;
          // Assertion pattern 2 — text/value: status label shown after the click.
          await expect(adminRowLabel).toHaveText(expected, { timeout: 10_000 });
        }

        if (tc.kind === 'userCancel') {
          await clickWebCancelOrder(userPage, orderId);
          // Assert per SPEC so BUG-07 (user cancels a shipping order) fails loudly.
          const expected = tc.expectedLabelAfterSpec ?? tc.expectedLabelAfter;
          const userRowLabel = userPage.locator('tbody tr').filter({ hasText: `#${orderId}` }).locator('td').nth(3);
          // Assertion pattern 2 — text/value: status label on the web Profile page.
          await expect(userRowLabel).toHaveText(expected, { timeout: 10_000 });
        }

        if (tc.kind === 'buttonSet') {
          const buttons = (await adminOrderActionButtons(adminPage, orderId)).map((b) => b.trim());
          // Assertion pattern 3 — value: exact set of visible action buttons.
          expect(buttons.sort()).toEqual([...tc.expectedButtons].sort());
        }

        if (tc.kind === 'noButtons') {
          const buttons = await adminOrderActionButtons(adminPage, orderId);
          // Assertion pattern 3 — value: no action buttons for a final-state order.
          expect(buttons.length).toBe(0);
        }

        if (tc.kind === 'cancelButtonPresence') {
          const visible = await webCancelButtonVisible(userPage, orderId);
          // Assertion pattern 1 — UI state: presence of the cancel button.
          expect(visible).toBe(tc.expectVisible);
        }
      } finally {
        await Promise.all(contexts.map((c) => c.close()));
      }
    });
  }
});

// Assertion pattern: verify state machine transitions via UI button visibility

