# TC-COUPON-DTT-006: Từ chối — chưa đăng nhập / thiếu JWT (C4 = N → HTTP 401)

**Requirement ID:** FR-09
**Test Type:** Decision Table Testing (DTT) — Rule R10 (C4 sai). Khi C4 = N thì C1, C2, C3, C5 = N/A (chưa qua tầng auth).

### 1. Preconditions

- Người dùng **chưa đăng nhập** hoặc gửi request **không kèm** `Authorization: Bearer <token>` (hoặc token sai/hết hạn) → C4 = N.
- (Các thuộc tính coupon không cần thiết lập vì request bị chặn ở tầng auth trước khi kiểm coupon.)

### 2. Test Data (Inputs)

- `code`: `SAVE10` (mã hợp lệ — nhưng không tới bước kiểm vì thiếu auth)
- `total`: `400,000 ₫`
- `JWT Token`: **không gửi** (hoặc token không hợp lệ)

### 3. Test Steps

1. Tạo request áp mã coupon tại Checkout **mà không** đính kèm JWT Token hợp lệ.
2. Gửi request áp mã `SAVE10`.

### 4. Expected Result

- Hệ thống **từ chối** với **HTTP 401**, kèm thông báo **yêu cầu đăng nhập**.
- Không áp dụng giảm giá; không tính `discount_amount`.
