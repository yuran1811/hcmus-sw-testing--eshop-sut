SET search_path TO eshop_lab, public;
DROP INDEX IF EXISTS idx_orders_user_id;

-- Baseline required by the mini-lab.
EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;

CREATE INDEX idx_orders_user_id ON orders(user_id);
ANALYZE orders;

-- Same query after index creation and refreshed statistics.
EXPLAIN (ANALYZE, BUFFERS)
SELECT user_id, SUM(final_amount)
FROM orders
GROUP BY user_id
ORDER BY SUM(final_amount) DESC;

SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'eshop_lab' AND indexname = 'idx_orders_user_id';
