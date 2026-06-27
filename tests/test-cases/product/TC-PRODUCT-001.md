# TC-PRODUCT-001: Admin thêm sản phẩm với dữ liệu hợp lệ → tạo thành công

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại sẵn danh mục hợp lệ "Thời trang" trong hệ thống.

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ, 1–255 ký tự)
- Giá: `150000` (số dương)
- Danh mục: `Thời trang` (tồn tại)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm (Web Admin).
2. Nhập Tên, Giá và chọn Danh mục theo Test Data.
3. Bấm "Lưu".

### 4. Expected Result

- Sản phẩm mới được tạo thành công.
- Sản phẩm xuất hiện trong danh sách sản phẩm với đúng Tên, Giá, Danh mục đã nhập.
