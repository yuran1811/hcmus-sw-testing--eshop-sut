// Luong e2e dung chung cho ca 3 kich ban (Load/Stress/Spike) — workflow "Khach moi - mua roi doi y"
// (POST /api/login -> GET /api/categories -> GET /api/products/:id -> POST /api/cart
//  -> POST /api/checkout -> PUT /api/orders/:id/cancel).
//
// Khong dung jslib.k6.io de tranh phu thuoc mang khi demo/cham bai — tu viet randomIntBetween.

import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const BASE = __ENV.BASE_URL || 'http://localhost:3000';

function parseCsv(text) {
  const lines = text.trim().split('\n');
  const header = lines[0].split(',');
  return lines.slice(1).map((line) => {
    const cols = line.split(',');
    const row = {};
    header.forEach((h, i) => { row[h.trim()] = cols[i]; });
    return row;
  });
}

export const users = new SharedArray('users', function () {
  return parseCsv(open('../data/users.csv'));
});
export const products = new SharedArray('products', function () {
  return parseCsv(open('../data/products.csv'));
});
export const checkoutData = new SharedArray('checkout', function () {
  return parseCsv(open('../data/checkout.csv'));
});

export function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// checkVerbose: nhu check() nhung khi verbose=true se console.error chi tiet request loi
// (tuong duong soi tung request loi cua JMeter View Results Tree — dung cho Spike test).
function checkVerbose(res, checks, verbose, stepLabel) {
  const results = check(res, checks);
  if (verbose && !results) {
    console.error(
      `[FAIL] ${stepLabel} | status=${res.status} | VU=${__VU} iter=${__ITER} | body=${String(res.body).slice(0, 200)}`,
    );
  }
  return results;
}

// think: { categories:[min,max], product_detail:[min,max], cart:[min,max], checkout:[min,max], cancel:[min,max] }
// Spike truyen tat ca = [0, 0]. verbose=true (chi dung o Spike) bat log chi tiet request loi.
export function runWorkflow(think, verbose = false) {
  const user = users[__VU % users.length];
  const product = products[randomIntBetween(0, products.length - 1)];
  const checkoutRow = checkoutData[randomIntBetween(0, checkoutData.length - 1)];

  const jsonHeaders = { headers: { 'Content-Type': 'application/json' } };
  let token;

  group('01 - Login [auth-heavy]', function () {
    const res = http.post(
      `${BASE}/api/login`,
      JSON.stringify({ email: user.email, password: user.password }),
      jsonHeaders,
    );
    checkVerbose(res, {
      'login status 200': (r) => r.status === 200,
      'nhan duoc token': (r) => r.json('token') !== undefined && r.json('token') !== null,
      // Backend that (server.js) khoa tai khoan 3 phut (180000ms) sau khi login_attempts += 2,
      // KHONG phai +1 / 30s nhu README mo ta — xem performance-testing/23127211_Review_Notes.md.
      // users.csv chi chua mat khau dung nen lockout khong nen kich hoat; assertion nay la luoi an toan.
      'khong bi khoa tai khoan (403)': (r) => r.status !== 403,
    }, verbose, '01-Login');
    token = res.json('token') || 'NOT_FOUND';
  });

  const authHeaders = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  sleep(randomIntBetween(think.categories[0], think.categories[1]));

  group('02 - Xem danh muc [read-heavy]', function () {
    const res = http.get(`${BASE}/api/categories`, authHeaders);
    checkVerbose(res, { 'categories status 200': (r) => r.status === 200 }, verbose, '02-Categories');
  });

  sleep(randomIntBetween(think.product_detail[0], think.product_detail[1]));

  group('03 - Xem chi tiet san pham [read-heavy]', function () {
    const res = http.get(`${BASE}/api/products/${product.product_id}`, authHeaders);
    checkVerbose(res, {
      'product detail status 200': (r) => r.status === 200,
      // Backend tra 200 + {} rong khi khong tim thay san pham (khong phai 404) — kiem tra ca field id
      // de bat truong hop nay, xem 23127211_Review_Notes.md.
      'san pham ton tai (co field id)': (r) => r.json('id') !== undefined,
    }, verbose, '03-ProductDetail');
  });

  sleep(randomIntBetween(think.cart[0], think.cart[1]));

  group('04 - Them vao gio [transactional]', function () {
    const res = http.post(
      `${BASE}/api/cart`,
      JSON.stringify({ productId: Number(product.product_id), quantity: 1 }),
      authHeaders,
    );
    checkVerbose(res, { 'add to cart status 200': (r) => r.status === 200 }, verbose, '04-AddToCart');
  });

  sleep(randomIntBetween(think.checkout[0], think.checkout[1]));

  let orderId;
  group('05 - Thanh toan [transactional]', function () {
    const res = http.post(
      `${BASE}/api/checkout`,
      JSON.stringify({
        total_amount: Number(product.price),
        shipping_address: checkoutRow.shipping_address,
      }),
      authHeaders,
    );
    checkVerbose(res, {
      'checkout status 200': (r) => r.status === 200,
      // Field that su la "orderId" (camelCase), khong phai "order_id" nhu quy uoc REST pho bien —
      // day la loi AI draft ban dau doan sai, xem 23127211_Review_Notes.md.
      'co orderId': (r) => r.json('orderId') !== undefined,
    }, verbose, '05-Checkout');
    orderId = res.json('orderId');
  });

  sleep(randomIntBetween(think.cancel[0], think.cancel[1]));

  group('06 - Doi y, huy don [transactional]', function () {
    const res = http.put(`${BASE}/api/orders/${orderId}/cancel`, JSON.stringify({}), authHeaders);
    checkVerbose(res, { 'cancel status 200': (r) => r.status === 200 }, verbose, '06-Cancel');
  });
}
