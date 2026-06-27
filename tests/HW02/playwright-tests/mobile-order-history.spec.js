const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const API_URL = 'http://localhost:3000';
const DB_PATH = '/Users/tuananhnguyen/Documents/Uni/Testing/HW2/hcmus-sw-testing--eshop-sut/backend/database.sqlite';
const SS = path.join(__dirname, 'screenshots', 'Mobile');
if (!fs.existsSync(SS)) fs.mkdirSync(SS, { recursive: true });

function dbQuery(sql) { return execSync(`sqlite3 "${DB_PATH}" "${sql}"`).toString().trim(); }
async function api(method, endpoint, body, token) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  try { return { status: res.status, body: await res.json() }; } catch { return { status: res.status, body: {} }; }
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
  const adminR = await api('POST', '/api/login', { email: 'admin@eshop.com', password: 'Admin123!' });
  const userR  = await api('POST', '/api/login', { email: 'test@eshop.com',  password: 'Test1234!' });
  const adminToken = adminR.body.token, userToken = userR.body.token;

  console.log('\n========================================');
  console.log('Mobile — Order History — API Tests (FR-11/FR-20)');
  console.log('========================================\n');

  // ── NHÓM 1: API Tests ──
  console.log('── Nhóm 1: API Tests (/api/orders/my-orders) ──\n');

  // Setup: tạo orders với các trạng thái khác nhau
  dbQuery("UPDATE users SET login_attempts=0, locked_until=NULL");
  dbQuery("DELETE FROM orders");

  const oIds = {};
  for (const [label, addr] of [
    ['pending',   'Pending Order Address'],
    ['confirmed', 'Confirmed Order Address'],
    ['shipping',  'Shipping Order Address'],
    ['delivered', 'Delivered Order Address'],
    ['canceled',  'Canceled Order Address'],
  ]) {
    const r = await api('POST', '/api/checkout', { total_amount: 100000, shipping_address: addr }, userToken);
    oIds[label] = r.body.orderId;
  }
  // Move orders to their respective statuses
  await api('PUT', `/api/admin/orders/${oIds.confirmed}/status`, { status: 'confirmed' }, adminToken);
  await api('PUT', `/api/admin/orders/${oIds.shipping}/status`,  { status: 'confirmed' }, adminToken);
  await api('PUT', `/api/admin/orders/${oIds.shipping}/status`,  { status: 'shipping'  }, adminToken);
  await api('PUT', `/api/admin/orders/${oIds.delivered}/status`, { status: 'confirmed' }, adminToken);
  await api('PUT', `/api/admin/orders/${oIds.delivered}/status`, { status: 'shipping'  }, adminToken);
  await api('PUT', `/api/admin/orders/${oIds.delivered}/status`, { status: 'delivered' }, adminToken);
  await api('PUT', `/api/admin/orders/${oIds.canceled}/status`,  { status: 'canceled'  }, adminToken);

  console.log(`Orders created: ${JSON.stringify(oIds)}`);

  // DT-MOB-02: Fetch my-orders (authenticated)
  {
    const r = await api('GET', '/api/orders/my-orders', null, userToken);
    const pass = r.status === 200 && Array.isArray(r.body);
    log('DT-MOB-02', 'GET /api/orders/my-orders (authenticated)', 'HTTP 200, array', `HTTP ${r.status}, ${r.body.length} orders`, pass ? 'PASS' : 'FAIL');
    if (pass) {
      const statuses = r.body.map(o => o.status);
      console.log(`   Statuses: [${statuses.join(', ')}]`);
      const sorted = r.body[0].id > r.body[r.body.length - 1].id;
      log('DT-MOB-06', 'Orders sắp xếp mới nhất trước (DESC)', 'id DESC', `First id: ${r.body[0]?.id}, Last: ${r.body[r.body.length-1]?.id}, Sorted: ${sorted}`, sorted ? 'PASS' : 'FAIL');
    }
  }

  // DT-MOB-01: Not authenticated
  {
    const r = await api('GET', '/api/orders/my-orders');
    log('DT-MOB-01', 'GET /api/orders/my-orders (no token)', 'HTTP 401', `HTTP ${r.status}`, r.status === 401 ? 'PASS' : 'FAIL');
  }

  // DT-MOB-07: User B không thấy orders của user A
  {
    // Register user B
    const regR = await api('POST', '/api/register', { name: 'User B', email: 'userb@test.com', password: 'TestPass123!' });
    const loginB = await api('POST', '/api/login', { email: 'userb@test.com', password: 'TestPass123!' });
    const tokenB = loginB.body.token;
    if (tokenB) {
      const r = await api('GET', '/api/orders/my-orders', null, tokenB);
      log('DT-MOB-07', 'User B không thấy orders của User A', '0 orders cho user mới', `User B thấy ${r.body.length} orders`, r.body.length === 0 ? 'PASS' : 'FAIL');
    }
  }

  // ── NHÓM 2: Cancel Tests ──
  console.log('\n── Nhóm 2: Cancel Tests (BUG-11) ──\n');

  // DT-MOB-08: Cancel pending (should work)
  {
    const id = oIds.pending;
    const r = await api('PUT', `/api/orders/${id}/cancel`, {}, userToken);
    log('DT-MOB-08', 'User cancel khi pending', 'HTTP 200', `HTTP ${r.status}: ${r.body.message || r.body.error}`, r.status === 200 ? 'PASS' : 'FAIL');
  }

  // DT-MOB-09: Cancel confirmed (should work)
  {
    const id = oIds.confirmed;
    const r = await api('PUT', `/api/orders/${id}/cancel`, {}, userToken);
    log('DT-MOB-09', 'User cancel khi confirmed', 'HTTP 200', `HTTP ${r.status}: ${r.body.message || r.body.error}`, r.status === 200 ? 'PASS' : 'FAIL');
  }

  // ★ DT-MOB-13 (BUG-11): Cancel shipping via API
  {
    const id = oIds.shipping;
    const r = await api('PUT', `/api/orders/${id}/cancel`, {}, userToken);
    const bugTriggered = r.status === 200;
    const after = dbQuery(`SELECT status FROM orders WHERE id=${id}`);
    log('DT-MOB-13 ★', 'User cancel khi shipping (spec: không cho)', 'HTTP 400, "Cannot cancel"', `HTTP ${r.status}, DB after: ${after}`, bugTriggered ? 'FAIL' : 'PASS', bugTriggered ? 'BUG-11 + BUG-07' : null);
  }

  // DT-MOB-11: Cancel delivered (should fail)
  {
    const id = oIds.delivered;
    const r = await api('PUT', `/api/orders/${id}/cancel`, {}, userToken);
    log('DT-MOB-11', 'User cancel khi delivered', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // DT-MOB-12: Cancel canceled (should fail)
  {
    const id = oIds.canceled;
    const r = await api('PUT', `/api/orders/${id}/cancel`, {}, userToken);
    log('DT-MOB-12', 'User cancel khi already canceled', 'HTTP 400', `HTTP ${r.status}: ${r.body.error}`, r.status === 400 ? 'PASS' : 'FAIL');
  }

  // ── NHÓM 3: BVA ──
  console.log('\n── Nhóm 3: BVA ──\n');

  // BVA-MOB-01: 0 orders
  {
    dbQuery("DELETE FROM orders");
    const r = await api('GET', '/api/orders/my-orders', null, userToken);
    log('BVA-MOB-01', '0 đơn hàng — empty state', 'HTTP 200, []', `HTTP ${r.status}, count=${r.body.length}`, r.status === 200 && r.body.length === 0 ? 'PASS' : 'FAIL');
  }

  // BVA-MOB-02: 1 order (boundary)
  {
    await api('POST', '/api/checkout', { total_amount: 1, shipping_address: 'BVA Test' }, userToken);
    const r = await api('GET', '/api/orders/my-orders', null, userToken);
    log('BVA-MOB-02', '1 đơn hàng (boundary)', 'HTTP 200, [1 order]', `count=${r.body.length}, id=${r.body[0]?.id}`, r.body.length === 1 ? 'PASS' : 'FAIL');
  }

  // BVA-MOB-05: total_amount = 0
  {
    await api('POST', '/api/checkout', { total_amount: 0, shipping_address: 'Zero Amount' }, userToken);
    const r = await api('GET', '/api/orders/my-orders', null, userToken);
    const zero = r.body.find(o => o.total_amount === 0);
    log('BVA-MOB-05', 'total_amount = 0', 'Order có total=0 được lưu', `Found: ${!!zero}, amount: ${zero?.total_amount}`, zero !== undefined ? 'PASS' : 'FAIL');
  }

  // BVA-MOB-06: total_amount rất lớn
  {
    await api('POST', '/api/checkout', { total_amount: 999999999, shipping_address: 'Large Amount' }, userToken);
    const r = await api('GET', '/api/orders/my-orders', null, userToken);
    const large = r.body.find(o => o.total_amount === 999999999);
    log('BVA-MOB-06', 'total_amount = 999,999,999₫', 'Lưu và trả về đúng', `Found: ${!!large}, amount: ${large?.total_amount}`, !!large ? 'PASS' : 'FAIL');
  }

  // ── NHÓM 4: BUG-13 — API_URL hardcoded ──
  console.log('\n── Nhóm 4: BUG-13 Config ──\n');
  const mobileAppContent = fs.readFileSync(
    path.join(__dirname, '../../../frontend-mobile/App.js'), 'utf8'
  );
  const hardcodedLine = mobileAppContent.split('\n').find(l => l.includes('API_URL') && l.includes('192.168'));
  log('DT-MOB-22 (BUG-13)', 'API_URL hardcoded trong mobile App.js', 'Dùng env var hoặc config', hardcodedLine?.trim() || 'not found', hardcodedLine ? 'FAIL' : 'PASS', hardcodedLine ? 'BUG-13' : null);

  // ── NHÓM 5: Web Frontend Order History (reference) ──
  console.log('\n── Nhóm 5: Web Order History (Playwright) ──\n');
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const ctx     = await browser.newContext({
    viewport: { width: 390, height: 844 } // iPhone 14 Pro size để simulate mobile
  });
  const page = await ctx.newPage();

  // Setup orders
  dbQuery("DELETE FROM orders");
  const oP = (await api('POST', '/api/checkout', { total_amount: 150000, shipping_address: 'Pending Test' }, userToken)).body.orderId;
  const oC = (await api('POST', '/api/checkout', { total_amount: 250000, shipping_address: 'Confirmed Test' }, userToken)).body.orderId;
  const oS = (await api('POST', '/api/checkout', { total_amount: 300000, shipping_address: 'Shipping Test' }, userToken)).body.orderId;
  await api('PUT', `/api/admin/orders/${oC}/status`, { status: 'confirmed' }, adminToken);
  await api('PUT', `/api/admin/orders/${oS}/status`, { status: 'confirmed' }, adminToken);
  await api('PUT', `/api/admin/orders/${oS}/status`, { status: 'shipping'  }, adminToken);

  // Login via web
  await page.goto('http://localhost:5173/login');
  await page.waitForLoadState('networkidle');
  await page.locator('input').nth(0).fill('test@eshop.com');
  await page.locator('input').nth(1).fill('Test1234!');
  await page.locator('button[type="submit"], button').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS, 'MOB-01-login.png') });

  // Navigate to profile/orders
  const profileLink = page.locator('a:has-text("Hồ sơ"), a:has-text("Profile"), a[href*="profile"]').first();
  if (await profileLink.count() > 0) {
    await profileLink.click();
  } else {
    await page.goto('http://localhost:5173/profile');
  }
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS, 'MOB-02-profile-orders.png'), fullPage: true });

  const bodyText = await page.textContent('body');

  // Check: orders hiển thị
  const hasOrders = bodyText.includes('Đơn #') || bodyText.includes('đơn hàng') || bodyText.includes('#' + oP);
  log('DT-MOB-05 (Web)', 'Web: danh sách đơn hàng hiển thị', 'Thấy danh sách orders', `Order visible: ${hasOrders}`, hasOrders ? 'PASS' : 'FAIL');

  // Check status labels in Vietnamese
  const hasVietnamese = bodyText.includes('Chờ xác nhận') || bodyText.includes('Đã xác nhận') || bodyText.includes('Đang giao');
  log('DT-MOB-18 (Web)', 'Status hiển thị tiếng Việt', 'Chờ xác nhận / Đã xác nhận / Đang giao', `Found Vietnamese: ${hasVietnamese}`, hasVietnamese ? 'PASS' : 'FAIL');

  // Check cancel button visibility for pending
  const cancelBtns = await page.locator('button:has-text("Hủy"), button:has-text("Hủy đơn")').all();
  log('DT-MOB-08 (Web)', 'Nút Hủy hiển thị cho pending/confirmed orders', 'Ít nhất 1 nút hủy', `Số nút hủy: ${cancelBtns.length}`, cancelBtns.length > 0 ? 'PASS' : 'FAIL');

  // Check shipping cancel button HIDDEN
  const allBtnTexts = await Promise.all(cancelBtns.map(b => b.textContent()));
  await page.screenshot({ path: path.join(SS, 'MOB-03-cancel-buttons.png'), fullPage: true });

  // Try cancel from UI (pending order)
  if (cancelBtns.length > 0) {
    await cancelBtns[0].click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'MOB-04-after-cancel.png'), fullPage: true });
    const afterStatus = dbQuery(`SELECT status FROM orders WHERE id=${oP}`);
    log('DT-MOB-08b (Web)', 'Click Hủy → cancel pending order', 'status=canceled', `DB: ${afterStatus}`, afterStatus === 'canceled' ? 'PASS' : 'FAIL');
  }

  // Verify shipping order cancel button HIDDEN in web
  const pageAfter = await page.textContent('body');
  // The shipping order should NOT have a cancel button
  // (this is tricky to verify directly, but we can check the backend behavior)
  await page.screenshot({ path: path.join(SS, 'MOB-05-final-state.png'), fullPage: true });

  await browser.close();

  console.log('\n========================================');
  console.log('KẾT QUẢ MOBILE ORDER HISTORY');
  console.log('========================================');
  const p = results.filter(r => r.status === 'PASS').length;
  const f = results.filter(r => r.status === 'FAIL').length;
  const i = results.filter(r => r.status === 'INFO').length;
  console.log(`PASS: ${p} | FAIL: ${f} | INFO: ${i} | Total: ${results.length}`);
  const bugs = [...new Set(results.filter(r => r.bug !== '—').map(r => r.bug))];
  if (bugs.length) { console.log('\nBugs confirmed:'); bugs.forEach(b => console.log(`  - ${b}`)); }
  fs.writeFileSync(path.join(__dirname, 'results-mobile.json'), JSON.stringify(results, null, 2));
  console.log('\nScreenshots saved to:', SS);
})().catch(err => { console.error('Error:', err.message, err.stack?.split('\n')[1]); process.exit(1); });
