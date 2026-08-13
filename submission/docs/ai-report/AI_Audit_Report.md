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

---

### Entry 3

- **Tool:** Antigravity (Gemini 2.5 Pro)
- **Date/time:** 2026-08-13 15:30
- **Task context:** JMeter Test Plan Generation — Thiết kế và sinh 3 file JMX (Load, Stress, Spike) cho luồng E2E Checkout with Coupon theo skill `perf-testplan-generator`
- **Prompt used (verbatim):**
  > Sử dụng skill perf-testplan-generator để thiết kế test plan sử dụng Jmeter, sử dụng data tại submission/tests/1-test-plans/checkout-with-coupon/test-data để thực hiện cho luồng performance_test_scope.md, viết vào trong submission/tests/1-test-plans/checkout-with-coupon và log lại trong submission/docs/ai-report/AI_Audit_Report.md
- **AI output (faithful summary):**
  > AI đọc JMeter XML reference, HW05 requirements, và perf-scope.md để thiết kế 3 JMX file:
  > - **Load** (`23127115_Load_20260813.jmx`): 50 VUs, 120s ramp, 600s steady, think-time mean=2000ms±300ms, listener: View Results Tree → `results/load.jtl`.
  > - **Stress** (`23127115_Stress_20260813.jmx`): 200 VUs, 600s ramp, 1200s total, think-time mean=1000ms±200ms, listener: Aggregate Report → `results/stress.jtl`.
  > - **Spike** (`23127115_Spike_20260813.jmx`): 100 VUs, 10s ramp, 60s delay, 480s total, think-time mean=500ms±100ms, listener: Summary Report → `results/spike.jtl`.
  > Mỗi JMX thực hiện đủ 7 bước: Login (auth-heavy) → Categories (read) → Products?search= (read) → Cart (transactional) → Apply-Coupon (transactional) → Checkout (transactional) → My-Orders (read). CSV `test-data/users.csv` được bind qua CSVDataSet với 7 biến. JSONPath extractors truyền `access_token`, `user_id`, `product_id_resp`, `product_price`, `product_name`, `final_amount`, `order_id` xuyên suốt workflow. Mỗi bước có ResponseAssertion (status code) và DurationAssertion riêng.
- **What the student changed/kept from this output:**
  - **Giữ nguyên:** Toàn bộ cấu trúc 7-step, CSV binding, JSONPath extraction chain, 3 listener khác nhau trên 3 file.
  - **Cần xác minh thủ công trước khi chạy:**
    1. `POST /api/checkout` trả về 200 hay 201? Assertion hiện tại dùng test_type=40 (OR) cho cả 200 và 201.
    2. JSON path `$.token` (login response) và `$.user.id` — cần verify với Postman/curl thực tế vì spec không rõ cấu trúc response.
    3. `POST /api/cart` payload format `{id, name, price, quantity}` — cần xác minh với backend source code.
    4. Stress test dùng ThreadGroup tuyến tính (+1 VU/3s); AI không đề xuất stepped ramp-up (Stepping Thread Group plugin). Đây là hạn chế: cần plugin Ultimate Thread Group cho stepped approach thực tế hơn.
    5. Think time Spike 500ms có thể quá thấp so với thực tế nhưng phù hợp để mô phỏng burst traffic.

