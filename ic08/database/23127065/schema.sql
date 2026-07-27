DROP SCHEMA IF EXISTS eshop_lab CASCADE;
DROP ROLE IF EXISTS app_user;

CREATE SCHEMA eshop_lab;
SET search_path TO eshop_lab, public;

CREATE TABLE users (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email varchar(255) NOT NULL UNIQUE,
  full_name varchar(120) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name varchar(160) NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(12,2) NOT NULL CHECK (price > 0),
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE coupons (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code varchar(32) NOT NULL UNIQUE,
  discount_type varchar(16) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value numeric(12,2) NOT NULL CHECK (discount_value > 0),
  minimum_order numeric(12,2) NOT NULL DEFAULT 0 CHECK (minimum_order >= 0),
  expires_at timestamptz NOT NULL,
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE orders (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id),
  coupon_id integer REFERENCES coupons(id),
  status varchar(16) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'canceled')),
  subtotal numeric(12,2) NOT NULL CHECK (subtotal >= 0),
  discount numeric(12,2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total_amount numeric(12,2) NOT NULL CHECK (total_amount >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE order_items (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id integer NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id integer NOT NULL REFERENCES products(id),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(12,2) NOT NULL CHECK (unit_price > 0),
  UNIQUE (order_id, product_id)
);

-- Deliberate lab defect: percentage discounts are not capped at the order total.
CREATE FUNCTION fn_calculate_discount(p_coupon_code text, p_order_total numeric)
RETURNS numeric
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  v_coupon eshop_lab.coupons%ROWTYPE;
BEGIN
  SELECT * INTO v_coupon
  FROM eshop_lab.coupons
  WHERE code = p_coupon_code AND is_active;

  IF NOT FOUND OR v_coupon.expires_at <= now() OR p_order_total < v_coupon.minimum_order THEN
    RETURN 0;
  END IF;

  IF v_coupon.discount_type = 'percentage' THEN
    RETURN round(p_order_total * v_coupon.discount_value / 100, 2);
  END IF;
  RETURN LEAST(v_coupon.discount_value, p_order_total);
END;
$$;

CREATE FUNCTION prevent_negative_stock()
RETURNS trigger
LANGUAGE plpgsql
AS $$
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

-- Deliberate lab defect: COMMIT inside the loop makes checkout non-atomic.
CREATE PROCEDURE sp_process_checkout(
  p_user_id integer,
  p_product_ids integer[],
  p_quantities integer[],
  p_coupon_code text DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_order_id integer;
  v_product eshop_lab.products%ROWTYPE;
  v_subtotal numeric(12,2) := 0;
  v_discount numeric(12,2) := 0;
  i integer;
BEGIN
  IF cardinality(p_product_ids) IS DISTINCT FROM cardinality(p_quantities)
     OR cardinality(p_product_ids) = 0 THEN
    RAISE EXCEPTION 'Product and quantity arrays must be non-empty and the same length';
  END IF;

  INSERT INTO eshop_lab.orders (user_id, subtotal, discount, total_amount)
  VALUES (p_user_id, 0, 0, 0)
  RETURNING id INTO v_order_id;

  FOR i IN 1..cardinality(p_product_ids) LOOP
    SELECT * INTO STRICT v_product FROM eshop_lab.products WHERE id = p_product_ids[i] FOR UPDATE;
    UPDATE eshop_lab.products SET stock = stock - p_quantities[i] WHERE id = v_product.id;
    INSERT INTO eshop_lab.order_items (order_id, product_id, quantity, unit_price)
    VALUES (v_order_id, v_product.id, p_quantities[i], v_product.price);
    v_subtotal := v_subtotal + v_product.price * p_quantities[i];

    IF i = 1 AND cardinality(p_product_ids) > 1 THEN
      COMMIT;
    END IF;
  END LOOP;

  IF p_coupon_code IS NOT NULL THEN
    v_discount := eshop_lab.fn_calculate_discount(p_coupon_code, v_subtotal);
  END IF;
  UPDATE eshop_lab.orders
  SET subtotal = v_subtotal,
      discount = v_discount,
      total_amount = GREATEST(v_subtotal - v_discount, 0),
      coupon_id = (SELECT id FROM eshop_lab.coupons WHERE code = p_coupon_code)
  WHERE id = v_order_id;
END;
$$;

INSERT INTO users (email, full_name) VALUES
  ('an@example.test', 'An Nguyen'),
  ('binh@example.test', 'Binh Tran'),
  ('chi@example.test', 'Chi Le'),
  ('dung@example.test', 'Dung Pham'),
  ('giang@example.test', 'Giang Vo');

INSERT INTO products (name, description, price, stock) VALUES
  ('Mechanical Keyboard', 'Hot-swappable keyboard', 80.00, 50),
  ('Wireless Mouse', 'Ergonomic mouse', 40.00, 80),
  ('USB-C Hub', 'Seven-port hub', 55.00, 35),
  ('Laptop Stand', 'Aluminium stand', 35.00, 20),
  ('Sold-out Webcam', 'Out-of-stock checkout fixture', 70.00, 0);

INSERT INTO coupons (code, discount_type, discount_value, minimum_order, expires_at) VALUES
  ('SAVE10', 'percentage', 10, 0, now() + interval '1 year'),
  ('LESS20', 'fixed', 20, 50, now() + interval '1 year'),
  ('EXPIRED', 'percentage', 25, 0, now() - interval '1 day'),
  ('PCT150', 'percentage', 150, 0, now() + interval '1 year');

INSERT INTO orders (user_id, status, subtotal, discount, total_amount, created_at)
SELECT ((n - 1) % 5) + 1,
       (ARRAY['pending','paid','shipped','delivered','canceled'])[((n - 1) % 5) + 1],
       20 + n,
       0,
       20 + n,
       now() - make_interval(days => n)
FROM generate_series(1, 200) AS n;

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT id, ((id - 1) % 4) + 1, 1, 20 + id
FROM orders;

CREATE ROLE app_user NOLOGIN;
GRANT USAGE ON SCHEMA eshop_lab TO app_user;
GRANT SELECT ON products, coupons, users TO app_user;
GRANT SELECT, INSERT, UPDATE ON orders, order_items TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA eshop_lab TO app_user;
GRANT EXECUTE ON FUNCTION fn_calculate_discount(text, numeric) TO app_user;
GRANT EXECUTE ON PROCEDURE sp_process_checkout(integer, integer[], integer[], text) TO app_user;
