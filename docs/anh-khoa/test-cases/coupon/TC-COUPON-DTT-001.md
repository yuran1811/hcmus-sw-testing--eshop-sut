# TC-COUPON-DTT-001: Áp mã thành công — type `percent`, total chạm biên dưới (= min_order_amount)

**Requirement ID:** FR-09
**Test Type:** Decision Table Testing (DTT) — Rule R1 (Success), nhánh `type = percent`, biên C3 (`total = min_order_amount`)

### 1. Preconditions

- User đã đăng nhập, có JWT Token hợp lệ (C4 = Y).
- Coupon `SAVE10` tồn tại và `is_active = 1` (C1 = Y): `type = percent`, `discount_value = 10`, `min_order_amount = 300,000 ₫`, `expired_at = 2099-12-31` (C2 = Y).
- User **chưa từng** dùng `SAVE10` → `user_usage_count = 0 < max_uses_per_user = 1` (C5 = Y).

### 2. Test Data (Inputs)

- `code`: `SAVE10`
- `total`: `300,000 ₫` (backend tính lại từ giỏ; **đúng bằng** `min_order_amount` → biên C3 hợp lệ, C3 = Y)
- `JWT Token`: hợp lệ

### 3. Test Steps

1. Đăng nhập, thêm sản phẩm vào giỏ sao cho `total = 300,000 ₫`.
2. Tại bước Checkout, nhập mã `SAVE10`.
3. Bấm "Áp dụng mã".

### 4. Expected Result

- Hệ thống **chấp nhận** mã (cả 5 điều kiện C1–C5 thỏa).
- `discount_amount = total × discount_value / 100 = 300,000 × 10 / 100 = 30,000 ₫`.
- `final_amount = total − discount_amount = 300,000 − 30,000 = 270,000 ₫`.
- Tổng tiền tại checkout cập nhật theo `final_amount = 270,000 ₫`.
