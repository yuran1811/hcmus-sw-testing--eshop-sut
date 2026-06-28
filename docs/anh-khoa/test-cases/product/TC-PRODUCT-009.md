# TC-PRODUCT-009: Giá để trống

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ)
- Giá: `` (để trống)
- Danh mục: `Thời trang` (tồn tại — hợp lệ)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm.
2. Để trống Giá, nhập Tên và Danh mục hợp lệ.
3. Bấm "Lưu".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Giá là bắt buộc".
- Không lưu sản phẩm.
