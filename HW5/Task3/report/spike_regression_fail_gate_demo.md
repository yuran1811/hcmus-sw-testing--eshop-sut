### 🤖 Automated Performance Regression Guard — LOAD Test

**Gatekeeper Verdict:** 🔴 **HARD BLOCK (MERGE BLOCKED)**  
**Evaluation Summary:** P95 Latency regression (+10731.2%) exceeds hard block threshold (+20.0%)  
**Configured Thresholds:** Soft Warning: `+10.0%` | Hard Block: `+20.0%` | Max Error Rate: `0.10%`

#### 1. Tổng Quan Chỉ Số Toàn Hệ Thống (System-Wide Comparative Overview)

| Chỉ số Hiệu năng (Metric) | Kết quả Đo thực tế (PR) | Golden SLA Baseline | Độ lệch (Delta %) | Đánh giá |
| :--- | :---: | :---: | :---: | :---: |
| **Tổng số Samples** | **31,357** | 4,842 | — | ℹ️ Analyzed |
| **Tỷ lệ Lỗi (Error Rate)** | **0.00%** (0 errors) | 0.00% | `0.0%` | 🟢 Clean |
| **Throughput (Thông lượng)** | **158.03 req/s** | 16.29 req/s | `+870.1%` | 🟢 Normal |
| **Average RT (Độ trễ TB)** | **397.87 ms** | 7.13 ms | `+5480.2%` | 🟡 Elevated |
| **Median (P50)** | **121.00 ms** | 5.00 ms | — | 🟢 Fast |
| **90th Percentile (P90)** | **1468.00 ms** | 14.00 ms | — | 🟢 Normal |
| **95th Percentile (P95)** | **1733.00 ms** | **16.00 ms** | **`+10731.2%`** | 🔴 HARD BLOCK |
| **99th Percentile (P99)** | **2303.00 ms** | 30.00 ms | — | ℹ️ Tail Latency |
| **Max Response Time** | **3278.00 ms** | 76.00 ms | — | ℹ️ Peak |

---

#### 2. Chi Tiết Từng Endpoint (Endpoint SLA Breakdown)

| Endpoint / Sampler | Samples | Avg RT | P95 Actual | P95 Baseline | Δ P95 (%) | Error Rate | Trạng thái |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `GET /api/coupons` | 10,059 | 346.18 ms | **1473.00 ms** | 7.00 ms | `+20942.9%` | 0.00% | 🔴 BLOCK |
| `GET /api/products` | 10,172 | 457.94 ms | **1990.00 ms** | 22.00 ms | `+8945.5%` | 0.00% | 🔴 BLOCK |
| `POST /api/admin/import-products` | 2,508 | 417.97 ms | **1861.00 ms** | 18.00 ms | `+10238.9%` | 0.00% | 🔴 BLOCK |
| `POST /api/categories` | 4,179 | 385.98 ms | **1688.00 ms** | 17.00 ms | `+9829.4%` | 0.00% | 🔴 BLOCK |
| `POST /api/login` | 290 | 759.16 ms | **1688.00 ms** | 9.00 ms | `+18655.6%` | 0.00% | 🔴 BLOCK |
| `PUT /api/categories/:id` | 4,149 | 350.46 ms | **1485.00 ms** | 16.00 ms | `+9181.2%` | 0.00% | 🔴 BLOCK |

---

### 🚨 Khuyến Nghị Khắc Phục (Root-Cause & Action Items):
1. **Điều tra hồi quy độ trễ:** Kiểm tra các hàm truy vấn DB mới, Index bảng SQLite (`EXPLAIN QUERY PLAN`), hoặc các tác vụ đồng bộ chặn Event Loop.
2. **Tối ưu hóa ghi cơ sở dữ liệu:** Với các API Write-heavy, đảm bảo transaction được gom nhóm và bật chế độ SQLite `WAL (Write-Ahead Logging)`.
3. **CI Status:** Pull Request đang bị chặn merge tự động. Vui lòng tối ưu hóa code và push commit mới để kích hoạt lại Performance Pipeline.
