# TC-CART-001: Thêm sản phẩm chưa có trong giỏ → tạo dòng mới

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng hiện chưa chứa "Sản phẩm A".
- "Sản phẩm A" có Đơn giá 100,000 ₫.

### 2. Test Data (Inputs)

- Sản phẩm: `Sản phẩm A` (Đơn giá 100,000 ₫)
- Hành động: Thêm vào giỏ với Số lượng 1

### 3. Test Steps

1. Mở trang chi tiết "Sản phẩm A".
2. Bấm "Thêm vào giỏ hàng".
3. Mở trang Giỏ hàng.

### 4. Expected Result

- Giỏ hàng có đúng 1 dòng mới cho "Sản phẩm A", Số lượng = 1.
- Hiển thị đủ các cột: Sản phẩm, Đơn giá, Số lượng (kèm nút +/-), Thành tiền, Thao tác.
- Thành tiền dòng = 100,000 ₫; Tổng cộng = 100,000 ₫.
