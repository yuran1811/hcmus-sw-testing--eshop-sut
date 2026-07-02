# TC-COUPON-DTT-002: Áp mã thành công — type `fixed`, total chạm biên dưới (= min_order_amount)

**Requirement ID:** FR-09
**Test Type:** Decision Table Testing (DTT) — Rule R1 (Success), nhánh `type = fixed`, biên C3 (`total = min_order_amount`)

### 1. Preconditions

- User đã đăng nhập, có JWT Token hợp lệ (C4 = Y).
- Coupon `BIGBUY` tồn tại và `is_active = 1` (C1 = Y): `type = fixed`, `discount_value = 50,000 ₫`, `min_order_amount = 500,000 ₫`, `expired_at = 2099-12-31` (C2 = Y).
- User **chưa từng** dùng `BIGBUY` → `user_usage_count = 0 < max_uses_per_user = 1` (C5 = Y).

### 2. Test Data (Inputs)

- `code`: `BIGBUY`
- `total`: `500,000 ₫` (**đúng bằng** `min_order_amount` → biên C3 hợp lệ, C3 = Y)
- `JWT Token`: hợp lệ

### 3. Test Steps

1. Đăng nhập, thêm sản phẩm vào giỏ sao cho `total = 500,000 ₫`.
2. Tại bước Checkout, nhập mã `BIGBUY`.
3. Bấm "Áp dụng mã".

### 4. Expected Result

- Hệ thống **chấp nhận** mã (cả 5 điều kiện C1–C5 thỏa).
- `discount_amount = discount_value = 50,000 ₫` (công thức `fixed`).
- `final_amount = total − discount_amount = 500,000 − 50,000 = 450,000 ₫`.
- Tổng tiền tại checkout cập nhật theo `final_amount = 450,000 ₫`.
