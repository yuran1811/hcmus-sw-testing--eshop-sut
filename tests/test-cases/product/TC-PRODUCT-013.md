# TC-PRODUCT-013: Thêm sản phẩm khi không có token (chưa đăng nhập)

**Requirement ID:** FR-15
**Test Type:** Domain Testing

### 1. Preconditions

- Không gửi kèm JWT Token (chưa đăng nhập / không có header `Authorization`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ)
- Giá: `150000` (số dương — hợp lệ)
- Danh mục: `Thời trang` (tồn tại — hợp lệ)

### 3. Test Steps

1. Gửi request `POST /api/products` với dữ liệu hợp lệ nhưng **không** kèm header `Authorization`.
2. Quan sát phản hồi.

### 4. Expected Result

- Hệ thống trả về lỗi `401 Unauthorized` (theo FR-12, SEC-02).
- Không tạo sản phẩm dù mọi trường nhập liệu đều hợp lệ.
