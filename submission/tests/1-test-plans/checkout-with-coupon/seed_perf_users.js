/**
 * seed_perf_users.js — Performance Test Data Generator
 *
 * RUN: node submission/tests/1-test-plans/checkout-with-coupon/seed_perf_users.js
 */

const sqlite3 = require('../../../../backend/node_modules/sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// --- CONFIG ---
const NUM_USERS = 300;
const PASSWORD = 'Perf@2026!';

// Adjusted paths relative to: submission/tests/1-test-plans/checkout-with-coupon/
const dbPath = path.resolve(__dirname, '../../../../backend/database.sqlite');
const csvDir = path.resolve(__dirname, 'test-data');
const couponsCsvPath = path.join(csvDir, 'coupons.csv');

const PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 30000000 },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 28000000 },
  { id: 3, name: 'MacBook Pro M3', price: 45000000 },
  { id: 4, name: 'Tai nghe AirPods Pro 2', price: 6000000 },
  { id: 5, name: 'Ban phim co Keychron Q1', price: 4000000 },
];

const KEYWORDS = ['iPhone', 'Samsung', 'MacBook', 'AirPods', 'Keychron'];

const PERF_COUPON = 'PERFTEST';
function getCoupon(_index) {
  return PERF_COUPON;
}

function getPhone(index) {
  return `0${String(900000000 + index)}`;
}

function getAddress(index) {
  const districts = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Binh Thanh', 'Go Vap', 'Thu Duc'];
  const district = districts[(index - 1) % districts.length];
  return `${index} Le Loi St, ${district}, TP.HCM`;
}

// --- MAIN ---
if (!fs.existsSync(couponsCsvPath)) {
  console.error(`❌ Error: coupons.csv not found at ${couponsCsvPath}`);
  console.error(`Please create coupons.csv with coupon definitions before running this script.`);
  process.exit(1);
}

// Read and parse coupons.csv for DB seeding
const couponsData = fs.readFileSync(couponsCsvPath, 'utf8').trim().split('\n').slice(1);
const parsedCoupons = couponsData.map(line => {
  const parts = line.split(',');
  return {
    code: parts[0],
    type: parts[1],
    discount_value: parseInt(parts[2], 10),
    min_order_amount: parseInt(parts[3], 10),
    expired_at: parts[4],
    is_active: parseInt(parts[5], 10),
    max_uses_per_user: parseInt(parts[6], 10)
  };
});

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Cannot connect to DB:', err);
    process.exit(1);
  }
  console.log('✓ Connected to SQLite database at:', dbPath);
});

db.serialize(() => {
  // 1. Insert coupons from CSV
  parsedCoupons.forEach(coupon => {
    db.run("DELETE FROM coupons WHERE code = ?", [coupon.code], (err) => {
      if (err) console.error(`Error deleting coupon ${coupon.code}:`, err);
      db.run(
        `INSERT INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [coupon.code, coupon.type, coupon.discount_value, coupon.min_order_amount, coupon.expired_at, coupon.is_active, coupon.max_uses_per_user],
        (err) => {
          if (err) console.error(`Error inserting coupon ${coupon.code}:`, err);
          else console.log(`✓ Coupon ${coupon.code} seeded into DB from CSV`);
        }
      );
    });
  });

  // 2. Clean up existing perf test users
  db.run("DELETE FROM users WHERE email LIKE 'perf_user%@eshop.com'", function (err) {
    if (err) {
      console.error('Error deleting old users:', err);
      return;
    }
    console.log(`✓ Removed ${this.changes} old perf test users`);

    // 3. Insert 300 new users
    const stmt = db.prepare(`
      INSERT INTO users (name, email, password, role, login_attempts, shipping_address, phone)
      VALUES (?, ?, ?, 'user', 0, ?, ?)
    `);

    const csvUsers = [];

    for (let i = 1; i <= NUM_USERS; i++) {
      const name = `Perf User ${String(i).padStart(3, '0')}`;
      const email = `perf_user${String(i).padStart(3, '0')}@eshop.com`;
      const phone = getPhone(i);
      const address = getAddress(i);

      stmt.run(name, email, PASSWORD, address, phone);

      const product = PRODUCTS[(i - 1) % PRODUCTS.length];
      const quantity = (i % 2) + 1;
      const coupon = getCoupon(i);

      csvUsers.push({
        email,
        password: PASSWORD,
        product_id: product.id,
        keyword: KEYWORDS[(i - 1) % KEYWORDS.length],
        quantity,
        coupon_code: coupon,
        shipping_address: address,
      });
    }

    stmt.finalize(() => {
      console.log(`✓ Inserted ${NUM_USERS} performance test users into DB`);

      // Write users.csv
      const usersHeader = 'email,password,product_id,keyword,quantity,coupon_code,shipping_address';
      const usersRows = csvUsers.map(
        (u) =>
          `${u.email},${u.password},${u.product_id},${u.keyword},${u.quantity},${u.coupon_code},"${u.shipping_address}"`,
      );
      const usersContent = [usersHeader, ...usersRows].join('\n');
      fs.writeFileSync(path.join(csvDir, 'users.csv'), usersContent, 'utf8');
      console.log(`✓ users.csv written → ${path.join(csvDir, 'users.csv')}`);

      // Write keywords.csv
      const kwHeader = 'keyword';
      const kwRows = KEYWORDS.map((kw) => kw);
      const kwContent = [kwHeader, ...kwRows].join('\n');
      fs.writeFileSync(path.join(csvDir, 'keywords.csv'), kwContent, 'utf8');
      console.log(`✓ keywords.csv written → ${path.join(csvDir, 'keywords.csv')}`);

      // Print lockout reset command for documentation
      console.log('\n--- LOCKOUT RESET COMMAND (run before each test run) ---');
      console.log(`sqlite3 backend/database.sqlite \\`);
      console.log(
        `  "UPDATE users SET login_attempts = 0, locked_until = NULL WHERE email LIKE 'perf_user%@eshop.com';"`,
      );
      console.log('-----------------------------------------------------------\n');

      db.close(() => console.log('✓ Done. DB connection closed.'));
    });
  });
});
