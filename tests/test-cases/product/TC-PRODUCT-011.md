# TC-PRODUCT-011: Không chọn Danh mục

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ)
- Giá: `150000` (số dương — hợp lệ)
- Danh mục: `` (không chọn)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm.
2. Nhập Tên và Giá hợp lệ, không chọn Danh mục.
3. Bấm "Lưu".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Danh mục là bắt buộc".
- Không lưu sản phẩm.
