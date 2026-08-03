# TC-PRODUCT-006: Tên sản phẩm vượt quá 255 ký tự (biên trên không hợp lệ)

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: chuỗi gồm **256 ký tự** (vượt 1 ký tự so với giới hạn 255)
- Giá: `150000` (số dương — hợp lệ)
- Danh mục: `Thời trang` (tồn tại — hợp lệ)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm.
2. Nhập Tên dài 256 ký tự, Giá và Danh mục hợp lệ.
3. Bấm "Lưu".

### 4. Expected Result

- Hệ thống hiển thị lỗi validate độ dài (Tên tối đa 255 ký tự).
- Không lưu sản phẩm.
