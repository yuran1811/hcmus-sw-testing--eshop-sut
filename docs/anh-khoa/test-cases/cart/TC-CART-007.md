# TC-CART-007: Xóa sản phẩm và xác nhận dialog → dòng bị xóa, Tổng cộng cập nhật

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng đang có 2 dòng: "Sản phẩm A" (100,000 ₫) và "Sản phẩm B" (50,000 ₫), mỗi dòng Số lượng = 1.
- Tổng cộng hiện tại = 150,000 ₫.

### 2. Test Data (Inputs)

- Dòng cần xóa: `Sản phẩm A`
- Hành động trên dialog: Bấm "Xác nhận"

### 3. Test Steps

1. Mở trang Giỏ hàng.
2. Tại dòng "Sản phẩm A", bấm nút Xóa.
3. Khi dialog xác nhận hiện ra, bấm "Xác nhận".

### 4. Expected Result

- Trước khi xóa, hệ thống bắt buộc hiển thị dialog xác nhận.
- Sau khi xác nhận: dòng "Sản phẩm A" bị xóa khỏi giỏ; còn lại dòng "Sản phẩm B".
- Tổng cộng cập nhật lại = 50,000 ₫.
