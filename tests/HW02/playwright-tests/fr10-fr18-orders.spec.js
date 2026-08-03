const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const API_URL = 'http://localhost:3000';
const ADMIN_URL = 'http://localhost:5174';
const DB_PATH = '/Users/tuananhnguyen/Documents/Uni/Testing/HW2/hcmus-sw-testing--eshop-sut/backend/database.sqlite';

const SS_FR10 = path.join(__dirname, 'screenshots', 'FR10');
const SS_FR18 = path.join(__dirname, 'screenshots', 'FR18');
[SS_FR10, SS_FR18].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

function dbQuery(sql) {
  return execSync(`sqlite3 "${DB_PATH}" "${sql}"`).toString().trim();
}

async function api(method, endpoint, body, token) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  };
  const res = await fetch(`${API_URL}${endpoint}`, opts);
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { status: res.status, body: json };
}

const results10 = [], results18 = [];

function log(arr, tcId, desc, expected, actual, status, bug) {
  arr.push({ tcId, desc, expected, actual, status, bug: bug || '—' });
  const icon = status === 'PASS' ? '✅' : status === 'FAIL' ? '❌' : '⚠️';
  console.log(`${icon} [${tcId}] ${desc}`);
  if (status !== 'PASS') {
    console.log(`   Expected: ${expected}`);
    console.log(`   Actual:   ${actual}`);
  } else {
    console.log(`   Actual:   ${actual}`);
  }
  if (bug && bug !== '—') console.log(`   Bug: ${bug}`);
}

function resetDB() {
  dbQuery("UPDATE users SET login_attempts=0, locked_until=NULL");
  dbQuery("DELETE FROM orders");
}

async function createOrder(userToken, shippingAddress) {
  const r = await api('POST', '/api/checkout', {
    total_amount: 100000,
    shipping_address: shippingAddress || '123 Test Street, HCM'
  }, userToken);
  return r.body.orderId;
}

(async () => {
  // ─── Login để lấy tokens ───
  const adminLogin = await api('POST', '/api/login', { email: 'admin@eshop.com', password: 'Admin123!' });
  const userLogin  = await api('POST', '/api/login', { email: 'test@eshop.com',  password: 'Test1234!' });
  const adminToken = adminLogin.body.token;
  const userToken  = userLogin.body.token;

  if (!adminToken || !userToken) {
    console.error('❌ Login failed. Make sure backend is running.');
    process.exit(1);
  }
  console.log('✅ Tokens obtained (admin + user)');

  // ════════════════════════════════════════════════════════════
  console.log('\n========================================');
  console.log('FR-10: Order State Machine — Test Execution');
  console.log('========================================\n');
  // ════════════════════════════════════════════════════════════

  // Helper: tạo order mới và đưa về trạng thái cần test
  async function orderAtStatus(targetStatus) {
    resetDB();
    const id = await createOrder(userToken);
    const chain = { pending: [], confirmed: ['confirmed'], shipping: ['confirmed','shipping'], delivered: ['confirmed','shipping','delivered'], canceled: ['canceled'] };
    for (const s of (chain[targetStatus] || [])) {
      await api('PUT', `/api/admin/orders/${id}/status`, { status: s }, adminToken);
    }
    return id;
  }

  console.log('── Nhóm 1: Valid Transitions ──\n');

  // DT-FR10-01: pending → confirmed
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'confirmed' }, adminToken);
    const status = dbQuery(`SELECT status FROM orders WHERE id=${id}`);
    const pass = r.status === 200 && status === 'confirmed';
    log(results10, 'DT-FR10-01', 'pending → confirmed', 'HTTP 200, status=confirmed', `HTTP ${r.status}, DB: ${status}`, pass ? 'PASS' : 'FAIL');
  }

  // DT-FR10-02: pending → canceled
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'canceled' }, adminToken);
    const status = dbQuery(`SELECT status FROM orders WHERE id=${id}`);
    log(results10, 'DT-FR10-02', 'pending → canceled', 'HTTP 200, status=canceled', `HTTP ${r.status}, DB: ${status}`, r.status === 200 && status === 'canceled' ? 'PASS' : 'FAIL');
  }

  // DT-FR10-03: confirmed → shipping
  {
    const id = await orderAtStatus('confirmed');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'shipping' }, adminToken);
    const status = dbQuery(`SELECT status FROM orders WHERE id=${id}`);
    log(results10, 'DT-FR10-03', 'confirmed → shipping', 'HTTP 200', `HTTP ${r.status}, DB: ${status}`, r.status === 200 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-04: confirmed → canceled
  {
    const id = await orderAtStatus('confirmed');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'canceled' }, adminToken);
    log(results10, 'DT-FR10-04', 'confirmed → canceled', 'HTTP 200', `HTTP ${r.status}`, r.status === 200 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-05: shipping → delivered
  {
    const id = await orderAtStatus('shipping');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'delivered' }, adminToken);
    const status = dbQuery(`SELECT status FROM orders WHERE id=${id}`);
    log(results10, 'DT-FR10-05', 'shipping → delivered', 'HTTP 200', `HTTP ${r.status}, DB: ${status}`, r.status === 200 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-06: User cancel (pending)
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/orders/${id}/cancel`, {}, userToken);
    log(results10, 'DT-FR10-06', 'User cancel khi pending', 'HTTP 200', `HTTP ${r.status}: ${r.body.message || r.body.error}`, r.status === 200 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-07: User cancel (confirmed)
  {
    const id = await orderAtStatus('confirmed');
    const r = await api('PUT', `/api/orders/${id}/cancel`, {}, userToken);
    log(results10, 'DT-FR10-07', 'User cancel khi confirmed', 'HTTP 200', `HTTP ${r.status}: ${r.body.message || r.body.error}`, r.status === 200 ? 'PASS' : 'FAIL');
  }

  console.log('\n── Nhóm 2: Invalid Transitions ──\n');

  // DT-FR10-08: pending → shipping (skip)
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'shipping' }, adminToken);
    log(results10, 'DT-FR10-08', 'pending → shipping (bỏ qua confirmed)', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-09: pending → delivered (skip 2)
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'delivered' }, adminToken);
    log(results10, 'DT-FR10-09', 'pending → delivered (skip 2 bước)', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-10: confirmed → pending (backward)
  {
    const id = await orderAtStatus('confirmed');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'pending' }, adminToken);
    log(results10, 'DT-FR10-10', 'confirmed → pending (ngược chiều)', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-11: shipping → confirmed (backward)
  {
    const id = await orderAtStatus('shipping');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'confirmed' }, adminToken);
    log(results10, 'DT-FR10-11', 'shipping → confirmed (ngược chiều)', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-12: shipping → canceled (admin via admin endpoint)
  {
    const id = await orderAtStatus('shipping');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'canceled' }, adminToken);
    log(results10, 'DT-FR10-12', 'shipping → canceled (admin endpoint)', 'HTTP 400 (spec: no cancel from shipping)', `HTTP ${r.status}: ${r.body.error || r.body.message}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // DT-FR10-13: delivered → * (final state)
  {
    const id = await orderAtStatus('delivered');
    const r1 = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'pending' }, adminToken);
    const r2 = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'confirmed' }, adminToken);
    log(results10, 'DT-FR10-13', 'delivered → pending/confirmed (final state)', 'HTTP 400 cả 2', `→pending: HTTP ${r1.status}, →confirmed: HTTP ${r2.status}`, r1.status === 400 && r2.status === 400 ? 'PASS' : 'FAIL');
  }

  // ★ DT-FR10-14: canceled → delivered (BUG-06)
  {
    const id = await orderAtStatus('canceled');
    const before = dbQuery(`SELECT status FROM orders WHERE id=${id}`);
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'delivered' }, adminToken);
    const after = dbQuery(`SELECT status FROM orders WHERE id=${id}`);
    const bugTriggered = r.status === 200; // spec says 400
    log(results10, 'DT-FR10-14 ★', 'canceled → delivered (final state vi phạm)', 'HTTP 400 (canceled là final state)', `HTTP ${r.status}, DB: ${before} → ${after}`, bugTriggered ? 'FAIL' : 'PASS', bugTriggered ? 'BUG-06' : null);
  }

  // ★ DT-FR10-15: User cancel khi shipping (BUG-07)
  {
    const id = await orderAtStatus('shipping');
    const r = await api('PUT', `/api/orders/${id}/cancel`, {}, userToken);
    const after = dbQuery(`SELECT status FROM orders WHERE id=${id}`);
    const bugTriggered = r.status === 200; // spec says 400
    log(results10, 'DT-FR10-15 ★', 'User cancel khi shipping (spec: không cho)', 'HTTP 400 (user không được cancel shipping)', `HTTP ${r.status}, DB after: ${after}`, bugTriggered ? 'FAIL' : 'PASS', bugTriggered ? 'BUG-07' : null);
  }

  console.log('\n── Nhóm 3: Auth & Invalid Input ──\n');

  // Auth: no token
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'confirmed' });
    log(results10, 'DT-FR10-16', 'Không có token → admin endpoint', 'HTTP 401', `HTTP ${r.status}`, r.status === 401 ? 'PASS' : 'FAIL');
  }

  // Auth: user token → admin endpoint
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'confirmed' }, userToken);
    log(results10, 'DT-FR10-17', 'User token → PUT /api/admin/orders', 'HTTP 403', `HTTP ${r.status}: ${r.body.error}`, r.status === 403 ? 'PASS' : 'FAIL');
  }

  // BVA: order_id = 0
  {
    const r = await api('PUT', `/api/admin/orders/0/status`, { status: 'confirmed' }, adminToken);
    log(results10, 'BVA-FR10-01', 'order_id = 0', 'HTTP 404', `HTTP ${r.status}: ${r.body.error}`, r.status === 404 ? 'PASS' : 'FAIL');
  }

  // BVA: order_id = -1
  {
    const r = await api('PUT', `/api/admin/orders/-1/status`, { status: 'confirmed' }, adminToken);
    log(results10, 'BVA-FR10-02', 'order_id = -1', 'HTTP 404', `HTTP ${r.status}: ${r.body.error}`, r.status === 404 ? 'PASS' : 'FAIL');
  }

  // BVA: status rỗng
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: '' }, adminToken);
    log(results10, 'BVA-FR10-03', 'status = "" (rỗng)', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // BVA: status uppercase
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'CONFIRMED' }, adminToken);
    log(results10, 'BVA-FR10-04', 'status = "CONFIRMED" (uppercase)', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // BVA: status ngoài enum
  {
    const id = await orderAtStatus('pending');
    const r = await api('PUT', `/api/admin/orders/${id}/status`, { status: 'returned' }, adminToken);
    log(results10, 'BVA-FR10-05', 'status = "returned" (ngoài enum)', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // ════════════════════════════════════════════════════════════
  console.log('\n========================================');
  console.log('FR-18: Admin Order Management — Test Execution');
  console.log('========================================\n');
  // ════════════════════════════════════════════════════════════

  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Setup: login vào admin UI
  await page.goto(`${ADMIN_URL}`);
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: path.join(SS_FR18, 'FR18-00-admin-login.png') });

  // Login admin
  const emailInput = page.locator('input[type="email"], input[type="text"]').first();
  const passInput = page.locator('input[type="password"], input[type="text"]').nth(1);
  await emailInput.fill('admin@eshop.com');
  await passInput.fill('Admin123!');
  await page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Đăng nhập")').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS_FR18, 'FR18-01-admin-dashboard.png') });

  console.log('── API Tests (GET /api/admin/orders) ──\n');

  // DT-FR18-01: Admin GET orders
  {
    const r = await api('GET', '/api/admin/orders', null, adminToken);
    const pass = r.status === 200 && Array.isArray(r.body);
    log(results18, 'DT-FR18-01', 'Admin GET tất cả orders', 'HTTP 200, array', `HTTP ${r.status}, count=${Array.isArray(r.body) ? r.body.length : 'N/A'}`, pass ? 'PASS' : 'FAIL');
  }

  // DT-FR18-02: User token → admin orders
  {
    const r = await api('GET', '/api/admin/orders', null, userToken);
    log(results18, 'DT-FR18-02', 'User token → GET admin orders', 'HTTP 403', `HTTP ${r.status}: ${r.body.error}`, r.status === 403 ? 'PASS' : 'FAIL');
  }

  // DT-FR18-03: No token
  {
    const r = await api('GET', '/api/admin/orders');
    log(results18, 'DT-FR18-03', 'No token → GET admin orders', 'HTTP 401', `HTTP ${r.status}`, r.status === 401 ? 'PASS' : 'FAIL');
  }

  console.log('\n── Dashboard Revenue Tests (BUG-09) ──\n');

  // Setup: tạo đơn delivered để check revenue
  resetDB();
  const orderId1 = await createOrder(userToken, '123 Test St');
  const orderId2 = await createOrder(userToken, '456 Test St');
  // đưa cả 2 về delivered
  for (const id of [orderId1, orderId2]) {
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'confirmed' }, adminToken);
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'shipping' }, adminToken);
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'delivered' }, adminToken);
  }

  // Vào trang Orders của admin
  const ordersLink = page.locator('a:has-text("Orders"), button:has-text("Orders"), [href*="order"], nav a').filter({ hasText: /order/i }).first();
  if (await ordersLink.count() > 0) await ordersLink.click();
  else {
    // Try navigating to orders section directly
    const navItems = await page.locator('nav a, nav button, .nav a, .sidebar a').all();
    for (const item of navItems) {
      const text = await item.textContent();
      if (text && text.toLowerCase().includes('order')) { await item.click(); break; }
    }
  }
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(SS_FR18, 'FR18-02-orders-list.png') });

  // Kiểm tra revenue (2 orders × 100,000 = 200,000 expected, but bug shows 400,000)
  // Check dashboard
  const dashLink = page.locator('a:has-text("Dashboard"), button:has-text("Dashboard"), nav a').filter({ hasText: /dashboard/i }).first();
  if (await dashLink.count() > 0) await dashLink.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(SS_FR18, 'FR18-03-dashboard-revenue.png'), fullPage: true });

  const pageText = await page.textContent('body');
  const revenueExpected = 200000; // 2 × 100,000
  const revenueBug = 400000;     // 2 × 100,000 × 2
  const hasBugAmount = pageText.includes('400') || pageText.includes('400.000') || pageText.includes('400,000');
  const hasCorrectAmount = pageText.includes('200') || pageText.includes('200.000') || pageText.includes('200,000');

  log(results18, 'DT-FR18-15 (BUG-09)', 'Dashboard revenue (2 delivered orders × 100,000₫)', `Hiển thị 200,000₫`, `Page có "400": ${hasBugAmount}, có "200": ${hasCorrectAmount}`, hasBugAmount ? 'FAIL' : 'PASS', hasBugAmount ? 'BUG-09' : null);

  console.log('\n── XSS Test (BUG-08) ──\n');

  // Tạo order với XSS payload
  const xssPayload = '<script>window.__XSS_TRIGGERED__=true</script><b>XSS Test</b>';
  resetDB();
  const xssOrderId = await createOrder(userToken, xssPayload);
  await api('PUT', `/api/admin/orders/${xssOrderId}/status`, { status: 'confirmed' }, adminToken);

  // Vào admin orders page
  await page.goto(`${ADMIN_URL}`);
  await page.waitForTimeout(2000);

  // Kiểm tra xem XSS payload có bị executed không
  const xssTriggered = await page.evaluate(() => window.__XSS_TRIGGERED__);
  await page.screenshot({ path: path.join(SS_FR18, 'FR18-04-xss-test.png') });
  log(results18, 'DT-FR18-19 (BUG-08)', 'XSS payload trong shipping_address', 'Không execute script', `XSS triggered: ${xssTriggered}`, xssTriggered ? 'FAIL' : 'PASS', xssTriggered ? 'BUG-08' : null);

  // Check <b> rendering (HTML injection)
  const boldText = await page.locator('b:has-text("XSS Test")').count();
  log(results18, 'DT-FR18-20 (BUG-08b)', 'HTML <b> tag trong shipping_address render', 'Hiển thị as text, không render HTML', `<b> tag rendered: ${boldText > 0}`, boldText > 0 ? 'FAIL' : 'PASS', boldText > 0 ? 'BUG-08' : null);

  console.log('\n── Admin UI: State Transitions ──\n');

  // Setup: tạo order pending để test UI
  resetDB();
  const uiOrderId = await createOrder(userToken, '123 UI Test Street');
  await page.goto(`${ADMIN_URL}`);
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS_FR18, 'FR18-05-pending-order-buttons.png'), fullPage: true });

  // Confirm order qua UI
  const confirmBtn = page.locator('button:has-text("Xác nhận"), button:has-text("Confirm")').first();
  if (await confirmBtn.count() > 0) {
    await confirmBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS_FR18, 'FR18-06-after-confirm.png'), fullPage: true });
    const newStatus = dbQuery(`SELECT status FROM orders WHERE id=${uiOrderId}`);
    log(results18, 'DT-FR18-09 (UI)', 'Admin confirm pending order qua UI', 'status=confirmed, nút cập nhật', `DB status: ${newStatus}`, newStatus === 'confirmed' ? 'PASS' : 'FAIL');
  } else {
    log(results18, 'DT-FR18-09 (UI)', 'Admin confirm pending order qua UI', 'status=confirmed', 'Không tìm thấy nút Xác nhận', 'INFO');
  }

  // BVA: order_id không tồn tại
  {
    const r = await api('PUT', `/api/admin/orders/99999/status`, { status: 'confirmed' }, adminToken);
    log(results18, 'BVA-FR18-04', 'order_id = 99999 (không tồn tại)', 'HTTP 404', `HTTP ${r.status}: ${r.body.error}`, r.status === 404 ? 'PASS' : 'FAIL');
  }

  // BVA: order_id = 0
  {
    const r = await api('PUT', `/api/admin/orders/0/status`, { status: 'confirmed' }, adminToken);
    log(results18, 'BVA-FR18-01', 'order_id = 0', 'HTTP 404', `HTTP ${r.status}: ${r.body.error}`, r.status === 404 ? 'PASS' : 'FAIL');
  }

  await browser.close();

  // ─────────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────────
  console.log('\n========================================');
  console.log('KẾT QUẢ FR-10');
  console.log('========================================');
  const p10 = results10.filter(r => r.status === 'PASS').length;
  const f10 = results10.filter(r => r.status === 'FAIL').length;
  console.log(`PASS: ${p10} | FAIL: ${f10} | Total: ${results10.length}`);
  console.log('Bugs confirmed:', results10.filter(r => r.bug !== '—').map(r => r.bug).join(', ') || 'none');

  console.log('\n========================================');
  console.log('KẾT QUẢ FR-18');
  console.log('========================================');
  const p18 = results18.filter(r => r.status === 'PASS').length;
  const f18 = results18.filter(r => r.status === 'FAIL').length;
  console.log(`PASS: ${p18} | FAIL: ${f18} | Total: ${results18.length}`);
  console.log('Bugs confirmed:', results18.filter(r => r.bug !== '—').map(r => r.bug).join(', ') || 'none');

  fs.writeFileSync(path.join(__dirname, 'results-fr10.json'), JSON.stringify(results10, null, 2));
  fs.writeFileSync(path.join(__dirname, 'results-fr18.json'), JSON.stringify(results18, null, 2));
  console.log('\nScreenshots: screenshots/FR10 + screenshots/FR18');
})().catch(err => { console.error('Error:', err.message); process.exit(1); });
