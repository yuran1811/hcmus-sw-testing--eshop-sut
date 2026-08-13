# AI Audit Report — HW5 Performance Testing

> **Declaration:** I use AI tools for the following tasks.

---

### Entry 1

- **Tool:** Antigravity (Gemini / Claude Sonnet)
- **Date/time:** 2026-08-13 14:20
- **Task context:** Perf Scope Planning — phân tích API EShop và thiết kế luồng E2E kiểm thử hiệu năng
- **Prompt used (verbatim):**
  > tôi muốn test POST /api/login, GET /api/categories → GET /api/products?search=	, POST /api/cart → POST /api/apply-coupon → POST /api/checkout → GET /api/orders/my-orders, bạn hãy sử dụng @perf-scope-planner phân tích xem các api này thuộc về phạm vi gì và luồng test như thế nào, chi tiết về các api nào trong @api_specification.md, lên kế hoạch để tôi có thể test được hiệu năng một cách phù hợp và chuẩn nhất, các api trên thành luồng E2E chi tiết cho việc test hiệu năng hệ thống.
- **AI output (faithful summary):**
  > AI đọc `api_specification.md` và SKILL `perf-scope-planner`, phân loại 7 endpoints vào 3 nhóm (auth-heavy / read-heavy / transactional), thiết kế luồng 7 bước E2E tuần tự với dependency tracking đầy đủ (biến truyền qua các bước), ghi chú edge cases gồm: account lockout, rate limiting, JWT expiry, stateful side effects từ checkout, coupon usage limit. Xuất ra file `submission/docs/performance_test_scope.md`.
- **What the student changed/kept from this output:** Giữ nguyên toàn bộ cấu trúc và nội dung scope document. Cần tự xác nhận lại response code thực tế của `POST /api/checkout` (spec ghi không rõ 200 hay 201) bằng Postman trước khi viết assertion trong JMeter.
