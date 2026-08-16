# HW05 – Performance Testing on EShop

**Mã số sinh viên:** 23127211.
**Họ và tên:** Nguyễn Lê Hồ Anh Khoa.
**Mã bài tập:** HW05-AI.
**Ngày nộp:** 17/08/2026.
**GitHub repo (public, test plan + data file):** [`performance-testing/` @ nhánh `hw05/23127211`](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw05/23127211/performance-testing)

---

## Test Summary Report (theo yêu cầu §14 đề bài)

**Kịch bản đã chạy:** "Khách mới — mua rồi đổi ý" (login → categories → product detail → cart → checkout → cancel), chạy đủ 3 test plan JMeter (bắt buộc: Load/Stress/Spike) + 3 script k6 tương ứng (bonus) + 1 soak test 15 phút (k6, bonus).

**Nhóm endpoint đã phủ:** auth-heavy (`POST /api/login`) · read-heavy (`GET /api/categories`, `GET /api/products/:id`) · transactional (`POST /api/cart`, `POST /api/checkout`, `PUT /api/orders/:id/cancel`).

**Endurance threshold (số cụ thể, đo thật trên `VN1-5CG1041RBP`):**

| Chỉ số                            | Giá trị                                                                                                                                                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Maximum stable RPS                | **23,7 RPS** ở 50 VU, error rate 0,12%, p95 = 50,87ms không tăng dần trong 15 phút                                                                                                                                           |
| Trần throughput tuyệt đối         | **~105 RPS** (đạt ở 313 VU), nhưng p95 đã lên 3 647ms tại mức đó — không dùng được                                                                                                                                           |
| Vùng vận hành an toàn khuyến nghị | **≤ 200 VU / ~90 RPS**                                                                                                                                                                                                       |
| Memory ceiling                    | ~92 MB RSS, ổn định, không tăng đơn điệu về phía backend process — **nhưng có memory leak thật ở tầng ứng dụng** (giỏ hàng in-memory, xem bug bên dưới), chỉ không thấy được qua RSS vì tốc độ rò rỉ quá nhỏ so với nhiễu đo |

**Số bug/performance issue tìm được: 5**, trong đó 2 bug tìm được **trực tiếp nhờ chạy tải** (`found-by:perf-testing`), 3 bug tìm được khi review test plan trước khi chạy (`found-by:code-review`) — xem bảng chi tiết bên dưới.

**Link video demo:** [Link](https://youtu.be/UYUlfVkQ7-U).

Báo cáo chi tiết đầy đủ 3 Task + phân tích: `main-report.md` (cùng thư mục).

---

## Tổng hợp Bug

**Tổng quan:** 1 workflow end-to-end · 6 kịch bản đo (3 JMeter bắt buộc + 3 k6 bonus + 1 soak) · **5 bug tìm được** (0 trùng lặp không giải trình — mọi bug đều đã tra cứu 280+ issue có sẵn trước khi tạo).

### Chi tiết theo nguồn phát hiện

| Nguồn phát hiện                                    | Số bug | Bug ID                                          |
| :------------------------------------------------- | :----: | :---------------------------------------------- |
| `found-by:perf-testing` (nhờ chạy tải thật)        |   2    | BUG-CART-001, BUG-API-001                       |
| `found-by:code-review` (đọc mã nguồn khi thiết kế) |   3    | BUG-LOGIN-005, BUG-PRODUCT-003, BUG-PRODUCT-004 |
| **Tổng cộng**                                      | **5**  |                                                 |

### Bug theo mức độ nghiêm trọng (Severity)

| Severity | Số lượng | Bug ID                                     |
| :------- | :------: | :----------------------------------------- |
| Critical |    1     | BUG-LOGIN-005                              |
| Major    |    3     | BUG-CART-001, BUG-API-001, BUG-PRODUCT-003 |
| Minor    |    1     | BUG-PRODUCT-004                            |
| **Tổng** |  **5**   |                                            |

---

## Bảng tự đánh giá điểm

| STT | Tiêu chí                                                | Điểm tối đa | Điểm tự đánh giá |
| :-: | :------------------------------------------------------ | :---------: | :--------------: |
|  1  | Task 1 — Load testing                                   |     20      |        20        |
|  2  | Task 1 — Stress testing                                 |     20      |        20        |
|  3  | Task 1 — Spike testing                                  |     20      |        20        |
|  4  | Task 2 — AI analysis + misinterpretation hunt           |     10      |        10        |
|  5  | Task 3 — Continuous Performance Testing proposal (G9.6) |     10      |        10        |
|  6  | Agent Skills                                            |     10      |        10        |
|     | **Tổng cộng**                                           |   **90**    |      **90**      |

---

## Demo Agent Skill

4 Agent Skill (`perf-test-designer`, `perf-log-analyzer`, `bug-reporting`, `ai-audit-logger`) dùng xuyên suốt bài — chi tiết vai trò và ví dụ thực tế từng skill: `main-report.md` §4.

Video demo end-to-end (gồm cả phần chạy skill `perf-log-analyzer` trên file `.jtl` thật): [Link](https://youtu.be/UYUlfVkQ7-U).
