# k6 Script Patterns

Reference patterns for the three performance test scenarios in k6.

## Load test script structure

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Load CSV data once, shared across all VUs
const testData = new SharedArray('users', function () {
  return papaparse.parse(open('./test_data.csv'), { header: true }).data;
});

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // ramp up to 50 VUs over 2 minutes
    { duration: '10m', target: 50 },  // hold at 50 VUs for 10 minutes
    { duration: '1m', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const row = testData[__VU % testData.length];

  // Step 1 — Login
  const loginRes = http.post(
    `${__ENV.BASE_URL}/api/auth/login`,
    JSON.stringify({ email: row.email, password: row.password }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(loginRes, { 'login status 200': (r) => r.status === 200 });
  const token = loginRes.json('data.token');

  sleep(Math.random() * 2 + 1); // think time 1-3 seconds

  // Step 2 — Search products
  const listRes = http.get(
    `${__ENV.BASE_URL}/api/products?search=${row.keyword}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  check(listRes, { 'list status 200': (r) => r.status === 200 });
  const productId = listRes.json('data[0].id');

  sleep(Math.random() * 2 + 1);

  // Step 3 — Add to cart
  const cartRes = http.post(
    `${__ENV.BASE_URL}/api/cart/items`,
    JSON.stringify({ product_id: productId, quantity: parseInt(row.quantity) }),
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
  );
  check(cartRes, { 'cart status 201': (r) => r.status === 201 });
  const cartId = cartRes.json('data.cart_id');

  sleep(Math.random() * 3 + 1);

  // Step 4 — Place order
  const orderRes = http.post(
    `${__ENV.BASE_URL}/api/orders`,
    JSON.stringify({ cart_id: cartId }),
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
  );
  check(orderRes, { 'order status 201': (r) => r.status === 201 });

  sleep(Math.random() * 2 + 1);
}
```

## Stress test options block

```javascript
export const options = {
  stages: [
    { duration: '2m', target: 50 },   // warm-up
    { duration: '3m', target: 100 },  // step 1
    { duration: '3m', target: 150 },  // step 2
    { duration: '3m', target: 200 },  // step 3 — watch for degradation here
    { duration: '3m', target: 250 },  // step 4
    { duration: '2m', target: 0 },    // ramp down
  ],
  thresholds: {
    // These thresholds are set loose on purpose — stress test is meant to break things.
    // Track the actual p95 and error rate in the output; don't abort early.
    http_req_failed: ['rate<0.20'],
  },
};
```

## Spike test options block

```javascript
export const options = {
  stages: [
    { duration: '30s', target: 20 },   // baseline
    { duration: '10s', target: 200 },  // spike — rapid ramp is intentional
    { duration: '2m', target: 200 },   // hold spike
    { duration: '10s', target: 20 },   // drop back to baseline — rapid drop
    { duration: '3m', target: 20 },    // recovery observation
    { duration: '30s', target: 0 },    // ramp down
  ],
  thresholds: {
    // During spike p95 may spike; recovery is what matters.
    http_req_failed: ['rate<0.05'],
  },
};
```

## Running k6 and saving output

```bash
# Run with JSON output for later analysis
k6 run \
  --out json=results/load.json \
  --env BASE_URL=http://localhost:8080 \
  scripts/load_test.js

# Convert k6 JSON summary to a readable table
k6 run --summary-export=results/load_summary.json scripts/load_test.js
```

## Extracting p95 from k6 JSON output

```python
import json

with open('results/load_summary.json') as f:
    summary = json.load(f)

for metric, data in summary['metrics'].items():
    if 'p(95)' in data.get('values', {}):
        print(f"{metric} p95: {data['values']['p(95)']:.1f}ms")
```
