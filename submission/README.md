# HW05 — Hồ sơ nộp bài kiểm thử hiệu năng

| Thuộc tính        | Nội dung                                                                           |
| ----------------- | ---------------------------------------------------------------------------------- |
| Sinh viên         | Mạch Quốc Tấn                                                                      |
| MSSV              | `23127115`                                                                         |
| Workflow          | Checkout with Coupon                                                               |
| SUT               | EShop — Node.js/Express/SQLite                                                     |
| Công cụ           | Apache JMeter `5.6.3`, Windows Task Manager, AI tools                              |
| Repository        | <https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw5/23127115-mqtan> |
| Nhánh             | `hw5/23127115-mqtan`                                                               |
| Video Task 1      | [Demo kiểm thử hiệu năng](https://youtu.be/l4fiLiSnpyI)                            |
| Video Agent Skill | [Demo Agent Skill](https://youtu.be/MjByvUU5z4k)                                   |

## 1. Điểm bắt đầu

- [Báo cáo chính](./main-report.md)
- [Tóm tắt thực thi](./tests/3-test-summary/checkout-with-coupon/test-summary.md)
- [Ma trận truy vết](./tests/3-test-summary/checkout-with-coupon/traceability-matrix.md)
- [AI Audit Report](./ai-report/AI_Audit_Report.md)
- [AI Critique](./ai-report/ai-critique.md)
- [Nhật ký Git](./git-commit-log.txt)
- [Danh sách Agent Skills](./.agents/skills/README.md)

## 2. Workflow và phạm vi

Workflow E2E dùng chung cho Load, Stress, Spike và Soak:

`POST /api/login` → `GET /api/categories` → `GET /api/products?search=` → `POST /api/cart` → `POST /api/apply-coupon` → `POST /api/checkout` → `GET /api/orders/my-orders`

| Nhóm endpoint | Endpoint được bao phủ                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| Auth-heavy    | `POST /api/login`                                                               |
| Read-heavy    | `GET /api/categories`, `GET /api/products?search=`, `GET /api/orders/my-orders` |
| Transactional | `POST /api/cart`, `POST /api/apply-coupon`, `POST /api/checkout`                |

## 3. Kết quả chính thức từ raw JTL

| Kịch bản          | Samples | Failures | Error rate | Throughput toàn run |       p95 |       p99 | Kết luận                 |
| ----------------- | ------: | -------: | ---------: | ------------------: | --------: | --------: | ------------------------ |
| Load 50 VU        |   5,996 |        0 |     0.000% |         4.698 req/s |  25.00 ms |  51.35 ms | Baseline sạch            |
| Stress đến 200 VU | 138,180 |       41 |  0.029671% |       115.276 req/s | 259.00 ms | 925.00 ms | Cảnh báo suy giảm        |
| Spike 100 VU      |  45,436 |       34 |  0.074831% |        63.266 req/s |  40.25 ms |  68.00 ms | Cần điều tra cụm lỗi     |
| Soak 130 VU       |  54,364 |        0 |     0.000% |        75.687 req/s |  21.00 ms |  28.00 ms | Đạt                      |
| Soak 180 VU       |  75,207 |        0 |     0.000% |       104.725 req/s |  20.00 ms |  29.00 ms | Baseline ổn định bảo thủ |
| Soak 230 VU       |  95,747 |        0 |     0.000% |       133.280 req/s |  35.00 ms |  84.00 ms | Cảnh báo biên trên       |

Raw JTL là nguồn chuẩn. Ngưỡng endurance bảo thủ được chọn là `180 VU`, tương ứng khoảng `119.385 req/s` trong lát sau ramp-up `180–660 s`. `230 VU` chưa thất bại nhưng late-run p95 tăng từ `25 ms` lên `94 ms`, nên được giữ làm upper-bound cảnh báo thay vì capacity tối đa.

## 4. Bản đồ sản phẩm bàn giao

### 4.1. Test plan, dữ liệu và hướng dẫn chạy

| Thành phần      | Vị trí                                                                                                 | Trạng thái                                 |
| --------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| Load JMX        | [23127115_Load_20260813.jmx](./tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx)     | Có, đúng naming                            |
| Stress JMX      | [23127115_Stress_20260813.jmx](./tests/1-test-plans/checkout-with-coupon/23127115_Stress_20260813.jmx) | Có, đúng naming                            |
| Spike JMX       | [23127115_Spike_20260813.jmx](./tests/1-test-plans/checkout-with-coupon/23127115_Spike_20260813.jmx)   | Có, đúng naming                            |
| Soak JMX        | [23127115_Soak_20260815.jmx](./tests/1-test-plans/checkout-with-coupon/23127115_Soak_20260815.jmx)     | Có, bằng chứng endurance bổ sung           |
| CSV             | [test-data](./tests/1-test-plans/checkout-with-coupon/test-data/)                                      | `users.csv`, `keywords.csv`, `coupons.csv` |
| Seed/reset      | [seed_perf_users.js](./tests/1-test-plans/checkout-with-coupon/seed_perf_users.js)                     | Có                                         |
| Thiết kế và CLI | [README test plan](./tests/1-test-plans/checkout-with-coupon/README.md)                                | Có, dùng Bash                              |

### 4.2. Bằng chứng thực thi

| Thành phần              | Vị trí                                                                                                                                                                          | Trạng thái                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Load JTL/HTML/ảnh/log   | [load](./tests/2-test-runs/checkout-with-coupon/load/)                                                                                                                          | Có                                             |
| Stress JTL/HTML/ảnh/log | [stress](./tests/2-test-runs/checkout-with-coupon/stress/)                                                                                                                      | Có                                             |
| Spike JTL/HTML/ảnh/log  | [spike](./tests/2-test-runs/checkout-with-coupon/spike/)                                                                                                                        | Có                                             |
| Soak 130/180/230        | [soak](./tests/2-test-runs/checkout-with-coupon/soak/)                                                                                                                          | 3 JTL, 3 HTML report, 6 ảnh mid/late           |
| Phần cứng               | [hardware-dxdiag.png](./tests/2-test-runs/checkout-with-coupon/hardware/hardware-dxdiag.png)                                                                                    | Hostname `QUOCTAN`, 16 logical CPUs, 16 GB RAM |
| Video Task 1            | [YouTube](https://youtu.be/l4fiLiSnpyI)                                                                                                                                         | Unlisted, tiếng Việt, 22:35                    |
| Issue hiệu năng         | [ISSUE-CWC-001](./tests/3-test-summary/checkout-with-coupon/issue-reports/ISSUE-CWC-001.md), [GitHub #293](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/293) | Đã đăng                                        |

### 4.3. Task 2 — AI analysis và human review

| Thành phần             | Vị trí                                                                                             | Trạng thái       |
| ---------------------- | -------------------------------------------------------------------------------------------------- | ---------------- |
| Đầu ra phân tích AI    | [jtl-analysis-raw.md](./ai-report/task2/jtl-analysis-raw.md)                                       | Có               |
| Human review JTL       | [jtl-analysis-review.md](./ai-report/task2/jtl-analysis-review.md)                                 | Có               |
| Phân tích cuối         | [jtl-analysis.md](./docs/test-report/jtl-analysis.md)                                              | Có, dùng raw JTL |
| Đề xuất AI thô         | [optimization-recommendations-raw.md](./ai-report/task2/optimization-recommendations-raw.md)       | Có               |
| Review khả thi/ảo giác | [optimization-recommendations-review.md](./ai-report/task2/optimization-recommendations-review.md) | Có               |
| Đề xuất đã lọc         | [optimization-recommendations.md](./docs/test-report/optimization-recommendations.md)              | Có               |

### 4.4. Task 3 — Continuous performance testing

| Thành phần              | Vị trí                                                                                              | Trạng thái                         |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Mô hình theo dõi commit | [continuous-performance-testing.md](./docs/test-report/continuous-performance-testing.md)           | Hoàn thành ở mức đề xuất           |
| Sơ đồ luồng             | [continuous-performance-flowchart.md](./docs/test-report/continuous-performance-flowchart.md)       | Có Mermaid flow chart              |
| Blueprint CI/CLI        | [continuous-performance-ci-blueprint.md](./docs/test-report/continuous-performance-ci-blueprint.md) | GitHub Actions, Bash và JMeter CLI |

### 4.5. AI và Agent Skills

| Thành phần        | Vị trí                                               | Trạng thái                        |
| ----------------- | ---------------------------------------------------- | --------------------------------- |
| AI Audit Report   | [AI_Audit_Report.md](./ai-report/AI_Audit_Report.md) | Có declaration và interaction log |
| AI Critique       | [ai-critique.md](./ai-report/ai-critique.md)         | Có                                |
| Agent Skills      | [`.agents/skills`](./.agents/skills/)                | Bảy skill cùng references         |
| Video Agent Skill | [YouTube](https://youtu.be/MjByvUU5z4k)              | Unlisted, tiếng Việt, 12:33       |
| Git commit log    | [git-commit-log.txt](./git-commit-log.txt)           | Có                                |

## 5. Đối chiếu yêu cầu

| Yêu cầu                                 | Bằng chứng                                          | Trạng thái                         |
| --------------------------------------- | --------------------------------------------------- | ---------------------------------- |
| Ba plan Load/Stress/Spike cùng workflow | Ba JMX và README test plan                          | Hoàn thành                         |
| CSV data-driven                         | `users.csv` và seed script                          | Hoàn thành                         |
| Ba listener/report khác nhau            | View Results Tree, Aggregate Report, Summary Report | Hoàn thành                         |
| Human review JMX                        | Main report Mục 4.5 và test summary                 | Hoàn thành                         |
| JTL, HTML và ảnh tài nguyên             | `tests/2-test-runs`                                 | Hoàn thành                         |
| Báo cáo phần cứng                       | DxDiag và bảng thông số                             | Hoàn thành                         |
| Endurance threshold                     | Soak 130/180/230; baseline 180 VU                   | Hoàn thành                         |
| Video Task 1                            | [YouTube](https://youtu.be/l4fiLiSnpyI)             | Đã xác minh, 22:35                 |
| Issue hiệu năng                         | GitHub Issue #293                                   | Hoàn thành                         |
| AI analysis và misinterpretation hunt   | Raw output, review và phân tích cuối                | Hoàn thành                         |
| Phân loại tối ưu hóa khả thi/ảo giác    | Optimization review                                 | Hoàn thành                         |
| Continuous performance proposal         | Proposal, flow chart, trade-offs và CI blueprint    | Hoàn thành ở mức đề xuất           |
| Agent Skill và video                    | Bảy skill, [video](https://youtu.be/MjByvUU5z4k)    | Hoàn thành                         |
| AI Audit và AI Critique 200–300 từ      | `ai-report`                                         | Critique 283 từ; Audit có 11 entry |
| Git commit log dạng text                | `git-commit-log.txt`                                | Cần làm mới sau commit cuối        |

## 6. Tự đánh giá

| STT | Tiêu chí                                      | Điểm tối đa | Tự đánh giá |
| --: | --------------------------------------------- | ----------: | ----------: |
|   1 | Nhiệm vụ 1 — Load testing                     |          20 |          20 |
|   2 | Nhiệm vụ 1 — Stress testing                   |          20 |          20 |
|   3 | Nhiệm vụ 1 — Spike testing                    |          20 |          20 |
|   4 | Nhiệm vụ 2 — Phân tích AI và săn lỗi hiểu sai |          10 |          10 |
|   5 | Nhiệm vụ 3 — Continuous Performance Testing   |          10 |          10 |
|   6 | Agent Skills                                  |          10 |          10 |
|     | **Tổng**                                      |     **100** |     **100** |

Tổng các thành phần điểm là 90, sử dụng quy tắc tam suất để quy đổi sang thang 100. Điểm tự đánh giá là 100/100.

## 7. Lưu ý kỹ thuật

- Stress và Spike đã thực thi đầy đủ nhưng không được ghi là clean pass; failure là kết quả cần báo cáo, không phải bằng chứng thiếu.
- Spike plan hiện đo sudden start nhưng chưa tách baseline/peak/recovery thành ba phase; giới hạn này được ghi rõ trong báo cáo.
- Soak 12 phút là endurance ngắn theo phạm vi bài, không chứng minh độ bền nhiều giờ.
- Task 3 là đề xuất có thể triển khai; workflow và Bash scripts chưa được tuyên bố là đã chạy thật.
- Khi đóng gói, cần giữ nguyên thư mục ẩn `submission/.agents/skills/` và toàn bộ thư mục HTML report.
