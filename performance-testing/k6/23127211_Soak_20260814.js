// k6 Endurance / Soak test — 23127211_Soak_20260814
// Muc dich: chay o muc tai Load baseline da xac nhan on dinh (50 VU) trong 15 phut lien tuc
// de tim endurance threshold thuc te cua phan cung (max stable RPS, memory ceiling), theo
// yeu cau HW05 Task 1 "Determine the endurance threshold".
// Chay: k6 run --summary-export=results/23127211_Soak_20260814_summary.json \
//              -e BASE_URL=http://localhost:3000 23127211_Soak_20260814.js
// Dong thoi chay performance-testing/monitor_resources.sh song song de lay memory ceiling
// cua tien trinh backend (node server.js), vi k6 khong tu theo doi tai nguyen he thong.

import { runWorkflow } from './lib/workflow.js';

export const options = {
  stages: [
    { duration: '60s', target: 50 },   // ramp-up
    { duration: '780s', target: 50 },  // steady-state 13 phut
    { duration: '60s', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.01'],
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
