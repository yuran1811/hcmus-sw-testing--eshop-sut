import { test, expect, BrowserContext } from '@playwright/test';
import cases from '../data/fr18-ordermanagement.json';
import {
  loginWeb, loginAdmin, placeOrderViaUI, clickAdminOrderAction,
  adminOrderActionButtons, readDashboardRevenue, readDashboardOrderCount,
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

test.describe('FR-18 — Admin Order Management (UI only)', () => {
  for (const tc of cases) {
    test(`${tc.id} — ${tc.description}`, async ({ browser }) => {
      // Close every context opened by this test so a 12-test run doesn't
      // accumulate dozens of open browser contexts (was causing timeouts).
      const contexts: BrowserContext[] = [];
      const openPage = async () => {
        const ctx = await browser.newContext();
        contexts.push(ctx);
        return ctx.newPage();
      };

      try {
        if (tc.kind === 'roleBypassLogin') {
          // Same client-side gate as FR10-TC14 — see that test / BUG-14.md for
          // why the deeper backend issue can't be shown through pure UI interaction.
          const page = await openPage();
          let dialogMessage = '';
          page.once('dialog', (d) => { dialogMessage = d.message(); d.accept(); });
          await loginAdmin(page, 'test@eshop.com', 'Test1234!');
          await expect.poll(() => dialogMessage, { timeout: 5_000 }).toBe('Bạn không phải là admin!');
          // Assertion pattern 1 — UI state: Orders tab never becomes reachable.
          await expect(page.getByRole('list').getByText('Đơn hàng', { exact: true })).not.toBeVisible();
          return;
        }

        if (tc.kind === 'unauthGate') {
          const page = await openPage();
          await page.goto(`${ADMIN_URL}/`);
          // Assertion pattern 1 — UI state: only the login form is reachable.
          await expect(page.getByText('Admin Login')).toBeVisible();
          await expect(page.getByRole('list').getByText('Đơn hàng', { exact: true })).not.toBeVisible();
          return;
        }

        const userPage = await openPage();
        await loginWeb(userPage, 'test@eshop.com', 'Test1234!');

        const adminPage = await openPage();
        await loginAdmin(adminPage, 'admin@eshop.com', 'Admin123!');

        if (tc.kind === 'listShowsOrder') {
          const orderId = await placeOrderViaUI(userPage, tc.amount);
          await adminPage.reload();
          await adminPage.getByRole('list').getByText('Đơn hàng', { exact: true }).click();
          const row = adminPage.locator('tr').filter({ hasText: `#${orderId}` });
          // Assertion pattern 1 — UI state: the new order's row is visible.
          await expect(row).toBeVisible();
          // Assertion pattern 2 — value: correct user name and amount joined in.
          await expect(row).toContainText('Test User');
          await expect(row).toContainText(tc.amount.toLocaleString('en-US'));
          return;
        }

        const needsSharedOrder = ['adminClick', 'buttonSet', 'noButtons'].includes(tc.kind);
        const orderId = needsSharedOrder ? await placeOrderViaUI(userPage, tc.amount) : undefined;

        if (orderId) {
          for (const status of tc.preAdvance ?? []) {
            const label = adminPage.locator('tr').filter({ hasText: `#${orderId}` }).locator('span');
            await clickAdminOrderAction(adminPage, orderId, STATUS_BUTTON[status]);
            await expect(label).toHaveText(STATUS_LABEL[status], { timeout: 10_000 });
          }
        }

        if (tc.kind === 'adminClick') {
          const label = adminPage.locator('tr').filter({ hasText: `#${orderId}` }).locator('span');
          await clickAdminOrderAction(adminPage, orderId!, tc.clickButton);
          // Assertion pattern 2 — text/value: status label shown after the click.
          await expect(label).toHaveText(tc.expectedLabelAfter, { timeout: 10_000 });
        }

        if (tc.kind === 'buttonSet') {
          const buttons = (await adminOrderActionButtons(adminPage, orderId!)).map((b) => b.trim());
          // Assertion pattern 3 — value: exact set of visible action buttons.
          expect(buttons.sort()).toEqual([...tc.expectedButtons].sort());
        }

        if (tc.kind === 'noButtons') {
          const buttons = await adminOrderActionButtons(adminPage, orderId!);
          expect(buttons.length).toBe(0);
        }

        if (tc.kind === 'orderCountDelta') {
          const before = await readDashboardOrderCount(adminPage);
          await placeOrderViaUI(userPage, tc.amount + 1); // +1 to keep it distinct from orderId's own amount
          await adminPage.reload();
          const after = await readDashboardOrderCount(adminPage);
          // Assertion pattern 2 — value: order count increases by exactly one.
          expect(after - before).toBe(tc.expectedCountDelta);
        }

        if (tc.kind === 'revenueDelta') {
          const before = await readDashboardRevenue(adminPage);

          if (tc.extraPendingAmount > 0) {
            await placeOrderViaUI(userPage, tc.extraPendingAmount); // left pending on purpose
          }
          if (tc.amount > 0 && tc.deliver) {
            const id = await placeOrderViaUI(userPage, tc.amount);
            for (const status of ['confirmed', 'shipping', 'delivered']) {
              await clickAdminOrderAction(adminPage, id, STATUS_BUTTON[status]);
            }
          }

          await adminPage.reload();
          const after = await readDashboardRevenue(adminPage);
          // Assertion pattern 2 — value: change in on-screen revenue vs. the true delta.
          expect(after - before).toBe(tc.expectedRevenueDelta);
        }
      } finally {
        await Promise.all(contexts.map((c) => c.close()));
      }
    });
  }
});

// Delta-based assertions account for shared database state across concurrent tests

