# TC-PRODUCT-004: Giá là số dương nhỏ nhất (biên dưới hợp lệ)

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ)
- Giá: `1` (giá trị dương nhỏ nhất — ngay trên biên 0)
- Danh mục: `Thời trang` (tồn tại)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm.
2. Nhập Giá = 1, Tên và Danh mục hợp lệ.
3. Bấm "Lưu".

### 4. Expected Result

- Sản phẩm được tạo thành công (Giá = 1 thỏa ràng buộc "> 0").
