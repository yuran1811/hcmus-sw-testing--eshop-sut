# TC-COUPON-DTT-007: Từ chối — đã dùng hết lượt cho phép (chỉ C5 = N, usage_count = max)

**Requirement ID:** FR-09
**Test Type:** Decision Table Testing (DTT) — Rule R2 (chỉ C5 sai). BVA: `user_usage_count = max_uses_per_user` (biên `<` phải bị từ chối).

### 1. Preconditions

- User đã đăng nhập, có JWT Token hợp lệ (C4 = Y).
- Coupon `SAVE10` tồn tại và `is_active = 1` (C1 = Y): `min_order_amount = 300,000 ₫`, `expired_at = 2099-12-31` (C2 = Y), `max_uses_per_user = 1`.
- User **đã dùng** `SAVE10` đúng 1 lần trước đó → `user_usage_count = 1 = max_uses_per_user` (C5 = N vì điều kiện dùng `<`).

### 2. Test Data (Inputs)

- `code`: `SAVE10`
- `total`: `400,000 ₫` (≥ `min_order_amount = 300,000` → C3 = Y, để cô lập đúng lỗi C5)
- `JWT Token`: hợp lệ

### 3. Test Steps

1. Đăng nhập bằng tài khoản đã dùng `SAVE10` đúng 1 lần (`user_usage_count = 1`).
2. Thêm sản phẩm vào giỏ (`total = 400,000 ₫`).
3. Tại bước Checkout, nhập lại mã `SAVE10` và bấm "Áp dụng mã".

### 4. Expected Result

- Hệ thống **không áp dụng** giảm giá; giữ nguyên `total = 400,000 ₫`.
- Trả về thông báo lỗi **"đã dùng hết lượt cho phép"** (chỉ C5 sai; `usage_count = max` chạm biên bị từ chối).
