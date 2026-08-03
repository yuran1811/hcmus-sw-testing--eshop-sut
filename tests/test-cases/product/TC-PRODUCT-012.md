# TC-PRODUCT-012: Danh mục không tồn tại trong hệ thống

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Không tồn tại danh mục có `category_id = 999999` trong hệ thống.

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ)
- Giá: `150000` (số dương — hợp lệ)
- Danh mục: `category_id = 999999` (không tồn tại — gửi trực tiếp qua API)

### 3. Test Steps

1. Gửi request Thêm sản phẩm với `category_id = 999999` (giá trị không có trong danh sách danh mục).
2. Quan sát phản hồi của hệ thống.

### 4. Expected Result

- Hệ thống từ chối: trả về lỗi validate "Danh mục không tồn tại / không hợp lệ".
- Không lưu sản phẩm.
