# TC-COUPON-DTT-003: Từ chối — mã không tồn tại / không hợp lệ (C1 = N)

**Requirement ID:** FR-09
**Test Type:** Decision Table Testing (DTT) — Rule R9 (C1 sai). Khi C1 = N thì C2, C3, C5 = N/A.

### 1. Preconditions

- User đã đăng nhập, có JWT Token hợp lệ (C4 = Y).
- Mã `INVALID99` **không tồn tại** trong CSDL coupon (hoặc tồn tại nhưng `is_active = 0`) → C1 = N.

### 2. Test Data (Inputs)

- `code`: `INVALID99` (không có trong bảng coupon)
- `total`: `400,000 ₫` (bất kỳ giá trị hợp lệ; không ảnh hưởng vì C1 đã sai)
- `JWT Token`: hợp lệ

### 3. Test Steps

1. Đăng nhập, thêm sản phẩm vào giỏ (`total = 400,000 ₫`).
2. Tại bước Checkout, nhập mã `INVALID99`.
3. Bấm "Áp dụng mã".

### 4. Expected Result

- Hệ thống **không áp dụng** giảm giá; giữ nguyên `total = 400,000 ₫`.
- Trả về thông báo lỗi **"mã không hợp lệ / không tồn tại"**.
