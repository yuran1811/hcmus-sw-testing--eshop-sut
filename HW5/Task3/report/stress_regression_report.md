### 🤖 Automated Performance Regression Guard — STRESS Test

**Gatekeeper Verdict:** 🟢 **PASS (ALLOWED TO MERGE)**  
**Evaluation Summary:** All performance & latency metrics meet Golden SLA requirements  
**Configured Thresholds:** Soft Warning: `+10.0%` | Hard Block: `+20.0%` | Max Error Rate: `0.10%`

#### 1. Tổng Quan Chỉ Số Toàn Hệ Thống (System-Wide Comparative Overview)

| Chỉ số Hiệu năng (Metric) | Kết quả Đo thực tế (PR) | Golden SLA Baseline | Độ lệch (Delta %) | Đánh giá |
| :--- | :---: | :---: | :---: | :---: |
| **Tổng số Samples** | **16,546** | 16,546 | — | ℹ️ Analyzed |
| **Tỷ lệ Lỗi (Error Rate)** | **0.00%** (0 errors) | 0.00% | `0.0%` | 🟢 Clean |
| **Throughput (Thông lượng)** | **42.61 req/s** | 42.61 req/s | `0.0%` | 🟢 Normal |
| **Average RT (Độ trễ TB)** | **8.26 ms** | 8.26 ms | `0.0%` | 🟢 Optimal |
| **Median (P50)** | **7.00 ms** | 7.00 ms | — | 🟢 Fast |
| **90th Percentile (P90)** | **15.00 ms** | 15.00 ms | — | 🟢 Normal |
| **95th Percentile (P95)** | **19.00 ms** | **19.00 ms** | **`0.0%`** | 🟢 PASS |
| **99th Percentile (P99)** | **31.00 ms** | 31.00 ms | — | ℹ️ Tail Latency |
| **Max Response Time** | **66.00 ms** | 66.00 ms | — | ℹ️ Peak |

---

#### 2. Chi Tiết Từng Endpoint (Endpoint SLA Breakdown)

| Endpoint / Sampler | Samples | Avg RT | P95 Actual | P95 Baseline | Δ P95 (%) | Error Rate | Trạng thái |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `GET /api/coupons` | 5,244 | 4.15 ms | **10.00 ms** | 10.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `GET /api/products` | 5,364 | 11.65 ms | **27.00 ms** | 27.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/admin/import-products` | 1,268 | 9.56 ms | **17.00 ms** | 17.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/categories` | 2,130 | 9.32 ms | **16.00 ms** | 16.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/login` | 500 | 4.80 ms | **10.00 ms** | 10.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `PUT /api/categories/:id` | 2,040 | 8.86 ms | **15.00 ms** | 15.00 ms | `0.0%` | 0.00% | 🟢 PASS |

