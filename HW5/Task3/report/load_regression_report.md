### 🤖 Automated Performance Regression Guard — LOAD Test

**Gatekeeper Verdict:** 🟢 **PASS (ALLOWED TO MERGE)**  
**Evaluation Summary:** All performance & latency metrics meet Golden SLA requirements  
**Configured Thresholds:** Soft Warning: `+10.0%` | Hard Block: `+20.0%` | Max Error Rate: `0.10%`

#### 1. Tổng Quan Chỉ Số Toàn Hệ Thống (System-Wide Comparative Overview)

| Chỉ số Hiệu năng (Metric) | Kết quả Đo thực tế (PR) | Golden SLA Baseline | Độ lệch (Delta %) | Đánh giá |
| :--- | :---: | :---: | :---: | :---: |
| **Tổng số Samples** | **4,842** | 4,842 | — | ℹ️ Analyzed |
| **Tỷ lệ Lỗi (Error Rate)** | **0.00%** (0 errors) | 0.00% | `0.0%` | 🟢 Clean |
| **Throughput (Thông lượng)** | **16.29 req/s** | 16.29 req/s | `0.0%` | 🟢 Normal |
| **Average RT (Độ trễ TB)** | **7.13 ms** | 7.13 ms | `0.0%` | 🟢 Optimal |
| **Median (P50)** | **5.00 ms** | 5.00 ms | — | 🟢 Fast |
| **90th Percentile (P90)** | **14.00 ms** | 14.00 ms | — | 🟢 Normal |
| **95th Percentile (P95)** | **16.00 ms** | **16.00 ms** | **`0.0%`** | 🟢 PASS |
| **99th Percentile (P99)** | **30.00 ms** | 30.00 ms | — | ℹ️ Tail Latency |
| **Max Response Time** | **76.00 ms** | 76.00 ms | — | ℹ️ Peak |

---

#### 2. Chi Tiết Từng Endpoint (Endpoint SLA Breakdown)

| Endpoint / Sampler | Samples | Avg RT | P95 Actual | P95 Baseline | Δ P95 (%) | Error Rate | Trạng thái |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `GET /api/coupons` | 1,560 | 3.70 ms | **7.00 ms** | 7.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `GET /api/products` | 1,571 | 7.71 ms | **22.00 ms** | 22.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/admin/import-products` | 382 | 10.02 ms | **18.00 ms** | 18.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/categories` | 645 | 10.07 ms | **17.00 ms** | 17.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/login` | 50 | 6.24 ms | **9.00 ms** | 9.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `PUT /api/categories/:id` | 634 | 9.52 ms | **16.00 ms** | 16.00 ms | `0.0%` | 0.00% | 🟢 PASS |

