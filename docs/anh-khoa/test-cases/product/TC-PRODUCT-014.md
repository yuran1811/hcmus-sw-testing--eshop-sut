# TC-PRODUCT-014: Thêm sản phẩm bằng tài khoản không phải Admin

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản người dùng thường (JWT hợp lệ nhưng `role = 'user'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ)
- Giá: `150000` (số dương — hợp lệ)
- Danh mục: `Thời trang` (tồn tại — hợp lệ)

### 3. Test Steps

1. Gửi request `POST /api/products` với dữ liệu hợp lệ, kèm token của user thường (`role = 'user'`).
2. Quan sát phản hồi.

### 4. Expected Result

- Hệ thống trả về lỗi `403 Forbidden` (token hợp lệ nhưng không có `role = 'admin'` — theo FR-12, SEC-03).
- Không tạo sản phẩm.
