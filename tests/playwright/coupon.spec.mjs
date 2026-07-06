import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sqlite3 = require('../../backend/node_modules/sqlite3').verbose();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const dbPath = path.join(repoRoot, 'backend/database.sqlite');
const outputDir = path.join(repoRoot, 'tests/reports/coupon');
const screenshotsDir = path.join(outputDir, 'screenshots');
const baseURL = process.env.BASE_URL || 'http://localhost:3000';

const bugCatalog = {
  'BUG-FR09-001': {
    title: 'Minimum order boundary is implemented as > instead of >=',
    severity: 'High',
    requirement: 'FR-09 C3: total_amount >= min_order_amount',
  },
  'BUG-FR09-002': {
    title: 'Percent coupon discount is calculated with the wrong formula',
    severity: 'Critical',
    requirement: 'FR-09: discount_amount = total x discount_value / 100',
  },
  'BUG-FR09-003': {
    title: 'Apply coupon does not require a valid JWT and trusts client user_id',
    severity: 'Critical',
    requirement: 'FR-09 C4/C5: authenticated user and per-user usage limit',
  },
  'BUG-FR09-004': {
    title: 'Backend trusts client-supplied total_amount for coupon and checkout totals',
    severity: 'Critical',
    requirement: 'FR-08/FR-09: backend recalculates totals and ignores tampered client totals',
  },
  'BUG-FR09-005': {
    title: 'Orders do not persist coupon or discount details',
    severity: 'Medium',
    requirement: 'FR-09: checkout order stores applied coupon/discount information',
  },
};

function openDb() {
  const db = new sqlite3.Database(dbPath);
  return {
    get(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
      });
    },
    run(sql, params = []) {
      return new Promise((resolve, reject) => {
        db.run(sql, params, function onRun(err) {
          err ? reject(err) : resolve(this);
        });
      });
    },
    close() {
      return new Promise((resolve, reject) => {
        db.close((err) => (err ? reject(err) : resolve()));
      });
    },
  };
}

async function apiPost(request, url, data, token) {
  return request.post(`${baseURL}${url}`, {
    data,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

async function apiGet(request, url, token) {
  return request.get(`${baseURL}${url}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

async function createUser(request, label) {
  const email = `coupon-${label}-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;
  const password = 'Test1234!';
  await apiPost(request, '/api/register', { name: `Coupon ${label}`, email, password });
  const loginRes = await apiPost(request, '/api/login', { email, password });
  expect(loginRes.ok()).toBeTruthy();
  return loginRes.json();
}

async function getCoupon(request, token, code) {
  const res = await apiGet(request, '/api/coupons', token);
  expect(res.ok()).toBeTruthy();
  const coupons = await res.json();
  return coupons.find((coupon) => coupon.code === code);
}

async function setUsage(userId, couponId, count) {
  const db = openDb();
  try {
    await db.run('DELETE FROM coupon_usage WHERE user_id = ? AND coupon_id = ?', [userId, couponId]);
    for (let i = 0; i < count; i += 1) {
      await db.run('INSERT INTO coupon_usage (user_id, coupon_id) VALUES (?, ?)', [userId, couponId]);
    }
  } finally {
    await db.close();
  }
}

async function usageCount(userId, couponId) {
  const db = openDb();
  try {
    const row = await db.get(
      'SELECT COUNT(*) AS count FROM coupon_usage WHERE user_id = ? AND coupon_id = ?',
      [userId, couponId],
    );
    return row.count;
  } finally {
    await db.close();
  }
}

async function latestOrder(userId) {
  const db = openDb();
  try {
    return db.get('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC LIMIT 1', [userId]);
  } finally {
    await db.close();
  }
}

function pick(obj, keys) {
  return Object.fromEntries(keys.map((key) => [key, obj?.[key]]));
}

function hasFields(obj, keys) {
  return keys.every((key) => Object.prototype.hasOwnProperty.call(obj || {}, key));
}

async function resultBody(response) {
  try {
    return await response.json();
  } catch {
    return await response.text();
  }
}

async function addCase(results, id, title, fn) {
  try {
    await fn();
    results.cases.push({ id, title, status: 'PASS' });
  } catch (error) {
    results.cases.push({
      id,
      title,
      status: 'FAIL',
      message: error.message,
      bugIds: error.bugIds || ['UNCLASSIFIED'],
      evidence: error.evidence,
    });
  }
}

function fail(message, bugIds, evidence) {
  const error = new Error(message);
  error.bugIds = bugIds;
  error.evidence = evidence;
  throw error;
}

function expectApplySuccess(id, body, expected, bugIds, responseStatus) {
  if (responseStatus !== 200 || body.success !== true) {
    fail(`${id} expected successful coupon application`, bugIds, {
      expected,
      actual: { status: responseStatus, body },
    });
  }
  for (const [key, value] of Object.entries(expected)) {
    if (body[key] !== value) {
      fail(`${id} expected ${key}=${value}, received ${body[key]}`, bugIds, {
        expected,
        actual: { status: responseStatus, body },
      });
    }
  }
}

function expectReject(id, body, status, expectedText, bugIds) {
  const errorText = typeof body?.error === 'string' ? body.error : JSON.stringify(body);
  if (status < 400 || !errorText.toLowerCase().includes(expectedText.toLowerCase())) {
    fail(`${id} expected rejection containing "${expectedText}"`, bugIds, {
      expected: { status: '4xx', errorContains: expectedText },
      actual: { status, body },
    });
  }
}

async function screenshotBug(browser, bugId, cases) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const bug = bugCatalog[bugId] || {
    title: bugId,
    severity: 'Unknown',
    requirement: 'Unclassified failure',
  };
  const rows = cases
    .map((testCase) => {
      const evidence = JSON.stringify(testCase.evidence, null, 2)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
      return `<section>
        <h2>${testCase.id}: ${testCase.title}</h2>
        <p>${testCase.message}</p>
        <pre>${evidence}</pre>
      </section>`;
    })
    .join('');
  await page.setContent(`<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { margin: 0; padding: 32px; font-family: Arial, sans-serif; color: #111827; background: #f8fafc; }
          main { max-width: 1120px; margin: 0 auto; }
          header { border-bottom: 3px solid #ef4444; padding-bottom: 16px; margin-bottom: 20px; }
          h1 { margin: 0 0 10px; font-size: 30px; }
          .meta { display: flex; gap: 10px; flex-wrap: wrap; }
          .pill { padding: 6px 10px; border: 1px solid #cbd5e1; background: white; border-radius: 4px; font-size: 13px; }
          section { background: white; border: 1px solid #d1d5db; border-radius: 6px; padding: 16px; margin: 14px 0; }
          h2 { margin: 0 0 8px; font-size: 18px; }
          p { margin: 0 0 12px; line-height: 1.45; }
          pre { white-space: pre-wrap; word-break: break-word; background: #111827; color: #f9fafb; border-radius: 6px; padding: 14px; font-size: 13px; }
        </style>
      </head>
      <body>
        <main>
          <header>
            <h1>${bugId}: ${bug.title}</h1>
            <div class="meta">
              <span class="pill">Severity: ${bug.severity}</span>
              <span class="pill">Requirement: ${bug.requirement}</span>
              <span class="pill">Captured by Playwright</span>
            </div>
          </header>
          ${rows}
        </main>
      </body>
    </html>`);
  const fileName = `${bugId}.png`;
  await page.screenshot({ path: path.join(screenshotsDir, fileName), fullPage: true });
  await page.close();
  return `screenshots/${fileName}`;
}

test('execute coupon Markdown test cases', async ({ request, browser }) => {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(screenshotsDir, { recursive: true });

  const results = { generatedAt: new Date().toISOString(), cases: [], bugs: {} };

  await addCase(results, 'TC-FR09-ST-001', 'Apply coupon hop le tai bien min order', async () => {
    const { token, user } = await createUser(request, 'st001');
    const coupon = await getCoupon(request, token, 'SAVE10');
    const before = await usageCount(user.id, coupon.id);
    const res = await apiPost(request, '/api/apply-coupon', { code: 'SAVE10', total_amount: 300000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectApplySuccess('TC-FR09-ST-001', body, { discount_amount: 30000, final_amount: 270000 }, ['BUG-FR09-001'], res.status());
    const after = await usageCount(user.id, coupon.id);
    if (before !== 0 || after !== 0) {
      fail('TC-FR09-ST-001 expected usage to remain 0 during apply', ['BUG-FR09-003'], { before, after });
    }
  });

  await addCase(results, 'TC-FR09-ST-002', 'Ghi nhan usage sau checkout thanh cong', async () => {
    const { token, user } = await createUser(request, 'st002');
    const coupon = await getCoupon(request, token, 'SAVE10');
    const checkoutRes = await apiPost(request, '/api/checkout', {
      items: [{ id: 999, name: 'Boundary item', price: 300000, quantity: 1 }],
      total_amount: 270000,
      coupon_id: coupon.id,
    }, token);
    const checkoutBody = await resultBody(checkoutRes);
    if (!checkoutRes.ok()) {
      fail('TC-FR09-ST-002 expected checkout success', ['BUG-FR09-005'], { actual: { status: checkoutRes.status(), body: checkoutBody } });
    }
    await apiPost(request, '/api/coupon-usage', { coupon_id: coupon.id }, token);
    const usage = await usageCount(user.id, coupon.id);
    const order = await latestOrder(user.id);
    if (usage !== 1 || !hasFields(order, ['coupon_id', 'discount_amount'])) {
      fail('TC-FR09-ST-002 expected usage=1 and order coupon/discount fields persisted', ['BUG-FR09-005'], {
        expected: { usage: 1, orderFields: ['coupon_id', 'discount_amount'] },
        actual: { usage, order },
      });
    }
  });

  await addCase(results, 'TC-FR09-ST-003', 'Chan coupon SAVE10 khi het luot dung', async () => {
    const { token, user } = await createUser(request, 'st003');
    const coupon = await getCoupon(request, token, 'SAVE10');
    await setUsage(user.id, coupon.id, 1);
    const res = await apiPost(request, '/api/apply-coupon', { code: 'SAVE10', total_amount: 300000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectReject('TC-FR09-ST-003', body, res.status(), 'giới hạn', ['BUG-FR09-001']);
  });

  await addCase(results, 'TC-FR09-ST-004', 'Apply coupon VIP100 khi con luot dung', async () => {
    const { token, user } = await createUser(request, 'st004');
    const coupon = await getCoupon(request, token, 'VIP100');
    await setUsage(user.id, coupon.id, 1);
    const res = await apiPost(request, '/api/apply-coupon', { code: 'VIP100', total_amount: 300000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectApplySuccess('TC-FR09-ST-004', body, { discount_amount: 100000, final_amount: 200000 }, ['BUG-FR09-001'], res.status());
  });

  await addCase(results, 'TC-FR09-ST-005', 'Chan lan thu 3 cua coupon VIP100', async () => {
    const { token, user } = await createUser(request, 'st005');
    const coupon = await getCoupon(request, token, 'VIP100');
    await setUsage(user.id, coupon.id, 2);
    const res = await apiPost(request, '/api/apply-coupon', { code: 'VIP100', total_amount: 300000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectReject('TC-FR09-ST-005', body, res.status(), 'giới hạn', ['BUG-FR09-001']);
  });

  await addCase(results, 'TC-FR09-ST-006', 'Coupon expired la invalid state', async () => {
    const { token, user } = await createUser(request, 'st006');
    const res = await apiPost(request, '/api/apply-coupon', { code: 'EXPIRED', total_amount: 100000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectReject('TC-FR09-ST-006', body, res.status(), 'hết hạn', ['BUG-FR09-001']);
  });

  await addCase(results, 'TC-FR09-ST-007', 'Below min order khong duoc apply', async () => {
    const { token, user } = await createUser(request, 'st007');
    const res = await apiPost(request, '/api/apply-coupon', { code: 'BIGBUY', total_amount: 499999, user_id: user.id }, token);
    const body = await resultBody(res);
    expectReject('TC-FR09-ST-007', body, res.status(), 'tối thiểu', ['BUG-FR09-001']);
  });

  await addCase(results, 'TC-FR09-ST-008', 'Fixed coupon hop le tai bien min order', async () => {
    const { token, user } = await createUser(request, 'st008');
    const res = await apiPost(request, '/api/apply-coupon', { code: 'BIGBUY', total_amount: 500000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectApplySuccess('TC-FR09-ST-008', body, { discount_amount: 50000, final_amount: 450000 }, ['BUG-FR09-001'], res.status());
  });

  await addCase(results, 'TC-FR09-UC-001', 'Apply coupon va checkout thanh cong', async () => {
    const { token, user } = await createUser(request, 'uc001');
    const res = await apiPost(request, '/api/apply-coupon', { code: 'SAVE10', total_amount: 300000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectApplySuccess('TC-FR09-UC-001', body, { discount_amount: 30000, final_amount: 270000 }, ['BUG-FR09-001'], res.status());
  });

  await addCase(results, 'TC-FR09-UC-002', 'Khach chua dang nhap khong duoc dung coupon', async () => {
    const exactRes = await apiPost(request, '/api/apply-coupon', { code: 'SAVE10', total_amount: 300000 });
    const exactBody = await resultBody(exactRes);
    const diagnosticRes = await apiPost(request, '/api/apply-coupon', { code: 'SAVE10', total_amount: 300001 });
    const diagnosticBody = await resultBody(diagnosticRes);
    if (diagnosticRes.ok()) {
      fail('TC-FR09-UC-002 expected unauthenticated apply-coupon to be rejected', ['BUG-FR09-003'], {
        exactCase: { status: exactRes.status(), body: exactBody },
        diagnosticNoJwtAboveMin: { status: diagnosticRes.status(), body: diagnosticBody },
      });
    }
    expectReject('TC-FR09-UC-002', exactBody, exactRes.status(), 'đăng nhập', ['BUG-FR09-003']);
  });

  await addCase(results, 'TC-FR09-UC-003', 'Ma coupon khong ton tai hoac khong active', async () => {
    const { token, user } = await createUser(request, 'uc003');
    const res = await apiPost(request, '/api/apply-coupon', { code: 'NOPE999', total_amount: 500000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectReject('TC-FR09-UC-003', body, res.status(), 'không tồn tại', ['UNCLASSIFIED']);
  });

  await addCase(results, 'TC-FR09-UC-004', 'Backend khong tin total client gui len', async () => {
    const { token, user } = await createUser(request, 'uc004');
    const applyRes = await apiPost(request, '/api/apply-coupon', { code: 'SAVE10', total_amount: 3000000, user_id: user.id }, token);
    const applyBody = await resultBody(applyRes);
    const checkoutRes = await apiPost(request, '/api/checkout', {
      items: [{ id: 998, name: 'Real cart item', price: 300000, quantity: 1 }],
      total_amount: 3000000,
    }, token);
    const checkoutBody = await resultBody(checkoutRes);
    const order = await latestOrder(user.id);
    if (
      !applyRes.ok() ||
      applyBody.discount_amount !== 30000 ||
      applyBody.final_amount !== 270000 ||
      checkoutRes.status() !== 200 ||
      order?.total_amount === 3000000
    ) {
      fail('TC-FR09-UC-004 expected backend to ignore tampered total_amount=3000000 and use real total=300000', ['BUG-FR09-004', 'BUG-FR09-002'], {
        expected: { apply: { discount_amount: 30000, final_amount: 270000 }, orderTotalNot: 3000000 },
        actual: { apply: { status: applyRes.status(), body: applyBody }, checkout: { status: checkoutRes.status(), body: checkoutBody }, order },
      });
    }
  });

  await addCase(results, 'TC-FR09-UC-005', 'Percent discount dung cong thuc', async () => {
    const { token, user } = await createUser(request, 'uc005');
    const res = await apiPost(request, '/api/apply-coupon', { code: 'SAVE10', total_amount: 500000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectApplySuccess('TC-FR09-UC-005', body, { discount_amount: 50000, final_amount: 450000 }, ['BUG-FR09-002'], res.status());
  });

  await addCase(results, 'TC-FR09-UC-006', 'Fixed discount dung cong thuc', async () => {
    const { token, user } = await createUser(request, 'uc006');
    const res = await apiPost(request, '/api/apply-coupon', { code: 'BIGBUY', total_amount: 600000, user_id: user.id }, token);
    const body = await resultBody(res);
    expectApplySuccess('TC-FR09-UC-006', body, { discount_amount: 50000, final_amount: 550000 }, ['UNCLASSIFIED'], res.status());
  });

  for (const failedCase of results.cases.filter((entry) => entry.status === 'FAIL')) {
    for (const bugId of failedCase.bugIds) {
      if (bugId === 'UNCLASSIFIED') continue;
      results.bugs[bugId] ||= { ...bugCatalog[bugId], cases: [] };
      results.bugs[bugId].cases.push(failedCase);
    }
  }

  for (const [bugId, bug] of Object.entries(results.bugs)) {
    bug.screenshot = await screenshotBug(browser, bugId, bug.cases);
  }

  await fs.writeFile(path.join(outputDir, 'coupon-results.json'), JSON.stringify(results, null, 2));

  const failed = results.cases.filter((entry) => entry.status === 'FAIL');
  expect(failed, `${failed.length} coupon case(s) failed; see tests/reports/coupon/coupon-results.json`).toEqual([]);
});
