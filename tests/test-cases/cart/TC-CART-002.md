# TC-CART-002: Thêm lại sản phẩm đã có trong giỏ → tăng số lượng, không tạo dòng trùng

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng đang có "Sản phẩm A" (Đơn giá 100,000 ₫) với Số lượng = 1.

### 2. Test Data (Inputs)

- Sản phẩm: `Sản phẩm A`
- Hành động: Thêm vào giỏ thêm 1 lần nữa

### 3. Test Steps

1. Mở trang chi tiết "Sản phẩm A".
2. Bấm "Thêm vào giỏ hàng".
3. Mở trang Giỏ hàng.

### 4. Expected Result

- Giỏ hàng vẫn chỉ có đúng 1 dòng cho "Sản phẩm A" (không tạo dòng thứ hai).
- Số lượng dòng "Sản phẩm A" tăng thành 2.
- Thành tiền dòng = 200,000 ₫; Tổng cộng = 200,000 ₫.
