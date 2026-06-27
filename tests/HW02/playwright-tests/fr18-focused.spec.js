const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const API_URL   = 'http://localhost:3000';
const ADMIN_URL = 'http://localhost:5174';
const DB_PATH   = '/Users/tuananhnguyen/Documents/Uni/Testing/HW2/hcmus-sw-testing--eshop-sut/backend/database.sqlite';
const SS = path.join(__dirname, 'screenshots', 'FR18');
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

  // Setup: 2 delivered orders + 1 pending with XSS payload
  dbQuery("DELETE FROM orders");
  const xssPayload = '<script>window.__XSS__=1</script><b>XSS-Test-Bold</b>';

  const o1 = (await api('POST', '/api/checkout', { total_amount: 100000, shipping_address: xssPayload }, userToken)).body.orderId;
  const o2 = (await api('POST', '/api/checkout', { total_amount: 100000, shipping_address: 'Normal Address' }, userToken)).body.orderId;
  const o3 = (await api('POST', '/api/checkout', { total_amount: 50000, shipping_address: 'Pending Order' }, userToken)).body.orderId;

  for (const id of [o1, o2]) {
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'confirmed' }, adminToken);
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'shipping'  }, adminToken);
    await api('PUT', `/api/admin/orders/${id}/status`, { status: 'delivered' }, adminToken);
  }
  console.log(`Setup: orders ${o1}(XSS,delivered), ${o2}(delivered), ${o3}(pending)`);

  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  // Login to admin
  await page.goto(ADMIN_URL);
  await page.waitForLoadState('networkidle');
  await page.locator('input').nth(0).fill('admin@eshop.com');
  await page.locator('input').nth(1).fill('Admin123!');
  await page.locator('button[type="submit"], button').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS, 'FR18-A1-dashboard.png'), fullPage: true });

  // ── BUG-09: Revenue check on Dashboard ──
  console.log('\n── Revenue (BUG-09) ──');
  const dashText = await page.textContent('body');
  // 2 delivered × 100,000 = 200,000 expected. Bug: 200,000 * 2 = 400,000
  const expected = 200000, bugVal = 400000;

  // Format numbers as they'd appear in Vietnamese locale
  const expectedStr = expected.toLocaleString('vi-VN'); // "200.000"
  const bugStr = bugVal.toLocaleString('vi-VN');         // "400.000"
  const hasExpected = dashText.includes(expectedStr) || dashText.includes('200,000') || dashText.includes('200000');
  const hasBug = dashText.includes(bugStr) || dashText.includes('400,000') || dashText.includes('400000');
  console.log(`   Expected revenue: ${expectedStr}₫ | Bug revenue: ${bugStr}₫`);
  console.log(`   Page has ${expectedStr}: ${hasExpected} | Page has ${bugStr}: ${hasBug}`);

  // Extract revenue text from page
  const revenueEl = await page.locator('[class*="revenue"], [class*="stat"], h2, h3, .text-2xl, .text-3xl').all();
  for (const el of revenueEl) {
    const text = await el.textContent().catch(() => '');
    if (text.includes('₫') || text.match(/\d{3}/)) console.log(`   Revenue element: "${text.trim()}"`);
  }
  await page.screenshot({ path: path.join(SS, 'FR18-A2-revenue.png'), fullPage: true });
  log('DT-FR18-15 (BUG-09)', 'Dashboard revenue = 2×100,000₫ delivered', `${expectedStr}₫`, `Expected text found: ${hasExpected}, Bug text found: ${hasBug}`, !hasBug && hasExpected ? 'PASS' : 'FAIL', hasBug ? 'BUG-09' : null);

  // ── Navigate to Orders tab ──
  console.log('\n── Navigate to Orders tab ──');
  const ordersTab = page.locator('text=Đơn hàng').first();
  await ordersTab.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS, 'FR18-B1-orders-tab.png'), fullPage: true });

  // ── BUG-08: XSS check ──
  console.log('\n── XSS (BUG-08) ──');
  const xssExecuted = await page.evaluate(() => window.__XSS__ === 1);
  const boldEl = await page.locator('b:has-text("XSS-Test-Bold")').count();
  await page.screenshot({ path: path.join(SS, 'FR18-B2-xss-orders.png'), fullPage: true });
  log('DT-FR18-19 (BUG-08)', '<script> XSS trong shipping_address', 'Script KHÔNG chạy', `window.__XSS__ executed: ${xssExecuted}`, xssExecuted ? 'FAIL' : 'PASS', xssExecuted ? 'BUG-08' : null);
  log('DT-FR18-20 (BUG-08b)', '<b> HTML render trong shipping_address', 'Text thô, không bold', `<b> rendered as bold: ${boldEl > 0}`, boldEl > 0 ? 'FAIL' : 'PASS', boldEl > 0 ? 'BUG-08' : null);

  // ── Pending order action buttons ──
  console.log('\n── State buttons (pending order) ──');
  const allText = await page.textContent('body');
  const hasConfirmBtn = allText.includes('Xác nhận');
  const hasCancelBtn  = allText.includes('Hủy');
  await page.screenshot({ path: path.join(SS, 'FR18-B3-order-buttons.png'), fullPage: true });
  log('DT-FR18-23 (UI)', 'Pending order: hiện nút Xác nhận + Hủy', 'Cả 2 nút xuất hiện', `Xác nhận: ${hasConfirmBtn}, Hủy: ${hasCancelBtn}`, hasConfirmBtn && hasCancelBtn ? 'PASS' : 'FAIL');

  // ── Click Xác nhận ──
  const confirmBtn = page.locator('button:has-text("Xác nhận")').first();
  if (await confirmBtn.count() > 0) {
    await confirmBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'FR18-B4-after-confirm.png'), fullPage: true });
    const statusAfter = dbQuery(`SELECT status FROM orders WHERE id=${o3}`);
    log('DT-FR18-09 (UI)', 'Admin click Xác nhận → confirmed', 'status=confirmed', `DB status: ${statusAfter}`, statusAfter === 'confirmed' ? 'PASS' : 'FAIL');
  }

  // ── Click Giao hàng ──
  const shipBtn = page.locator('button:has-text("Giao hàng")').first();
  if (await shipBtn.count() > 0) {
    await shipBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'FR18-B5-after-ship.png'), fullPage: true });
    const s = dbQuery(`SELECT status FROM orders WHERE id=${o3}`);
    log('DT-FR18-10 (UI)', 'Admin click Giao hàng → shipping', 'status=shipping', `DB: ${s}`, s === 'shipping' ? 'PASS' : 'FAIL');
  }

  // ── Click Hoàn thành ──
  const doneBtn = page.locator('button:has-text("Hoàn thành")').first();
  if (await doneBtn.count() > 0) {
    await doneBtn.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(SS, 'FR18-B6-after-deliver.png'), fullPage: true });
    const s = dbQuery(`SELECT status FROM orders WHERE id=${o3}`);
    log('DT-FR18-11 (UI)', 'Admin click Hoàn thành → delivered', 'status=delivered', `DB: ${s}`, s === 'delivered' ? 'PASS' : 'FAIL');
  }

  // ── BUG-06 in UI: canceled order shows "Đánh dấu Đã giao" button ──
  dbQuery("DELETE FROM orders");
  const canceledId = (await api('POST', '/api/checkout', { total_amount: 30000, shipping_address: 'Canceled Test' }, userToken)).body.orderId;
  await api('PUT', `/api/admin/orders/${canceledId}/status`, { status: 'canceled' }, adminToken);
  await page.reload();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(SS, 'FR18-B7-canceled-order.png'), fullPage: true });
  const canceledPageText = await page.textContent('body');
  const hasDanhDau = canceledPageText.includes('Đánh dấu');
  log('DT-FR18-27 (BUG-06)', 'Canceled order UI: có nút "Đánh dấu Đã giao"', 'Không có nút (canceled=final state)', `Nút xuất hiện: ${hasDanhDau}`, hasDanhDau ? 'FAIL' : 'PASS', hasDanhDau ? 'BUG-06' : null);

  await browser.close();

  console.log('\n========================================');
  console.log('KẾT QUẢ FR-18 FOCUSED');
  console.log('========================================');
  const p = results.filter(r => r.status === 'PASS').length;
  const f = results.filter(r => r.status === 'FAIL').length;
  const i = results.filter(r => r.status === 'INFO').length;
  console.log(`PASS: ${p} | FAIL: ${f} | INFO: ${i} | Total: ${results.length}`);
  const bugs = [...new Set(results.filter(r => r.bug !== '—').map(r => r.bug))];
  if (bugs.length) { console.log('\nBugs confirmed:'); bugs.forEach(b => console.log(`  - ${b}`)); }
  fs.writeFileSync(path.join(__dirname, 'results-fr18-focused.json'), JSON.stringify(results, null, 2));
})().catch(err => { console.error('Error:', err.message); process.exit(1); });
