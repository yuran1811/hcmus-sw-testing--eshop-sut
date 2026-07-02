# FR-09: Mã Giảm Giá (Coupon)

- **Module:** `COUPON`
- **Requirement ID:** `FR-09`
- **Related:** `FR-08` (Checkout) — coupon được áp dụng tại bước thanh toán.

## Input Fields

| Field             | Data Type        | Constraints                                              | Notes                                                                                  |
| ----------------- | ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `code`            | String           | Bắt buộc; là mã coupon người dùng nhập tại bước checkout | So khớp với cột `code` trong CSDL (kiểm tra phân biệt hoa/thường tùy theo triển khai)   |
| `total`           | Number (₫)       | >= 0; do **backend tính lại** từ giỏ hàng (theo FR-08)  | Không nhận từ client; dùng để so sánh với `min_order_amount`                            |
| `JWT Token`       | String (header)  | Bắt buộc, hợp lệ                                         | Gửi qua `Authorization: Bearer <token>`; xác định user đã đăng nhập (điều kiện C4)      |

### Thuộc tính của coupon trong CSDL (State Variables)

| Field                | Data Type       | Constraints           | Notes                                                       |
| -------------------- | --------------- | --------------------- | ---------------------------------------------------------- |
| `is_active`          | Boolean (0/1)   | —                     | C1: mã phải đang hoạt động (`is_active = 1`)               |
| `expired_at`         | Date            | —                     | C2: ngày hiện tại phải **trước** `expired_at`             |
| `min_order_amount`   | Number (₫)      | >= 0                  | C3: yêu cầu `total >= min_order_amount`                    |
| `type`               | Enum            | `percent` \| `fixed`  | Quyết định công thức tính giảm giá                          |
| `discount_value`     | Number          | > 0                   | Là % nếu `percent`, là số tiền (₫) nếu `fixed`            |
| `max_uses_per_user`  | Integer         | >= 1                  | C5: số lần dùng tối đa cho mỗi user                        |
| `user_usage_count`   | Integer         | >= 0                  | Số lần user hiện tại đã dùng mã này                        |

## Business Rules

Coupon chỉ được áp dụng khi **cả 5 điều kiện C1–C5 đồng thời thỏa mãn** (quan hệ AND):

- **C1 — Mã tồn tại & active:** `code` có trong CSDL và `is_active = 1`.
- **C2 — Còn hạn sử dụng:** ngày hiện tại < `expired_at`.
- **C3 — Đủ ngưỡng đơn hàng:** `total >= min_order_amount` (lớn hơn **hoặc bằng**).
- **C4 — Đã đăng nhập:** request có JWT Token hợp lệ.
- **C5 — Chưa dùng hết lượt:** `user_usage_count < max_uses_per_user`.

**Công thức tính giảm giá:**

- `type = percent`: `discount_amount = total × discount_value / 100`
- `type = fixed`: `discount_amount = discount_value`
- `final_amount = total − discount_amount`

**Ghi chú ranh giới quan trọng (phục vụ BVA):**

- C3 dùng `>=` → giá trị biên `total = min_order_amount` phải **được chấp nhận**.
- C2: thời điểm đúng bằng `expired_at` cần làm rõ — thông thường coi là đã hết hạn.
- C5 dùng `<` → khi `user_usage_count = max_uses_per_user` phải **bị từ chối**.

**Mã giảm giá mẫu trong hệ thống (theo README):**

| Mã        | Loại    | Giá trị   | Ngưỡng tối thiểu | Hạn dùng   | Số lần/người |
| --------- | ------- | --------- | ---------------- | ---------- | ------------ |
| `SAVE10`  | percent | 10%       | 300,000 ₫        | 2099-12-31 | 1            |
| `BIGBUY`  | fixed   | 50,000 ₫  | 500,000 ₫        | 2099-12-31 | 1            |
| `VIP100`  | fixed   | 100,000 ₫ | 300,000 ₫        | 2099-12-31 | 2            |
| `EXPIRED` | percent | 20%       | 100,000 ₫        | 2020-01-01 | 1            |

## Expected Outcomes

- _Success:_ Cả 5 điều kiện C1–C5 đều thỏa → hệ thống chấp nhận mã, tính `discount_amount` đúng theo `type`, trả về `final_amount = total − discount_amount`, và (tại checkout) cập nhật tổng tiền theo `final_amount`.
- _Failure:_ Bất kỳ điều kiện nào sai → không áp dụng giảm giá, giữ nguyên `total`, và trả về thông báo lỗi tương ứng:
  - C1 sai (mã không tồn tại hoặc `is_active = 0`) → lỗi "mã không hợp lệ / không tồn tại".
  - C2 sai (đã quá `expired_at`) → lỗi "mã đã hết hạn".
  - C3 sai (`total < min_order_amount`) → lỗi "chưa đạt giá trị đơn hàng tối thiểu".
  - C4 sai (không có hoặc sai JWT Token) → lỗi yêu cầu đăng nhập (HTTP 401).
  - C5 sai (`user_usage_count >= max_uses_per_user`) → lỗi "đã dùng hết lượt cho phép".
