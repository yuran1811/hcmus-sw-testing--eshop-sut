# AI Audit Report — HW5 Performance Testing

> **Declaration:** I use AI tools for the following tasks.

---

### Entry 1

- **Tool:** Antigravity (Gemini / Claude Sonnet)
- **Date/time:** 2026-08-13 14:20
- **Task context:** Perf Scope Planning — phân tích API EShop và thiết kế luồng E2E kiểm thử hiệu năng
- **Prompt used (verbatim):**
  > tôi muốn test POST /api/login, GET /api/categories → GET /api/products?search= , POST /api/cart → POST /api/apply-coupon → POST /api/checkout → GET /api/orders/my-orders, bạn hãy sử dụng @perf-scope-planner phân tích xem các api này thuộc về phạm vi gì và luồng test như thế nào, chi tiết về các api nào trong @api_specification.md, lên kế hoạch để tôi có thể test được hiệu năng một cách phù hợp và chuẩn nhất, các api trên thành luồng E2E chi tiết cho việc test hiệu năng hệ thống.
- **AI output (faithful summary):**
  > AI đọc `api_specification.md` và SKILL `perf-scope-planner`, phân loại 7 endpoints vào 3 nhóm (auth-heavy / read-heavy / transactional), thiết kế luồng 7 bước E2E tuần tự với dependency tracking đầy đủ (biến truyền qua các bước), ghi chú edge cases gồm: account lockout, rate limiting, JWT expiry, stateful side effects từ checkout, coupon usage limit. Xuất ra file `submission/docs/performance_test_scope.md`.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ cấu trúc và nội dung scope document. Cần tự xác nhận lại response code thực tế của `POST /api/checkout` (spec ghi không rõ 200 hay 201) bằng Postman trước khi viết assertion trong JMeter.

---

### Entry 2

- **Tool:** Antigravity (Claude Sonnet)
- **Date/time:** 2026-08-13 14:45
- **Task context:** Perf Data Generation — Thiết kế và sinh dữ liệu test CSV theo skill `perf-data-generator`
- **Prompt used (verbatim):**
  > Sử dụng skill perf-data-generator để thiết kế và sinh dữ liệu test gồm các file users.csv và keywords.csv phục vụ cho luồng E2E tại performance_test_scope.md. Hãy lưu các file CSV này vào thư mục test-data. Đọc kĩ README.md để gen data sao cho phù hợp, các data này sẽ được sử dụng để insert vào db để sử dụng test hiệu năng.
- **AI output (faithful summary):**
  > AI phân tích README (lockout threshold = 3 lần sai, password policy, coupon constraints), tính toán sizing: 200 VU × 1.5x safety = 300 rows. Thiết kế `users.csv` với 7 cột (email, password, product_id, keyword, quantity, coupon_code, shipping_address) và phân phối coupon theo nhóm (SAVE10: rows 1-100, VIP100: 101-200, BIGBUY: 201-300). Sinh `keywords.csv` với 5 keywords khớp sản phẩm thực trong DB. Viết script `backend/seed_perf_users.js` insert thẳng vào SQLite, xuất lockout reset command.
- **What the student changed/kept from this output:** Quyết định tạo thêm một coupon kiểm thử chuyên dụng tên `PERFTEST` có thuộc tính `max_uses_per_user = 9999` (không giới hạn lượt sử dụng) và chèn thẳng vào database. Cập nhật script `seed_perf_users.js` để toàn bộ 300 tài khoản trong file `users.csv` sử dụng coupon này nhằm đảm bảo tính ổn định của luồng giao dịch khi test hiệu năng nhiều iterations. Sau đó, thay vì để script tự sinh file coupon, em đã điều chỉnh để tạo sẵn file `coupons.csv` thủ công trong thư mục `test-data/`, rồi di chuyển và cập nhật script thành `submission/tests/1-test-plans/checkout-with-coupon/seed_perf_users.js` để thực hiện việc đọc dữ liệu coupon từ file CSV có sẵn này và đồng bộ vào SQLite DB.
