# TC-PRODUCT-002: Tên sản phẩm đúng 255 ký tự (biên trên hợp lệ)

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: chuỗi gồm **đúng 255 ký tự** (ví dụ ký tự `A` lặp lại 255 lần)
- Giá: `150000` (số dương)
- Danh mục: `Thời trang` (tồn tại)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm.
2. Nhập Tên dài đúng 255 ký tự, Giá và Danh mục hợp lệ.
3. Bấm "Lưu".

### 4. Expected Result

- Sản phẩm được tạo thành công (255 ký tự là biên trên hợp lệ, vẫn được chấp nhận).
