const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const API_URL  = 'http://localhost:3000';
const ADMIN_URL = 'http://localhost:5174';
const WEB_URL   = 'http://localhost:5173';
const DB_PATH = '/Users/tuananhnguyen/Documents/Uni/Testing/HW2/hcmus-sw-testing--eshop-sut/backend/database.sqlite';
const SS = path.join(__dirname, 'screenshots', 'FR18');
if (!fs.existsSync(SS)) fs.mkdirSync(SS, { recursive: true });

function dbQuery(sql) { return execSync(`sqlite3 "${DB_PATH}" "${sql}"`).toString().trim(); }
async function api(method, endpoint, body, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  try { return { status: res.status, body: await res.json() }; }
  catch { return { status: res.status, body: {} }; }
}

const results = [];
function log(tcId, desc, expected, actual, status, bug) {
  results.push({ tcId, desc, expected, actual, status, bug: bug || '—' });
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} [${tcId}] ${desc}`);
  if (status !== 'PASS') console.log(`   Expected: ${expected}\n   Actual:   ${actual}`);
  else console.log(`   Actual: ${actual}`);
  if (bug && bug !== '—') console.log(`   Bug: ${bug}`);
}

(async () => {
  // Tokens
  const adminR = await api('POST', '/api/login', { email: 'admin@eshop.com', password: 'Admin123!' });
  const userR  = await api('POST', '/api/login', { email: 'test@eshop.com',  password: 'Test1234!' });
  const adminToken = adminR.body.token;
  const userToken  = userR.body.token;

  // Reset DB
  dbQuery("UPDATE users SET login_attempts=0, locked_until=NULL");
  dbQuery("DELETE FROM orders");

  console.log('\n========================================');
  console.log('FR-18: Admin Order Management — Full Test');
  console.log('========================================\n');

  // ── BUG-14: Missing role check (NEW BUG) ──
  console.log('── BUG-14: Role-based Access Control ──\n');

  // User accessing admin endpoint
  const orderSetup = await api('POST', '/api/checkout', { total_amount: 50000, shipping_address: 'Test' }, userToken);
  const testOrderId = orderSetup.body.orderId;

  {
    const r = await api('GET', '/api/admin/orders', null, userToken);
    log('DT-FR18-02 (NEW)', 'User token → GET /api/admin/orders', 'HTTP 403 Forbidden', `HTTP ${r.status} (user có thể list TẤT CẢ orders!)`, r.status === 403 ? 'PASS' : 'FAIL', r.status !== 403 ? 'BUG-14' : null);
  }
  {
    const r = await api('PUT', `/api/admin/orders/${testOrderId}/status`, { status: 'confirmed' }, userToken);
    log('DT-FR10-17 (NEW)', 'User token → PUT /api/admin/orders/:id/status', 'HTTP 403 Forbidden', `HTTP ${r.status} (user đổi được status!)`, r.status === 403 ? 'PASS' : 'FAIL', r.status !== 403 ? 'BUG-14' : null);
  }
  {
    const r = await api('GET', '/api/admin/users', null, userToken);
    log('DT-FR12-01 (NEW)', 'User token → GET /api/admin/users', 'HTTP 403 Forbidden', `HTTP ${r.status} (user thấy được danh sách users!)`, r.status === 403 ? 'PASS' : 'FAIL', r.status !== 403 ? 'BUG-14' : null);
  }

  // ── API Tests ──
  console.log('\n── API Tests ──\n');
  {
    const r = await api('GET', '/api/admin/orders', null, adminToken);
    log('DT-FR18-01', 'Admin GET /api/admin/orders', 'HTTP 200, array với user_name', `HTTP ${r.status}, ${Array.isArray(r.body) ? r.body.length : 'N/A'} orders`, r.status === 200 ? 'PASS' : 'FAIL');
  }
  {
    const r = await api('GET', '/api/admin/orders', null, null);
    log('DT-FR18-03', 'No token → GET admin orders', 'HTTP 401', `HTTP ${r.status}`, r.status === 401 ? 'PASS' : 'FAIL');
  }
  {
    const r = await api('PUT', `/api/admin/orders/99999/status`, { status: 'confirmed' }, adminToken);
    log('BVA-FR18-04', 'Order ID 99999 (không tồn tại)', 'HTTP 404', `HTTP ${r.status}: ${r.body.error}`, r.status === 404 ? 'PASS' : 'FAIL');
  }

  // ── XSS Test via API ──
  console.log('\n── XSS Test ──\n');
  const xssPayload = '<script>window.__XSS_TRIGGERED__=true</script><b>XSS Test</b>';
  dbQuery("DELETE FROM orders");
  const xssR = await api('POST', '/api/checkout', { total_amount: 100000, shipping_address: xssPayload }, userToken);
  const xssOrderId = xssR.body.orderId;
  console.log(`   XSS order created: id=${xssOrderId}, payload stored in DB`);
  const storedAddr = dbQuery(`SELECT shipping_address FROM orders WHERE id=${xssOrderId}`);
  console.log(`   Stored shipping_address: ${storedAddr}`);

  // Revenue test
  console.log('\n── Revenue Calculation (BUG-09) ──\n');
  dbQuery("DELETE FROM orders");
  const o1 = await api('POST', '/api/checkout', { total_amount: 100000, shipping_address: 'Addr 1' }, userToken);
  const o2 = await api('POST', '/api/checkout', { total_amount: 100000, shipping_address: 'Addr 2' }, userToken);
  for (const id of [o1.body.orderId, o2.body.orderId]) {
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'confirmed' }, adminToken);
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'shipping' }, adminToken);
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'delivered' }, adminToken);
  }
  const orders = (await api('GET', '/api/admin/orders', null, adminToken)).body;
  const deliveredOrders = orders.filter(o => o.status === 'delivered');
  const expectedRevenue = deliveredOrders.reduce((s, o) => s + o.total_amount, 0);
  console.log(`   Delivered orders: ${deliveredOrders.length}, sum(total_amount) = ${expectedRevenue}₫`);
  console.log(`   Expected on dashboard: ${expectedRevenue}₫, Bug shows: ${expectedRevenue * 2}₫`);

  // ── Browser Tests ──
  console.log('\n── Admin UI Tests (Playwright) ──\n');

  const browser = await chromium.launch({ headless: false, slowMo: 250 });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // 1. Admin login page
  await page.goto(ADMIN_URL);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SS, 'FR18-00-login-page.png') });

  // Get all inputs
  const inputs = await page.locator('input').all();
  console.log(`   Found ${inputs.length} input fields on admin page`);
  for (let i = 0; i < inputs.length; i++) {
    const type = await inputs[i].getAttribute('type');
    const ph = await inputs[i].getAttribute('placeholder');
    console.log(`   Input ${i}: type="${type}" placeholder="${ph}"`);
  }

  // Fill credentials
  const emailInput = page.locator('input').nth(0);
  const pwInput    = page.locator('input').nth(1);
  await emailInput.fill('admin@eshop.com');
  await pwInput.fill('Admin123!');
  await page.screenshot({ path: path.join(SS, 'FR18-01-admin-credentials-filled.png') });

  await page.locator('button[type="submit"], button').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS, 'FR18-02-admin-after-login.png'), fullPage: true });
  const afterLoginUrl = page.url();
  log('UI-FR18-01', 'Admin login qua UI', 'Vào được dashboard', `URL: ${afterLoginUrl}`, afterLoginUrl !== ADMIN_URL + '/login' ? 'PASS' : 'INFO');

  // 2. Navigate to Orders
  await page.waitForTimeout(1000);
  // Try clicking Orders nav item
  const navLinks = await page.locator('nav a, nav button, .sidebar a, aside a, [class*="nav"] a, [class*="menu"] a').all();
  let ordersClicked = false;
  for (const link of navLinks) {
    const text = await link.textContent().catch(() => '');
    if (/order|đơn/i.test(text)) {
      await link.click();
      ordersClicked = true;
      break;
    }
  }
  if (!ordersClicked) {
    // Try clicking any button/link that has "order" text
    const btn = page.locator('text=/order|đơn hàng/i').first();
    if (await btn.count() > 0) { await btn.click(); ordersClicked = true; }
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SS, 'FR18-03-orders-page.png'), fullPage: true });

  // 3. XSS check — is <b>XSS Test</b> rendered as bold?
  const boldCount = await page.locator('b:has-text("XSS Test"), strong:has-text("XSS Test")').count();
  const xssExecuted = await page.evaluate(() => typeof window.__XSS_TRIGGERED__ !== 'undefined' && window.__XSS_TRIGGERED__);
  await page.screenshot({ path: path.join(SS, 'FR18-04-xss-check.png'), fullPage: true });
  log('DT-FR18-19 (BUG-08)', 'XSS <script> tag trong shipping_address', 'Script KHÔNG chạy', `Script executed: ${xssExecuted}`, xssExecuted ? 'FAIL' : 'PASS', xssExecuted ? 'BUG-08' : null);
  log('DT-FR18-20 (BUG-08b)', '<b> HTML tag render trong shipping_address', 'Hiển thị as text', `<b> rendered: ${boldCount > 0}`, boldCount > 0 ? 'FAIL' : 'PASS', boldCount > 0 ? 'BUG-08' : null);

  // 4. Dashboard revenue check
  const dashLinks = await page.locator('nav a, nav button, [class*="nav"] a').all();
  for (const link of dashLinks) {
    const text = await link.textContent().catch(() => '');
    if (/dashboard|tổng quan/i.test(text)) { await link.click(); break; }
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SS, 'FR18-05-dashboard.png'), fullPage: true });

  const pageContent = await page.content();
  // Check revenue display - expected 200,000 but bug shows 400,000
  const has200k = /200[.,]?000/.test(pageContent) || /200000/.test(pageContent);
  const has400k = /400[.,]?000/.test(pageContent) || /400000/.test(pageContent);
  log('DT-FR18-15 (BUG-09)', 'Dashboard revenue (2×100,000₫ delivered)', 'Hiển thị 200,000₫', `has 200k: ${has200k}, has 400k: ${has400k} (bug: nhân 2)`, has400k ? 'FAIL' : 'PASS', has400k ? 'BUG-09' : null);

  // 5. Test order status actions in UI
  dbQuery("DELETE FROM orders");
  const newOrderR = await api('POST', '/api/checkout', { total_amount: 200000, shipping_address: 'UI Test Address' }, userToken);
  const newOrderId = newOrderR.body.orderId;
  await page.reload();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS, 'FR18-06-pending-order-ui.png'), fullPage: true });

  // Find confirm button
  const confirmBtn = page.locator('button:has-text("Xác nhận"), button:has-text("Confirm"), button:has-text("confirm")').first();
  if (await confirmBtn.count() > 0) {
    await confirmBtn.screenshot({ path: path.join(SS, 'FR18-07-confirm-button.png') }).catch(() => {});
    await confirmBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'FR18-08-after-confirm.png'), fullPage: true });
    const statusAfter = dbQuery(`SELECT status FROM orders WHERE id=${newOrderId}`);
    log('DT-FR18-09 (UI)', 'Admin confirm pending order', 'status=confirmed', `DB: ${statusAfter}`, statusAfter === 'confirmed' ? 'PASS' : 'FAIL');
  } else {
    await page.screenshot({ path: path.join(SS, 'FR18-07-no-confirm-btn.png'), fullPage: true });
    log('DT-FR18-09 (UI)', 'Admin confirm pending order', 'status=confirmed', 'Nút Xác nhận không tìm thấy trên trang', 'INFO');
  }

  // 6. Test ship → delivered flow
  const shipBtn = page.locator('button:has-text("Giao hàng"), button:has-text("Ship")').first();
  if (await shipBtn.count() > 0) {
    await shipBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'FR18-09-after-ship.png'), fullPage: true });
    const s1 = dbQuery(`SELECT status FROM orders WHERE id=${newOrderId}`);
    log('DT-FR18-10 (UI)', 'Admin ship confirmed order', 'status=shipping', `DB: ${s1}`, s1 === 'shipping' ? 'PASS' : 'FAIL');

    const doneBtn = page.locator('button:has-text("Hoàn thành"), button:has-text("Delivered")').first();
    if (await doneBtn.count() > 0) {
      await doneBtn.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(SS, 'FR18-10-after-deliver.png'), fullPage: true });
      const s2 = dbQuery(`SELECT status FROM orders WHERE id=${newOrderId}`);
      log('DT-FR18-11 (UI)', 'Admin complete shipping order', 'status=delivered', `DB: ${s2}`, s2 === 'delivered' ? 'PASS' : 'FAIL');
    }
  }

  await browser.close();

  // ── SUMMARY ──
  console.log('\n========================================');
  console.log('KẾT QUẢ FR-18');
  console.log('========================================');
  const pass = results.filter(r => r.status === 'PASS').length;
  const fail = results.filter(r => r.status === 'FAIL').length;
  const info = results.filter(r => r.status === 'INFO').length;
  console.log(`PASS: ${pass} | FAIL: ${fail} | INFO: ${info} | Total: ${results.length}`);
  console.log('\nBugs confirmed:');
  const bugs = [...new Set(results.filter(r => r.bug && r.bug !== '—').map(r => r.bug))];
  bugs.forEach(b => {
    const tcs = results.filter(r => r.bug === b).map(r => r.tcId).join(', ');
    console.log(`  - ${b}: [${tcs}]`);
  });

  fs.writeFileSync(path.join(__dirname, 'results-fr18.json'), JSON.stringify(results, null, 2));
  console.log('\nScreenshots saved to:', SS);
})().catch(err => { console.error('Error:', err.message, err.stack?.split('\n')[1]); process.exit(1); });
