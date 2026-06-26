const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Clear orders
  db.run('DELETE FROM orders');
  console.log('Cleared orders.');

  // Seed Admin Order (user_id = 1)
  db.run('INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (1, 150000, "pending", "123 Admin St")');

  // Seed Test User Orders (user_id = 2) - 6 orders to test pagination
  for (let i = 1; i <= 6; i++) {
    db.run(`INSERT INTO orders (user_id, total_amount, status, shipping_address) VALUES (2, ${100000 * i}, "pending", "456 User St")`);
  }
  console.log('Seeded 1 admin order and 6 user orders.');

  // Seed Empty User (bypassing the flawed frontend regex)
  db.run("DELETE FROM users WHERE email = 'empty@eshop.com'");
  db.run("INSERT INTO users (name, email, password, role) VALUES ('Empty User', 'empty@eshop.com', 'Password123!', 'user')");
  console.log('Seeded Empty User: empty@eshop.com / Password123!');
});

db.close();
