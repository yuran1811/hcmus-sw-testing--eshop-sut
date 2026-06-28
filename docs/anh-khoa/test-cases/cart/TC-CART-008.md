# TC-CART-008: Xóa sản phẩm nhưng hủy dialog → dòng giữ nguyên

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng đang có "Sản phẩm A" (100,000 ₫) và "Sản phẩm B" (50,000 ₫), mỗi dòng Số lượng = 1.
- Tổng cộng hiện tại = 150,000 ₫.

### 2. Test Data (Inputs)

- Dòng định xóa: `Sản phẩm A`
- Hành động trên dialog: Bấm "Hủy" (cancel)

### 3. Test Steps

1. Mở trang Giỏ hàng.
2. Tại dòng "Sản phẩm A", bấm nút Xóa.
3. Khi dialog xác nhận hiện ra, bấm "Hủy".

### 4. Expected Result

- Dòng "Sản phẩm A" KHÔNG bị xóa; giỏ hàng giữ nguyên 2 dòng.
- Tổng cộng giữ nguyên = 150,000 ₫.
