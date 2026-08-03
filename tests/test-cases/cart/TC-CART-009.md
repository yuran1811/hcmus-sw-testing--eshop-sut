# TC-CART-009: Xóa hết sản phẩm → giỏ rỗng hiển thị empty state

**Requirement ID:** FR-07
**Test Type:** Domain Testing

### 1. Preconditions

- Giỏ hàng đang có đúng 1 dòng: "Sản phẩm A" (Số lượng = 1).

### 2. Test Data (Inputs)

- Dòng cần xóa: `Sản phẩm A`
- Hành động trên dialog: Bấm "Xác nhận"

### 3. Test Steps

1. Mở trang Giỏ hàng.
2. Xóa "Sản phẩm A" và xác nhận trên dialog.
3. Quan sát trạng thái trang Giỏ hàng khi không còn sản phẩm nào.

### 4. Expected Result

- Giỏ hàng trở thành rỗng.
- Trang hiển thị empty state: có hình minh họa (illustration/icon) kèm thông báo rõ ràng, thân thiện về việc giỏ hàng trống.
- Không hiển thị bảng sản phẩm hay giá trị Tổng cộng dạng số.
