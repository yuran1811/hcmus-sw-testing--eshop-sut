const express = require('express');
const request = require('supertest');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Kept inline so the required three-file submission is independently executable.
const SCHEMA_SQL = String.raw`
DROP SCHEMA IF EXISTS eshop_lab CASCADE;
DROP ROLE IF EXISTS app_user;
CREATE SCHEMA eshop_lab;
SET search_path TO eshop_lab, public;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'customer'
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL,
  stock INT DEFAULT 0 CHECK (stock >= 0)
);

CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_type VARCHAR(20) CHECK (discount_type IN ('percent', 'fixed')) NOT NULL,
  discount_value NUMERIC(10,2) NOT NULL,
  expired_at TIMESTAMP NOT NULL,
  is_active INT DEFAULT 1
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  total_amount NUMERIC(10,2) NOT NULL,
  final_amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('pending', 'confirmed', 'shipping', 'delivered', 'canceled')) DEFAULT 'pending'
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL
);

-- Deliberate SUT defect required by the exercise: percent discounts are uncapped.
CREATE FUNCTION fn_calculate_discount(p_type TEXT, p_value NUMERIC, p_order_amount NUMERIC)
RETURNS NUMERIC LANGUAGE plpgsql IMMUTABLE AS $$
BEGIN
  IF p_type = 'percent' THEN
    RETURN round(p_order_amount * p_value / 100, 2);
  ELSIF p_type = 'fixed' THEN
    RETURN LEAST(p_value, p_order_amount);
  END IF;
  RAISE EXCEPTION 'Unsupported discount type: %', p_type;
END;
$$;

CREATE FUNCTION prevent_negative_stock()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.stock < 0 THEN
    RAISE EXCEPTION 'Negative stock is not allowed for product %', NEW.id
      USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_prevent_negative_stock
BEFORE INSERT OR UPDATE OF stock ON products
FOR EACH ROW EXECUTE FUNCTION prevent_negative_stock();

-- Deliberate SUT defect required by the exercise: the first item is committed early.
CREATE PROCEDURE sp_process_checkout(
  p_user_id INT,
  p_product_ids INT[],
  p_quantities INT[]
)
LANGUAGE plpgsql AS $$
DECLARE
  v_order_id INT;
  v_product eshop_lab.products%ROWTYPE;
  v_total NUMERIC(10,2) := 0;
  i INT;
BEGIN
  INSERT INTO eshop_lab.orders(user_id, total_amount, final_amount)
  VALUES (p_user_id, 0, 0) RETURNING id INTO v_order_id;

  FOR i IN 1..cardinality(p_product_ids) LOOP
    SELECT * INTO STRICT v_product FROM eshop_lab.products
      WHERE id = p_product_ids[i] FOR UPDATE;
    UPDATE eshop_lab.products SET stock = stock - p_quantities[i] WHERE id = v_product.id;
    INSERT INTO eshop_lab.order_items(order_id, product_id, quantity, unit_price)
      VALUES (v_order_id, v_product.id, p_quantities[i], v_product.price);
    v_total := v_total + v_product.price * p_quantities[i];
    IF i = 1 AND cardinality(p_product_ids) > 1 THEN
      COMMIT;
    END IF;
  END LOOP;

  UPDATE eshop_lab.orders SET total_amount = v_total, final_amount = v_total WHERE id = v_order_id;
END;
$$;

INSERT INTO users(email, role) VALUES
  ('admin@example.test', 'admin'),
  ('customer1@example.test', 'customer'),
  ('customer2@example.test', 'customer'),
  ('staff@example.test', 'staff'),
  ('auditor@example.test', 'auditor');

INSERT INTO products(name, description, price, stock) VALUES
  ('Mechanical Keyboard', 'Hot-swappable keyboard', 80, 50),
  ('Wireless Mouse', 'Ergonomic mouse', 40, 80),
  ('USB-C Hub', 'Seven-port hub', 55, 35),
  ('Laptop Stand', 'Aluminium stand', 35, 20),
  ('Sold-out Webcam', 'Out-of-stock checkout fixture', 70, 0);

INSERT INTO coupons(code, discount_type, discount_value, expired_at, is_active) VALUES
  ('CP_OK', 'percent', 10, now() + interval '1 year', 1),
  ('CP_EXPIRED', 'percent', 25, now() - interval '1 day', 1),
  ('CP_INACTIVE', 'fixed', 20, now() + interval '1 year', 0),
  ('CP_PERCENT150', 'percent', 150, now() + interval '1 year', 1);

INSERT INTO orders(user_id, total_amount, final_amount, status)
SELECT floor(random() * 5 + 1)::int,
       20 + n,
       20 + n,
       (ARRAY['pending','confirmed','shipping','delivered','canceled'])[((n - 1) % 5) + 1]
FROM generate_series(1, 200) AS n;

CREATE ROLE app_user NOLOGIN;
GRANT USAGE ON SCHEMA eshop_lab TO app_user;
GRANT SELECT ON users, products, coupons TO app_user;
GRANT SELECT, INSERT, UPDATE ON orders, order_items TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA eshop_lab TO app_user;
GRANT EXECUTE ON FUNCTION fn_calculate_discount(TEXT, NUMERIC, NUMERIC) TO app_user;
GRANT EXECUTE ON PROCEDURE sp_process_checkout(INT, INT[], INT[]) TO app_user;
`;

function createApp() {
  const app = express();
  app.use(express.json());

  app.post('/api/apply-coupon', async (req, res) => {
    const { code, order_amount: orderAmount } = req.body;
    if (typeof code !== 'string' || !Number.isFinite(orderAmount) || orderAmount < 0) {
      return res.status(400).json({ error: 'code and non-negative order_amount are required' });
    }
    try {
      const coupon = await pool.query(
        `SELECT discount_type, discount_value, expired_at, is_active
           FROM eshop_lab.coupons WHERE code = $1`,
        [code]
      );
      if (!coupon.rowCount) return res.status(404).json({ error: 'Coupon not found' });
      const row = coupon.rows[0];
      if (row.is_active !== 1 || new Date(row.expired_at) <= new Date()) {
        return res.status(400).json({ error: 'Coupon is expired or inactive' });
      }
      const result = await pool.query(
        'SELECT eshop_lab.fn_calculate_discount($1, $2, $3) AS discount',
        [row.discount_type, row.discount_value, orderAmount]
      );
      return res.json({ code, order_amount: orderAmount, discount: Number(result.rows[0].discount) });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  app.put('/api/admin/orders/:id/status', async (req, res) => {
    const transitions = {
      pending: ['confirmed', 'canceled'],
      confirmed: ['shipping', 'canceled'],
      shipping: ['delivered'],
      delivered: [],
      canceled: []
    };
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const current = await client.query(
        'SELECT status FROM eshop_lab.orders WHERE id = $1 FOR UPDATE', [req.params.id]
      );
      if (!current.rowCount) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Order not found' });
      }
      if (!transitions[current.rows[0].status].includes(req.body.status)) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: `Invalid transition from ${current.rows[0].status}` });
      }
      const updated = await client.query(
        'UPDATE eshop_lab.orders SET status = $1 WHERE id = $2 RETURNING id, status',
        [req.body.status, req.params.id]
      );
      await client.query('COMMIT');
      return res.json(updated.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      return res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  });

  app.get('/api/products/search', async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT id, name, price, stock FROM eshop_lab.products
         WHERE name ILIKE $1 OR description ILIKE $1 ORDER BY id`,
        [`%${String(req.query.q ?? '')}%`]
      );
      return res.json(result.rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  return app;
}

const app = createApp();

beforeAll(async () => pool.query(SCHEMA_SQL));
afterAll(async () => {
  if (process.env.PRESERVE_LAB_SCHEMA !== '1') {
    await pool.query('DROP SCHEMA IF EXISTS eshop_lab CASCADE; DROP ROLE IF EXISTS app_user;');
  }
  await pool.end();
});

describe('1. Schema and test data', () => {
  test('creates required tables and foreign keys', async () => {
    const tables = await pool.query(`SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'eshop_lab' ORDER BY table_name`);
    expect(tables.rows.map((row) => row.table_name)).toEqual(
      ['coupons', 'order_items', 'orders', 'products', 'users']
    );
    const foreignKeys = await pool.query(`SELECT count(*)::int AS count FROM pg_constraint c
      JOIN pg_namespace n ON n.oid = c.connamespace
      WHERE n.nspname = 'eshop_lab' AND c.contype = 'f'`);
    expect(foreignKeys.rows[0].count).toBe(3);
  });

  test('seeds required counts, roles, sold-out product, and named coupons', async () => {
    const counts = await pool.query(`SELECT
      (SELECT count(*)::int FROM eshop_lab.users) AS users,
      (SELECT count(*)::int FROM eshop_lab.products) AS products,
      (SELECT count(*)::int FROM eshop_lab.orders) AS orders,
      (SELECT count(*)::int FROM eshop_lab.coupons) AS coupons,
      (SELECT count(*)::int FROM eshop_lab.products WHERE stock = 0) AS sold_out,
      (SELECT count(DISTINCT role)::int FROM eshop_lab.users) AS roles`);
    expect(counts.rows[0]).toEqual({ users: 5, products: 5, orders: 200, coupons: 4, sold_out: 1, roles: 4 });
    const coupons = await pool.query('SELECT code FROM eshop_lab.coupons ORDER BY code');
    expect(coupons.rows.map((row) => row.code)).toEqual(
      ['CP_EXPIRED', 'CP_INACTIVE', 'CP_OK', 'CP_PERCENT150']
    );
  });

  test('rejects a duplicate user email', async () => {
    await expect(pool.query(
      "INSERT INTO eshop_lab.users(email) VALUES ('admin@example.test')"
    )).rejects.toMatchObject({ code: '23505' });
  });
});

describe('2. Function', () => {
  test('calculates a valid 10 percent discount', async () => {
    const result = await pool.query("SELECT eshop_lab.fn_calculate_discount('percent', 10, 100) AS d");
    expect(result.rows[0].d).toBe('10.00');
  });

  test('does not allow a discount to exceed the order amount', async () => {
    const result = await pool.query("SELECT eshop_lab.fn_calculate_discount('percent', 150, 200) AS d");
    expect(Number(result.rows[0].d)).toBeLessThanOrEqual(200);
  });
});

describe('3. Trigger', () => {
  test('catalog contains the named enabled trigger', async () => {
    const result = await pool.query(`SELECT t.tgname, t.tgenabled FROM pg_trigger t
      JOIN pg_class c ON c.oid = t.tgrelid JOIN pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname = 'eshop_lab' AND t.tgname = 'trg_prevent_negative_stock'`);
    expect(result.rows).toEqual([{ tgname: 'trg_prevent_negative_stock', tgenabled: 'O' }]);
  });

  test('rejects negative stock and preserves its previous value', async () => {
    const before = await pool.query('SELECT stock FROM eshop_lab.products WHERE id = 1');
    await expect(pool.query('UPDATE eshop_lab.products SET stock = -5 WHERE id = 1'))
      .rejects.toMatchObject({ code: '23514' });
    const after = await pool.query('SELECT stock FROM eshop_lab.products WHERE id = 1');
    expect(after.rows[0].stock).toBe(before.rows[0].stock);
  });
});

describe('4. Stored procedure atomicity', () => {
  test('catalog identifies sp_process_checkout as a procedure', async () => {
    const result = await pool.query(`SELECT p.proname, p.prokind FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname = 'eshop_lab' AND p.proname = 'sp_process_checkout'`);
    expect(result.rows).toEqual([{ proname: 'sp_process_checkout', prokind: 'p' }]);
  });

  test('rolls back every stock change and leaves no incomplete order', async () => {
    const before = await pool.query(`SELECT
      (SELECT stock FROM eshop_lab.products WHERE id = 1)::int AS stock,
      (SELECT count(*) FROM eshop_lab.orders)::int AS orders,
      (SELECT count(*) FROM eshop_lab.order_items)::int AS items`);
    await expect(pool.query('CALL eshop_lab.sp_process_checkout(1, ARRAY[1,5], ARRAY[1,1])'))
      .rejects.toMatchObject({ code: '23514' });
    const after = await pool.query(`SELECT
      (SELECT stock FROM eshop_lab.products WHERE id = 1)::int AS stock,
      (SELECT count(*) FROM eshop_lab.orders)::int AS orders,
      (SELECT count(*) FROM eshop_lab.order_items)::int AS items`);
    expect(after.rows[0]).toEqual(before.rows[0]);
  });
});

describe('5. Functional API', () => {
  test('accepts CP_OK', async () => {
    const response = await request(app).post('/api/apply-coupon')
      .send({ code: 'CP_OK', order_amount: 120 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ code: 'CP_OK', order_amount: 120, discount: 12 });
  });

  test('rejects CP_EXPIRED', async () => {
    const response = await request(app).post('/api/apply-coupon')
      .send({ code: 'CP_EXPIRED', order_amount: 300 });
    expect(response.status).toBe(400);
  });

  test('rejects CP_INACTIVE', async () => {
    const response = await request(app).post('/api/apply-coupon')
      .send({ code: 'CP_INACTIVE', order_amount: 300 });
    expect(response.status).toBe(400);
  });

  test('rejects canceled to delivered with no mutation', async () => {
    const canceled = await pool.query("SELECT id FROM eshop_lab.orders WHERE status = 'canceled' LIMIT 1");
    const response = await request(app).put(`/api/admin/orders/${canceled.rows[0].id}/status`)
      .send({ status: 'delivered' });
    expect(response.status).toBe(400);
    const actual = await pool.query('SELECT status FROM eshop_lab.orders WHERE id = $1', [canceled.rows[0].id]);
    expect(actual.rows[0].status).toBe('canceled');
  });

  test('accepts confirmed to shipping', async () => {
    const order = await pool.query("SELECT id FROM eshop_lab.orders WHERE status = 'confirmed' LIMIT 1");
    const response = await request(app).put(`/api/admin/orders/${order.rows[0].id}/status`)
      .send({ status: 'shipping' });
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('shipping');
  });
});

describe('6. Security', () => {
  test('parameterized search resists SQL injection and changes no rows', async () => {
    const before = await pool.query('SELECT count(*)::int AS count FROM eshop_lab.products');
    const response = await request(app).get('/api/products/search')
      .query({ q: "%' OR 1=1; DROP TABLE eshop_lab.products; --" });
    const after = await pool.query('SELECT count(*)::int AS count FROM eshop_lab.products');
    expect(response.status).not.toBe(500);
    expect(response.body).toEqual([]);
    expect(after.rows[0].count).toBe(before.rows[0].count);
  });

  test('app_user cannot drop an application table', async () => {
    const client = await pool.connect();
    try {
      await client.query('SET ROLE app_user');
      await expect(client.query('DROP TABLE eshop_lab.products')).rejects.toMatchObject({ code: '42501' });
    } finally {
      await client.query('RESET ROLE');
      client.release();
    }
  });

  test('app_user retains required read access', async () => {
    const client = await pool.connect();
    try {
      await client.query('SET ROLE app_user');
      const result = await client.query('SELECT count(*)::int AS count FROM eshop_lab.products');
      expect(result.rows[0].count).toBe(5);
    } finally {
      await client.query('RESET ROLE');
      client.release();
    }
  });
});
