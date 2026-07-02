# TC-COUPON-DTT-005: Từ chối — chưa đạt ngưỡng đơn hàng (chỉ C3 = N, total = min − 1)

**Requirement ID:** FR-09
**Test Type:** Decision Table Testing (DTT) — Rule R3 (chỉ C3 sai). BVA: `total` ngay dưới biên `min_order_amount`.

### 1. Preconditions

- User đã đăng nhập, có JWT Token hợp lệ (C4 = Y).
- Coupon `SAVE10` tồn tại và `is_active = 1` (C1 = Y): `min_order_amount = 300,000 ₫`, `expired_at = 2099-12-31` (C2 = Y).
- User chưa dùng hết lượt `SAVE10` → `user_usage_count = 0 < max = 1` (C5 = Y).

### 2. Test Data (Inputs)

- `code`: `SAVE10`
- `total`: `299,999 ₫` (= `min_order_amount − 1` → **ngay dưới biên**, C3 = N vì điều kiện dùng `>=`)
- `JWT Token`: hợp lệ

### 3. Test Steps

1. Đăng nhập, thêm sản phẩm vào giỏ sao cho `total = 299,999 ₫`.
2. Tại bước Checkout, nhập mã `SAVE10`.
3. Bấm "Áp dụng mã".

### 4. Expected Result

- Hệ thống **không áp dụng** giảm giá; giữ nguyên `total = 299,999 ₫`.
- Trả về thông báo lỗi **"chưa đạt giá trị đơn hàng tối thiểu"** (chỉ C3 sai).
