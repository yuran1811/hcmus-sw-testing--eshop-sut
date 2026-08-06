import { Page, expect } from '@playwright/test';

export const WEB_URL = process.env.WEB_URL || 'http://localhost:5173';
export const ADMIN_URL = process.env.ADMIN_URL || 'http://localhost:5174';

/** Logs into the web storefront through the real login form. */
export async function loginWeb(page: Page, email: string, password: string) {
  await page.goto(`${WEB_URL}/login`);
  const inputs = page.locator('form input[type="text"]');
  await inputs.nth(0).fill(email);
  await inputs.nth(1).fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}

/** Logs into the admin panel through the real login form. */
export async function loginAdmin(page: Page, email: string, password: string) {
  await page.goto(`${ADMIN_URL}/`);
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

/**
 * Places one order through the real storefront UI: Home -> add first
 * product to cart -> Cart -> Checkout -> edit total -> confirm payment.
 * Returns the new order's id (read back from "Lịch sử đơn hàng" on Profile).
 */
export async function placeOrderViaUI(page: Page, totalAmount: number): Promise<string> {
  // Cart state lives only in React memory (not persisted) — navigate with
  // client-side <Link> clicks throughout, never page.goto(), or it resets.
  await page.getByRole('link', { name: 'EShop' }).click();
  await page.getByRole('button', { name: 'Thêm vào giỏ' }).first().click();
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  await page.getByRole('button', { name: 'Tiến hành thanh toán' }).click();
  // The amount label isn't wired to the input via for/id, so target by type.
  await page.locator('input[type="number"]').fill(String(totalAmount));
  await page.getByRole('button', { name: 'Xác Nhận Thanh Toán' }).click();
  await expect(page.getByText('Thanh toán thành công!')).toBeVisible();

  await page.goto(`${WEB_URL}/profile`);
  const row = page.locator('tbody tr').filter({ hasText: `${totalAmount.toLocaleString('en-US')} ₫` }).first();
  await row.waitFor();
  const idText = await row.locator('td').first().innerText(); // "#12"
  return idText.replace('#', '').trim();
}

/**
 * Clicks the named action button for a given order row on the Admin Orders
 * tab and waits for the resulting status-update call to finish, so the
 * label read right after reflects the settled state — not a stale one
 * caught mid-request (which would make an "expect unchanged" assertion
 * pass trivially before the click's effect even lands).
 */
export async function clickAdminOrderAction(page: Page, orderId: string, buttonText: string) {
  // The admin order list is fetched once at login/reload, not polled — reload
  // so orders created by other pages/contexts after that are visible here.
  await page.reload();
  await page.getByRole('list').getByText('Đơn hàng', { exact: true }).click();
  const row = page.locator('tr').filter({ hasText: `#${orderId}` });
  await row.waitFor();
  // updateOrderStatus() does `await axios.put(...); fetchData();` — the
  // refetch is NOT awaited, so waiting only for the PUT response still races
  // the GET that actually repopulates `orders` state. Wait for both.
  const putPromise = page.waitForResponse((res) => res.url().includes(`/admin/orders/${orderId}/status`));
  await row.getByRole('button', { name: buttonText }).click();
  await putPromise;
  await page.waitForResponse((res) => res.url().includes('/admin/orders') && res.request().method() === 'GET');
}

/** Returns the set of action-button labels currently visible for an order row (Admin). */
export async function adminOrderActionButtons(page: Page, orderId: string): Promise<string[]> {
  await page.reload();
  await page.getByRole('list').getByText('Đơn hàng', { exact: true }).click();
  const row = page.locator('tr').filter({ hasText: `#${orderId}` });
  await row.waitFor();
  // allInnerTexts() snapshots immediately (no auto-retry). The row matching
  // doesn't guarantee its action-button <td> is done rendering on the same
  // tick — this showed up as occasional flakiness across a full 3-browser
  // run. A fixed wait here is a known imperfection (see review notes in the
  // main report); a fully condition-based version would need a signal
  // that's specific to "this row's actions finished rendering".
  await page.waitForTimeout(250);
  return row.getByRole('button').allInnerTexts();
}

/** Clicks "Hủy đơn" for a given order on the web Profile page (user self-cancel). */
export async function clickWebCancelOrder(page: Page, orderId: string) {
  await page.goto(`${WEB_URL}/profile`);
  const row = page.locator('tbody tr').filter({ hasText: `#${orderId}` });
  await row.waitFor();
  page.once('dialog', (d) => d.accept());
  const refetchPromise = page.waitForResponse((res) => res.url().includes('/orders/my-orders'));
  await row.getByRole('button', { name: 'Hủy đơn' }).click();
  // cancelOrder() PUTs the cancel, alerts, then re-fetches the order list —
  // wait for that re-fetch so the row we read next reflects the settled state.
  await refetchPromise;
}

/** True if a "Hủy đơn" button is present for the order on the web Profile page. */
export async function webCancelButtonVisible(page: Page, orderId: string): Promise<boolean> {
  await page.goto(`${WEB_URL}/profile`);
  const row = page.locator('tbody tr').filter({ hasText: `#${orderId}` });
  await row.waitFor();
  // Same one-shot-read-after-render race as adminOrderActionButtons() above.
  await page.waitForTimeout(250);
  return (await row.getByRole('button', { name: 'Hủy đơn' }).count()) > 0;
}

/** Reads the status label text shown for an order row on the web Profile page. */
export async function webOrderStatusLabel(page: Page, orderId: string): Promise<string> {
  await page.goto(`${WEB_URL}/profile`);
  const row = page.locator('tbody tr').filter({ hasText: `#${orderId}` });
  await row.waitFor();
  return (await row.locator('td').nth(3).innerText()).trim();
}

/** Reads "Tổng doanh thu (Delivered)" from the Admin Dashboard tab. */
/**
 * Both dashboard readers below are meant to be called right after
 * page.reload(); reload() waits for the load event, not for the
 * useEffect-triggered GET /api/admin/orders that actually populates the
 * numbers — so wait for that response first, or the first read can catch
 * pre-refresh figures.
 */
async function waitForOrdersRefetch(page: Page) {
  await page
    .waitForResponse((res) => res.url().includes('/admin/orders') && res.request().method() === 'GET', { timeout: 5_000 })
    .catch(() => {}); // already resolved before we started listening — fine.
}

export async function readDashboardRevenue(page: Page): Promise<number> {
  await waitForOrdersRefetch(page);
  await page.getByRole('list').getByText('Dashboard', { exact: true }).click();
  const text = await page.locator('p.text-green-600').innerText();
  return parseInt(text.replace(/[^\d]/g, ''), 10);
}

/** Reads "Tổng số đơn hàng" from the Admin Dashboard tab. */
export async function readDashboardOrderCount(page: Page): Promise<number> {
  await waitForOrdersRefetch(page);
  await page.getByRole('list').getByText('Dashboard', { exact: true }).click();
  const text = await page.locator('div.grid > div').nth(1).locator('p').innerText();
  return parseInt(text.replace(/[^\d]/g, ''), 10);
}
