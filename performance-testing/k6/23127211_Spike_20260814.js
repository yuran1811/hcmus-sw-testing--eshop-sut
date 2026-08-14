// k6 Spike test — 23127211_Spike_20260814
// Chay: k6 run --http-debug=full -e BASE_URL=http://localhost:3000 \
//              23127211_Spike_20260814.js 2>&1 | tee results/23127211_Spike_20260814_console.log
// Report view: handleSummary() xuat report text chi tiet + console.error tung request loi
// trong luc chay qua checkVerbose() (tuong duong JMeter View Results Tree — soi tung request).
//
// Think time = 0 o moi buoc (dung tinh chat cua Spike test, xem references/k6-blueprint.md).

import { runWorkflow } from './lib/workflow.js';

export const options = {
  stages: [
    { duration: '30s', target: 50 },   // ramp nen len 50 VU
    { duration: '5s', target: 500 },   // dot bien: nhay gan nhu tuc thoi len 500 VU
    { duration: '55s', target: 500 },  // giu dinh tai 500 VU
    { duration: '5s', target: 50 },    // roi dinh dot ngot
    { duration: '25s', target: 0 },    // ramp-down phan con lai
  ],
  thresholds: {
    http_req_failed: ['rate<0.8'], // rat long — muc dich la quan sat hanh vi khi qua tai, khong fail som
  },
};

const THINK_TIMES_ZERO = {
  categories: [0, 0],
  product_detail: [0, 0],
  cart: [0, 0],
  checkout: [0, 0],
  cancel: [0, 0],
};

export default function () {
  runWorkflow(THINK_TIMES_ZERO, true /* verbose: log tung request loi */);
}

export function handleSummary(data) {
  const failed = data.metrics.http_req_failed ? data.metrics.http_req_failed.values.rate : 0;
  const p95 = data.metrics.http_req_duration ? data.metrics.http_req_duration.values['p(95)'] : 0;
  const reqs = data.metrics.http_reqs ? data.metrics.http_reqs.values.count : 0;

  const text =
    `=== 23127211_Spike_20260814 — Spike Test Report ===\n` +
    `Tong so request: ${reqs}\n` +
    `Ty le loi (http_req_failed): ${(failed * 100).toFixed(2)}%\n` +
    `p95 response time: ${p95.toFixed(0)} ms\n` +
    `Chi tiet tung request loi da duoc ghi ra console (console.error) trong luc chay — \n` +
    `xem file console.log kem theo (results/23127211_Spike_20260814_console.log).\n`;

  return {
    'results/23127211_Spike_20260814_report.txt': text,
    stdout: text,
  };
}
