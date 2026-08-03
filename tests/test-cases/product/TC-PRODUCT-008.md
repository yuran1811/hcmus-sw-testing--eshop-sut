# TC-PRODUCT-008: Giá là số âm

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ)
- Giá: `-1000` (số âm — vi phạm ràng buộc "> 0")
- Danh mục: `Thời trang` (tồn tại — hợp lệ)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm.
2. Nhập Giá = -1000, Tên và Danh mục hợp lệ.
3. Bấm "Lưu".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Giá phải là số dương".
- Không lưu sản phẩm.
