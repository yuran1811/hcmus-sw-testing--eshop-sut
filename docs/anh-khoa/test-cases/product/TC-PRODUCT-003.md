# TC-PRODUCT-003: Tên sản phẩm 1 ký tự (biên dưới hợp lệ)

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: `A` (đúng 1 ký tự — biên dưới hợp lệ)
- Giá: `150000` (số dương)
- Danh mục: `Thời trang` (tồn tại)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm.
2. Nhập Tên 1 ký tự, Giá và Danh mục hợp lệ.
3. Bấm "Lưu".

### 4. Expected Result

- Sản phẩm được tạo thành công (1 ký tự là biên dưới hợp lệ vì Tên chỉ cần không rỗng).
