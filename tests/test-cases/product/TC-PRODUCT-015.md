# TC-PRODUCT-015: Sửa một sản phẩm chỉ ảnh hưởng đúng sản phẩm đó

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại ít nhất 2 sản phẩm: "Sản phẩm X" và "Sản phẩm Y" với dữ liệu ban đầu đã biết.

### 2. Test Data (Inputs)

- Sản phẩm cần sửa: `Sản phẩm X`
- Giá trị mới hợp lệ: Tên `Sản phẩm X (đã cập nhật)`, Giá `200000`, Danh mục `Thời trang`

### 3. Test Steps

1. Mở màn hình Sửa "Sản phẩm X".
2. Cập nhật Tên/Giá/Danh mục theo Test Data và bấm "Lưu".
3. Kiểm tra lại "Sản phẩm X" và "Sản phẩm Y" trong danh sách.

### 4. Expected Result

- "Sản phẩm X" được cập nhật đúng giá trị mới.
- "Sản phẩm Y" (và các sản phẩm khác) giữ nguyên hoàn toàn, không bị thay đổi.
