# TC-CART-003: Tăng Số lượng bằng nút "+" → Thành tiền & Tổng cộng cập nhật đúng

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng đang có "Sản phẩm A" (Đơn giá 100,000 ₫) với Số lượng = 1.

### 2. Test Data (Inputs)

- Dòng sản phẩm: `Sản phẩm A`
- Hành động: Bấm nút "+" một lần (Số lượng 1 → 2)

### 3. Test Steps

1. Mở trang Giỏ hàng.
2. Tại dòng "Sản phẩm A", bấm nút "+".

### 4. Expected Result

- Số lượng tăng đúng 1 đơn vị, từ 1 thành 2.
- Thành tiền dòng cập nhật ngay = 100,000 × 2 = 200,000 ₫.
- Tổng cộng cập nhật theo thời gian thực = 200,000 ₫.
