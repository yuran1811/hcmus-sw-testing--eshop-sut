# TC-COUPON-DTT-004: Từ chối — mã đã hết hạn (chỉ C2 = N)

**Requirement ID:** FR-09
**Test Type:** Decision Table Testing (DTT) — Rule R5 (chỉ C2 sai, cô lập để message xác định)

### 1. Preconditions

- User đã đăng nhập, có JWT Token hợp lệ (C4 = Y).
- Coupon `EXPIRED` tồn tại và `is_active = 1` (C1 = Y): `type = percent`, `discount_value = 20`, `min_order_amount = 100,000 ₫`, `expired_at = 2020-01-01` → **đã quá hạn** so với ngày hiện tại (C2 = N).
- User chưa dùng hết lượt `EXPIRED` → `user_usage_count = 0 < max = 1` (C5 = Y).

### 2. Test Data (Inputs)

- `code`: `EXPIRED`
- `total`: `200,000 ₫` (≥ `min_order_amount = 100,000` → C3 = Y, để cô lập đúng lỗi C2)
- `JWT Token`: hợp lệ

### 3. Test Steps

1. Đăng nhập, thêm sản phẩm vào giỏ (`total = 200,000 ₫`).
2. Tại bước Checkout, nhập mã `EXPIRED`.
3. Bấm "Áp dụng mã".

### 4. Expected Result

- Hệ thống **không áp dụng** giảm giá; giữ nguyên `total = 200,000 ₫`.
- Trả về thông báo lỗi **"mã đã hết hạn"** (vì chỉ C2 sai, các điều kiện còn lại đều thỏa).
