// k6 Stress test (bac thang toi diem gay) — 23127211_Stress_20260814
// Chay: k6 run --out json=results/23127211_Stress_20260814_raw.json \
//              -e BASE_URL=http://localhost:3000 23127211_Stress_20260814.js
// Report view: raw JSON, tong hop percentile theo tung bac tai o buoc phan tich
// (tuong duong JMeter Aggregate Report) — xem .agents/skills/perf-log-analyzer.
//
// Nguong (thresholds) de long/bo — muc dich la tim diem gay, khong phai pass/fail
// (dat chat se khien k6 abort truoc khi kip cham diem gay, xem references/k6-blueprint.md).

import { runWorkflow } from './lib/workflow.js';

export const options = {
  stages: [
    { duration: '60s', target: 50 },    // bac 1: ramp 0 -> 50
    { duration: '120s', target: 50 },   // bac 1: steady
    { duration: '60s', target: 100 },   // bac 2: ramp 50 -> 100
    { duration: '120s', target: 100 },  // bac 2: steady
    { duration: '60s', target: 200 },   // bac 3: ramp 100 -> 200
    { duration: '120s', target: 200 },  // bac 3: steady
    { duration: '60s', target: 400 },   // bac 4: ramp 200 -> 400
    { duration: '60s', target: 400 },   // bac 4: steady (JMeter Thread Group khong ho tro
                                         // ramp-down muot native — xem 23127211_Workload_Model.md)
  ],
  thresholds: {
    http_req_failed: ['rate<0.5'], // nguong long, chi de tranh false-negative khi vuot diem gay
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
