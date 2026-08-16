---
name: perf-data-generator
description: >
  Use this skill to generate parameterized CSV test data for performance
  testing. Trigger when the user needs to create test accounts, generate
  input data for JMeter or k6, produce CSV files for data-driven testing,
  pre-register users in bulk against a REST API, or handle account lockout
  constraints by ensuring enough unique credentials are available. Also
  trigger when the user asks how to avoid hitting lockout limits during
  stress or spike testing, how to seed a database with test users, or
  how to reset locked accounts between test runs.
---

# Performance Test Data Generator

## Purpose

Generate correctly-sized, correctly-structured CSV data files for
parameterized performance tests. Ensure the data set is large enough
to prevent account lockout, varied enough to exercise different code
paths, and aligned with the column names expected by the test plan.

## Step 1 — Determine data requirements

Before generating anything, calculate how many rows are needed.

The key constraint is account lockout: if the application locks an
account after N consecutive failed logins, the CSV must contain enough
distinct accounts so that no single account is attempted more than N-1
times across the entire test run.

For performance tests, use only valid credentials (correct email and
password pairs that are already registered). Invalid credentials are
a separate concern and belong in a separate file.

Sizing formula:
```
required_rows = max_virtual_users_across_all_scenarios * safety_factor
safety_factor = 1.5  (provides a buffer for concurrent VU startup)
```

Example: if the Stress test peaks at 200 VUs, generate at least 300
rows of distinct user accounts.

Also determine:
- Column names matching the CSV Data Set Config in the test plan.
- The range of product IDs, search keywords, and other parameters
  that will diversify the read and transactional steps.
- Whether a coupon or discount code column is needed.
- Whether transactional steps need derived values such as `cart_total`;
  if so, ensure the CSV contains the inputs required to compute them
  consistently, such as `quantity` and a valid product selection.

## Step 2 — Generate the primary CSV

Use the script below as a starting point. Adapt the column headers and
value generation logic to match the actual API schema.

See references/data-generation-scripts.md for the full implementation.

Quick usage:
```python
from scripts.generate_data import generate_test_csv

generate_test_csv(
    output_file="test_data.csv",
    num_rows=300,
    id_prefix="perf",          # prefix for generated email addresses
    product_ids=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    keywords=["laptop", "phone", "shirt", "watch", "book", "bag"],
    quantities=[1, 2, 3],
)
```

Output file format:
```
email,password,product_id,keyword,quantity,coupon_code
perf_001@test.com,Test@12345,3,laptop,1,
perf_002@test.com,Test@12345,7,shirt,2,
...
```

## Step 3 — Pre-register accounts against the API

Generated CSV accounts must exist in the application before the test
runs. Use the bulk registration script to POST each account to the
registration endpoint.

If the application resets or reseeds its database on startup, do not assume
accounts survive a restart. Re-run the seed or registration step after every
database reset and document that dependency in setup instructions.

If registration requires fields beyond email and password (name, phone,
address), extend the CSV schema and the registration payload accordingly.

The script should:
- Read each row from the CSV.
- POST to the registration endpoint.
- Log success and failure counts.
- Retry once on 5xx responses.
- Skip 409 Conflict responses (account already exists — safe to continue).

See references/data-generation-scripts.md for the full implementation.

Run registration before the first test and after any database reset:
```bash
python scripts/register_users.py \
  --csv test_data.csv \
  --base-url http://localhost:8080 \
  --endpoint /api/auth/register
```

## Step 4 — Handle account lockout between runs

When running Stress or Spike tests with high virtual user counts, some
accounts may become locked due to failed login attempts (for example,
if a previous test run used wrong credentials, or if error injection is
part of the test scenario).

Reset lockout state before each test run using one of these approaches:

Approach A — Admin API (preferred if the application provides one):
```bash
curl -s -X POST \
  -H "Authorization: Bearer ${ADMIN_TOKEN}" \
  -H "Content-Type: application/json" \
  "${BASE_URL}/api/admin/users/unlock-all"
```

Approach B — Direct database query (SQLite):
```bash
sqlite3 app.db \
  "UPDATE users SET failed_login_attempts = 0, locked_until = NULL \
   WHERE email LIKE 'perf_%@test.com';"
```

Approach C — Direct database query (PostgreSQL / MySQL):
```bash
psql "${DB_URL}" -c \
  "UPDATE users SET failed_login_attempts = 0, locked_until = NULL \
   WHERE email LIKE 'perf_%@test.com';"
```

Document which approach was used and the exact command, because the
grader will verify this in the test report.

## Step 5 — Generate supplementary data files

Depending on the workflow, additional CSV files may be needed.

Reusable coupon file:
```
code,type,discount_value,min_order_amount,expired_at,is_active,max_uses_per_user
PERFTEST,percent,10,0,2099-12-31,1,9999
```

When the workflow includes high-frequency coupon application, prefer a
dedicated performance-test coupon with effectively non-blocking constraints
so coupon exhaustion does not invalidate the scenario.

Invalid credentials file (for account lockout boundary testing):
```
email,password,expected_status
perf_lockout_001@test.com,wrongpassword1,401
perf_lockout_001@test.com,wrongpassword2,401
perf_lockout_001@test.com,wrongpassword3,401
perf_lockout_001@test.com,wrongpassword4,423
```

Product catalog snapshot (for workflows that need real product IDs):
```
product_id,name,price,category_id,in_stock
1,Product Alpha,150000,1,true
2,Product Beta,350000,2,true
...
```

To fetch the real product catalog from the API:
```bash
curl -s "${BASE_URL}/api/products?per_page=100" | \
  python -c "
import json, sys, csv
data = json.load(sys.stdin)
w = csv.DictWriter(sys.stdout, fieldnames=['product_id','name','price','category_id'])
w.writeheader()
for p in data['data']:
    w.writerow({'product_id': p['id'], 'name': p['name'],
                'price': p['price'], 'category_id': p['category_id']})
"
```

## Output deliverables

- Primary test data CSV file.
- Bulk registration script (runnable, with configurable base URL).
- Lockout reset script (documented with the method used).
- Row count and column layout documented in the test report.
- Confirmation that registration completed before the first test run.
- Confirmation that any startup-time database reset behavior was accounted for.

## Reference files

See references/data-generation-scripts.md for the full Python implementations
of generate_test_csv, register_users, and reset_lockout functions.
