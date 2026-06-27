const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const API_URL = 'http://localhost:3000';
const ADMIN_URL = 'http://localhost:5174';
const WEB_URL = 'http://localhost:5173';
const DB_PATH = '/Users/tuananhnguyen/Documents/Uni/Testing/HW2/hcmus-sw-testing--eshop-sut/backend/database.sqlite';
const SS = path.join(__dirname, 'screenshots', 'FR10');
if (!fs.existsSync(SS)) fs.mkdirSync(SS, { recursive: true });

function dbQuery(sql) { return execSync(`sqlite3 "${DB_PATH}" "${sql}"`).toString().trim(); }
async function api(method, endpoint, body, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  try { return { status: res.status, body: await res.json() }; } catch { return { status: res.status, body: {} }; }
}

(async () => {
  const adminR = await api('POST', '/api/login', { email: 'admin@eshop.com', password: 'Admin123!' });
  const userR  = await api('POST', '/api/login', { email: 'test@eshop.com',  password: 'Test1234!' });
  const adminToken = adminR.body.token, userToken = userR.body.token;

  dbQuery("UPDATE users SET login_attempts=0, locked_until=NULL");
  dbQuery("DELETE FROM orders");

  const browser = await chromium.launch({ headless: false, slowMo: 400 });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // ── BUG-06: canceled → delivered (API) ──
  console.log('\n── BUG-06: canceled → delivered ──');
  const o1 = (await api('POST', '/api/checkout', { total_amount: 200000, shipping_address: 'BUG-06 Test' }, userToken)).body.orderId;
  await api('PUT', `/api/admin/orders/${o1}/status`, { status: 'canceled' }, adminToken);
  console.log(`   Order ${o1} → canceled`);

  // Capture admin panel showing canceled order
  await page.goto(ADMIN_URL);
  await page.waitForLoadState('networkidle');
  await page.locator('input').nth(0).fill('admin@eshop.com');
  await page.locator('input').nth(1).fill('Admin123!');
  await page.locator('button[type="submit"], button').first().click();
  await page.waitForTimeout(2000);
  await page.locator('text=Đơn hàng').first().click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SS, 'BUG06-01-canceled-order-admin.png'), fullPage: true });

  // Now make the invalid API call and capture response
  const r06 = await api('PUT', `/api/admin/orders/${o1}/status`, { status: 'delivered' }, adminToken);
  console.log(`   canceled→delivered: HTTP ${r06.status} — ${JSON.stringify(r06.body)}`);
  fs.writeFileSync(path.join(SS, 'BUG06-02-api-response.json'), JSON.stringify({
    test: 'BUG-06: canceled → delivered',
    orderId: o1,
    request: 'PUT /api/admin/orders/:id/status { status: "delivered" }',
    expected: 'HTTP 400 Invalid transition',
    actual: `HTTP ${r06.status} — ${JSON.stringify(r06.body)}`
  }, null, 2));
  // Reload admin panel to show status changed to delivered (BUG confirmed)
  await page.reload();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SS, 'BUG06-03-status-now-delivered.png'), fullPage: true });

  // ── BUG-07: User cancel shipping ──
  console.log('\n── BUG-07: User cancel shipping order ──');
  const o2 = (await api('POST', '/api/checkout', { total_amount: 150000, shipping_address: 'BUG-07 Test' }, userToken)).body.orderId;
  await api('PUT', `/api/admin/orders/${o2}/status`, { status: 'confirmed' }, adminToken);
  await api('PUT', `/api/admin/orders/${o2}/status`, { status: 'shipping' }, adminToken);
  console.log(`   Order ${o2} → shipping`);

  // Show web UI for user — login
  await page.goto(`${WEB_URL}/login`);
  await page.waitForLoadState('networkidle');
  await page.locator('input').nth(0).fill('test@eshop.com');
  await page.locator('input').nth(1).fill('Test1234!');
  await page.locator('button[type="submit"], button:has-text("Đăng nhập"), button:has-text("Login")').first().click();
  await page.waitForTimeout(2000);

  // Navigate to profile/orders page
  const profileLink = page.locator('a[href*="profile"], a:has-text("Hồ sơ")').first();
  if (await profileLink.count() > 0) await profileLink.click();
  else await page.goto(`${WEB_URL}/profile`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS, 'BUG07-01-shipping-order-web.png'), fullPage: true });

  // API: User directly cancels shipping order (backend bug)
  const r07 = await api('PUT', `/api/orders/${o2}/cancel`, {}, userToken);
  const statusAfter07 = dbQuery(`SELECT status FROM orders WHERE id=${o2}`);
  console.log(`   User cancel shipping: HTTP ${r07.status} — DB after: ${statusAfter07}`);
  fs.writeFileSync(path.join(SS, 'BUG07-02-api-response.json'), JSON.stringify({
    test: 'BUG-07: User cancel shipping order',
    orderId: o2,
    request: `PUT /api/orders/${o2}/cancel (with USER token)`,
    expected: 'HTTP 400 "Cannot cancel shipped order"',
    actual: `HTTP ${r07.status} — DB status now: ${statusAfter07}`
  }, null, 2));
  await page.reload();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SS, 'BUG07-03-after-cancel.png'), fullPage: true });

  // ── BUG-14: User token → Admin endpoint ──
  console.log('\n── BUG-14: Role check bypass ──');
  // Show user is logged in on web
  await page.goto(WEB_URL);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SS, 'BUG14-01-regular-user-web.png') });

  // API calls with user token to admin endpoints
  const r14a = await api('GET', '/api/admin/orders', null, userToken);
  const r14b = await api('GET', '/api/admin/users', null, userToken);
  const r14c_orderId = (await api('POST', '/api/checkout', { total_amount: 99000, shipping_address: 'Test Role' }, userToken)).body.orderId;
  const r14c = await api('PUT', `/api/admin/orders/${r14c_orderId}/status`, { status: 'confirmed' }, userToken);

  fs.writeFileSync(path.join(SS, 'BUG14-02-role-bypass-results.json'), JSON.stringify({
    test: 'BUG-14: Missing role check',
    tests: [
      { endpoint: 'GET /api/admin/orders (USER token)', expected: 'HTTP 403', actual: `HTTP ${r14a.status}`, orders_returned: Array.isArray(r14a.body) ? r14a.body.length : 'N/A' },
      { endpoint: 'GET /api/admin/users (USER token)', expected: 'HTTP 403', actual: `HTTP ${r14b.status}`, users_returned: Array.isArray(r14b.body) ? r14b.body.length : 'N/A' },
      { endpoint: `PUT /api/admin/orders/${r14c_orderId}/status (USER token)`, expected: 'HTTP 403', actual: `HTTP ${r14c.status}`, message: r14c.body.message || r14c.body.error }
    ]
  }, null, 2));

  // ── FR-10 Normal Flow Screenshots (for report) ──
  console.log('\n── FR-10 Normal State Transitions ──');
  dbQuery("DELETE FROM orders");
  const oFlow = (await api('POST', '/api/checkout', { total_amount: 250000, shipping_address: 'Flow Test Address' }, userToken)).body.orderId;

  // Admin panel - show state transitions
  await page.goto(ADMIN_URL);
  await page.waitForLoadState('networkidle');
  // Already logged in (session may persist), navigate to orders
  await page.locator('text=Đơn hàng').first().click().catch(async () => {
    // Need to login again
    if (await page.locator('input').count() > 0) {
      await page.locator('input').nth(0).fill('admin@eshop.com');
      await page.locator('input').nth(1).fill('Admin123!');
      await page.locator('button').first().click();
      await page.waitForTimeout(2000);
      await page.locator('text=Đơn hàng').first().click();
    }
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SS, 'FR10-01-pending-order.png'), fullPage: true });

  // Confirm
  const confirmBtn = page.locator('button:has-text("Xác nhận")').first();
  if (await confirmBtn.count() > 0) {
    await confirmBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'FR10-02-confirmed.png'), fullPage: true });
  }
  // Ship
  const shipBtn = page.locator('button:has-text("Giao hàng")').first();
  if (await shipBtn.count() > 0) {
    await shipBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'FR10-03-shipping.png'), fullPage: true });
  }
  // Deliver
  const doneBtn = page.locator('button:has-text("Hoàn thành")').first();
  if (await doneBtn.count() > 0) {
    await doneBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'FR10-04-delivered.png'), fullPage: true });
  }

  // Delivered order — no more action buttons
  const pageText = await page.textContent('body');
  console.log(`   Delivered state: has confirm btn: ${pageText.includes('Xác nhận')}, has ship: ${pageText.includes('Giao hàng')}`);
  await page.screenshot({ path: path.join(SS, 'FR10-05-delivered-final-state.png'), fullPage: true });

  await browser.close();
  console.log('\n✅ FR-10 screenshots saved to:', SS);
})().catch(err => { console.error('Error:', err.message); process.exit(1); });
