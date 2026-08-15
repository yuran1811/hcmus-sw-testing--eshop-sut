### 🤖 Automated Performance Regression Guard — ENDURANCE Test

**Gatekeeper Verdict:** 🟢 **PASS (ALLOWED TO MERGE)**  
**Evaluation Summary:** All performance & latency metrics meet Golden SLA requirements  
**Configured Thresholds:** Soft Warning: `+10.0%` | Hard Block: `+20.0%` | Max Error Rate: `0.10%`

#### 1. Tổng Quan Chỉ Số Toàn Hệ Thống (System-Wide Comparative Overview)

| Chỉ số Hiệu năng (Metric) | Kết quả Đo thực tế (PR) | Golden SLA Baseline | Độ lệch (Delta %) | Đánh giá |
| :--- | :---: | :---: | :---: | :---: |
| **Tổng số Samples** | **12,643** | 12,643 | — | ℹ️ Analyzed |
| **Tỷ lệ Lỗi (Error Rate)** | **0.00%** (0 errors) | 0.00% | `0.0%` | 🟢 Clean |
| **Throughput (Thông lượng)** | **19.23 req/s** | 19.23 req/s | `0.0%` | 🟢 Normal |
| **Average RT (Độ trễ TB)** | **8.16 ms** | 8.16 ms | `0.0%` | 🟢 Optimal |
| **Median (P50)** | **7.00 ms** | 7.00 ms | — | 🟢 Fast |
| **90th Percentile (P90)** | **15.00 ms** | 15.00 ms | — | 🟢 Normal |
| **95th Percentile (P95)** | **21.00 ms** | **21.00 ms** | **`0.0%`** | 🟢 PASS |
| **99th Percentile (P99)** | **31.00 ms** | 31.00 ms | — | ℹ️ Tail Latency |
| **Max Response Time** | **370.00 ms** | 370.00 ms | — | ℹ️ Peak |

---

#### 2. Chi Tiết Từng Endpoint (Endpoint SLA Breakdown)

| Endpoint / Sampler | Samples | Avg RT | P95 Actual | P95 Baseline | Δ P95 (%) | Error Rate | Trạng thái |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `GET /api/coupons` | 4,087 | 3.70 ms | **7.00 ms** | 7.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `GET /api/products` | 4,102 | 11.03 ms | **29.00 ms** | 29.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/admin/import-products` | 1,017 | 9.55 ms | **15.00 ms** | 15.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/categories` | 1,697 | 9.53 ms | **16.00 ms** | 16.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `POST /api/login` | 50 | 12.86 ms | **12.00 ms** | 12.00 ms | `0.0%` | 0.00% | 🟢 PASS |
| `PUT /api/categories/:id` | 1,690 | 9.61 ms | **16.00 ms** | 16.00 ms | `0.0%` | 0.00% | 🟢 PASS |

