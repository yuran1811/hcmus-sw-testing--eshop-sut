SELECT version() AS server_version,
       current_database() AS database_name,
       current_user AS database_user;

SELECT 'table' AS object_type, c.relname AS object_name
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'eshop_lab' AND c.relkind = 'r'
UNION ALL
SELECT CASE p.prokind WHEN 'p' THEN 'procedure' ELSE 'function' END, p.proname
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'eshop_lab'
UNION ALL
SELECT 'trigger', t.tgname
FROM pg_trigger t
JOIN pg_class c ON c.oid = t.tgrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'eshop_lab' AND NOT t.tgisinternal
ORDER BY object_type, object_name;

SELECT rolname, rolcanlogin, rolsuper, rolcreatedb
FROM pg_roles WHERE rolname = 'app_user';

SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'eshop_lab' AND indexname = 'idx_orders_user_id';
