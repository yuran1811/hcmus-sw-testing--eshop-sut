// k6 Load test (baseline) — 23127211_Load_20260814
// Chay: k6 run --summary-export=results/23127211_Load_20260814_summary.json \
//              -e BASE_URL=http://localhost:3000 23127211_Load_20260814.js
// Report view: end-of-test Summary (tuong duong JMeter Summary Report).

import { runWorkflow } from './lib/workflow.js';

export const options = {
  stages: [
    { duration: '60s', target: 50 },   // ramp-up
    { duration: '180s', target: 50 },  // steady-state
    { duration: '60s', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<4000'],
    http_req_failed: ['rate<0.01'],
    'group_duration{group:::05 - Thanh toan [transactional]}': ['p(95)<3000'],
  },
};

const THINK_TIMES = {
  categories: [1, 2],
  product_detail: [1, 3],
  cart: [2, 5],
  checkout: [1, 2],
  cancel: [2, 4],
};

export default function () {
  runWorkflow(THINK_TIMES);
}
