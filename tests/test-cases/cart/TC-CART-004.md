# TC-CART-004: Giảm Số lượng bằng nút "-" khi đang > 1 (chạm biên dưới hợp lệ = 1)

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng đang có "Sản phẩm A" (Đơn giá 100,000 ₫) với Số lượng = 2.

### 2. Test Data (Inputs)

- Dòng sản phẩm: `Sản phẩm A`
- Hành động: Bấm nút "-" một lần (Số lượng 2 → 1)

### 3. Test Steps

1. Mở trang Giỏ hàng.
2. Tại dòng "Sản phẩm A", bấm nút "-".

### 4. Expected Result

- Số lượng giảm đúng 1 đơn vị, từ 2 về 1 (giá trị biên dưới hợp lệ).
- Thành tiền dòng cập nhật = 100,000 × 1 = 100,000 ₫.
- Tổng cộng cập nhật = 100,000 ₫.
- Dòng sản phẩm vẫn tồn tại trong giỏ (không bị xóa).
