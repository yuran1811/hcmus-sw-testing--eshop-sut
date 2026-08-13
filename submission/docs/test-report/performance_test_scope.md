# Performance Test Scope — EShop

> **Base URL:** `http://localhost:3000`
> **Generated:** 2026-08-13 14:20
> **Workflow:** Checkout with Coupon (Luồng mua hàng có áp dụng mã giảm giá)

---

## Endpoint Map

| Category      | Method | Path                        | Purpose                                                        |
| :------------ | :----- | :-------------------------- | :------------------------------------------------------------- |
| auth-heavy    | POST   | `/api/login`                | Xác thực người dùng, lấy JWT token                            |
| read-heavy    | GET    | `/api/categories`           | Lấy danh sách danh mục để chọn ngữ cảnh duyệt sản phẩm       |
| read-heavy    | GET    | `/api/products?search=`     | Tìm kiếm sản phẩm theo từ khoá trong CSV                      |
| transactional | POST   | `/api/cart`                 | Thêm sản phẩm vào giỏ hàng (ghi trạng thái)                   |
| transactional | POST   | `/api/apply-coupon`         | Tính toán giá trị đơn hàng sau khi áp mã giảm giá             |
| transactional | POST   | `/api/checkout`             | Đặt hàng — điểm transactional cuối, sinh đơn hàng mới        |
| read-heavy    | GET    | `/api/orders/my-orders`     | Xác nhận đơn hàng vừa tạo thành công, đọc lịch sử đơn hàng   |

---

## End-to-End Workflow

### Step 1 — Đăng nhập `[auth-heavy]`

```
POST /api/login
Header:  Content-Type: application/json
Body:    { "email": "${email}", "password": "${password}" }
Input:   ${email}, ${password} từ CSV (users.csv)
Produces: ${access_token}  (trường "token" trong response JSON)
         ${user_id}         (trường "user.id" trong response JSON)
Expects: 200 OK
```

> **Lưu ý cho JMeter/k6:** Dùng Regular Expression Extractor hoặc `json()` để trích `token` từ body response và lưu vào biến `access_token`.

---

### Step 2 — Lấy danh sách danh mục `[read-heavy]`

```
GET /api/categories
Header:  (không bắt buộc auth theo spec; kiểm tra lại khi chạy thực tế)
Input:   không có
Produces: ${category_name}  (chọn bất kỳ một category để log/kiểm tra)
Expects: 200 OK
```

> **Mục đích hiệu năng:** Đo tải khi nhiều VU đồng thời tải trang chủ/danh mục — API này không có auth nên sẽ chịu tải cao nhất.

---

### Step 3 — Tìm kiếm sản phẩm `[read-heavy]`

```
GET /api/products?search=${keyword}
Header:  (không bắt buộc auth)
Input:   ${keyword} từ CSV (keywords.csv) — VD: "áo", "giày", "túi"
Produces: ${product_id}    (trường "id" của sản phẩm đầu tiên trong mảng response)
          ${product_name}  (tên sản phẩm)
          ${product_price} (giá sản phẩm — dùng ở bước checkout)
Expects: 200 OK
```

> **Lưu ý:** Response là mảng JSON, trích phần tử `[0].id`, `[0].price`.

---

### Step 4 — Thêm vào giỏ hàng `[transactional]`

```
POST /api/cart
Header:  Authorization: Bearer ${access_token}
         Content-Type: application/json
Body:    {
           "id":       ${product_id},
           "name":     "${product_name}",
           "price":    ${product_price},
           "quantity": ${quantity}
         }
Input:   ${product_id}, ${product_name}, ${product_price} từ Step 3
         ${quantity} từ CSV (VD: 1 hoặc 2)
Produces: (server ghi cart vào session/DB; response 2xx)
Expects: 200 OK (theo spec, body là giỏ hàng đã cập nhật)
```

---

### Step 5 — Áp dụng mã giảm giá `[transactional]`

```
POST /api/apply-coupon
Header:  Content-Type: application/json
         (spec không yêu cầu auth nhưng có trường user_id trong body)
Body:    {
           "code":         "${coupon_code}",
           "total_amount": ${cart_total},
           "user_id":      ${user_id}
         }
Input:   ${coupon_code} từ CSV (VD: "SAVE10")
         ${cart_total}   = ${product_price} * ${quantity}  (tính trong script)
         ${user_id}      từ Step 1
Produces: ${discount_amount}
          ${final_amount}  (dùng làm total_amount ở bước checkout)
Expects: 200 OK
```

---

### Step 6 — Đặt hàng (Checkout) `[transactional]`

```
POST /api/checkout
Header:  Authorization: Bearer ${access_token}
         Content-Type: application/json
Body:    {
           "total_amount":      ${final_amount},
           "shipping_address":  "${shipping_address}"
         }
Input:   ${final_amount}      từ Step 5
         ${shipping_address}  từ CSV (VD: "123 Lê Lợi, Q1, TP.HCM")
Produces: ${order_id}  (trường "id" trong response JSON — nếu server trả về)
Expects: 201 Created  (hoặc 200 OK — xác nhận lại bằng Postman trước khi test)
```

> ⚠️ **Điểm transactional cuối quan trọng nhất.** Đây là endpoint tạo đơn hàng thật trong DB. Mỗi VU tạo 1 đơn hàng → **cần chiến lược dọn dẹp dữ liệu sau mỗi run** (xem Edge Case Notes).

---

### Step 7 — Xem lịch sử đơn hàng `[read-heavy]`

```
GET /api/orders/my-orders
Header:  Authorization: Bearer ${access_token}
Input:   ${access_token} từ Step 1
Produces: (xác nhận đơn vừa tạo xuất hiện trong danh sách)
Expects: 200 OK
```

> **Mục đích:** Bước này hoàn thiện vòng lặp E2E và kiểm tra khả năng phục vụ truy vấn đọc sau một chuỗi ghi nặng.

---

## Variables and Dependencies

| Biến               | Nguồn                                    | Dùng tại bước          |
| :----------------- | :--------------------------------------- | :--------------------- |
| `${email}`         | CSV: `users.csv` (cột `email`)           | Step 1                 |
| `${password}`      | CSV: `users.csv` (cột `password`)        | Step 1                 |
| `${access_token}`  | Response Step 1 → trường `token`         | Step 4, 6, 7           |
| `${user_id}`       | Response Step 1 → trường `user.id`       | Step 5                 |
| `${keyword}`       | CSV: `keywords.csv` (cột `keyword`)      | Step 3                 |
| `${product_id}`    | Response Step 3 → `[0].id`              | Step 4                 |
| `${product_name}`  | Response Step 3 → `[0].name`            | Step 4                 |
| `${product_price}` | Response Step 3 → `[0].price`           | Step 4, 5              |
| `${quantity}`      | CSV: `users.csv` (cột `quantity`)        | Step 4, 5              |
| `${cart_total}`    | Tính: `product_price × quantity`         | Step 5                 |
| `${coupon_code}`   | CSV: `users.csv` (cột `coupon_code`)     | Step 5                 |
| `${final_amount}`  | Response Step 5 → `final_amount`         | Step 6                 |
| `${shipping_address}` | CSV: `users.csv` (cột `shipping_address`) | Step 6             |
| `${order_id}`      | Response Step 6 → `id` (nếu có)         | (Tuỳ chọn — dùng để verify) |

---

## Edge Case Notes

### 1. Account Lockout (Khóa tài khoản)
- **Hiện trạng:** Theo spec, có endpoint `POST /api/forgot-password` → hệ thống có cơ chế reset mật khẩu, ngụ ý có thể có lockout sau N lần đăng nhập sai.
- **Rủi ro:** Nếu JMeter gửi password sai (lỗi CSV, biến rỗng), account bị khóa → toàn bộ VU dùng account đó fail.
- **Biện pháp:** 
  - Chuẩn bị CSV với số lượng account đủ lớn (≥ VU_count × số_lần_lặp).
  - Validate CSV trước khi run để đảm bảo không có giá trị rỗng.
  - Sử dụng `perf-data-generator` skill để sinh `users.csv`.

### 2. Rate Limiting
- **Hiện trạng:** Spec không đề cập rate limiting. Cần chạy thử với 10–20 VU để quan sát HTTP 429.
- **Biện pháp:** Nếu xuất hiện 429, thêm `sleep(1)` hoặc `Timer` giữa các request.

### 3. Token Expiry (Hết hạn JWT)
- **Hiện trạng:** Spec không ghi rõ TTL của token. JWT thường expire sau 1–24h.
- **Biện pháp:** Nếu test chạy lâu (> 30 phút trong stress/endurance test), cần thêm bước refresh hoặc re-login trong script. Kiểm tra trường `exp` trong JWT payload để biết TTL thực tế.

### 4. Stateful Side Effects (Tích lũy dữ liệu)
- **Vấn đề:** Mỗi lần chạy test, `POST /api/checkout` tạo 1 đơn hàng thật trong DB. Sau N VU × M vòng lặp, sẽ có rất nhiều đơn hàng rác.
- **Chiến lược dọn dẹp:**
  - Dùng tài khoản test riêng biệt (không dùng production accounts).
  - Sau mỗi test run, chạy script SQL xóa đơn hàng có `created_at` trong khoảng thời gian test.
  - Hoặc: admin endpoint `PUT /api/admin/orders/:id/status` để hủy đơn → không xóa nhưng tránh ảnh hưởng business logic.

### 5. POST /api/apply-coupon — Giới hạn sử dụng coupon
- **Vấn đề:** Theo spec, coupon có thể có trường `max_uses_per_user`. Nếu giới hạn là 1 lần/user, sau lần đầu coupon sẽ bị từ chối.
- **Biện pháp:** 
  - Dùng coupon không giới hạn (liên hệ admin tạo loại coupon test với `max_uses_per_user` = 999).
  - Hoặc bỏ qua step apply-coupon, dùng `total_amount` thô từ cart.

---

## Non-overlap Statement

Luồng này được phân biệt bởi:

1. **Điểm transactional cuối:** `POST /api/checkout` — luồng checkout có coupon. Nếu teammate test `POST /api/checkout` không có coupon (bỏ qua Step 5), hai luồng vẫn khác nhau ở business logic (giá cuối tính bởi coupon vs. giá gốc).
2. **Bước đặc trưng:** `POST /api/apply-coupon` — endpoint này chỉ có trong luồng này.
3. **Phân loại bước đọc:** Bao gồm `GET /api/categories` — bước này ít phổ biến trong các luồng khác thường bắt đầu từ tìm kiếm trực tiếp.

> ⚠️ Nếu có teammate cũng dùng `POST /api/checkout`, hãy phân biệt bằng: khác keyword tìm kiếm sản phẩm, khác danh mục, hoặc khác loại coupon.
