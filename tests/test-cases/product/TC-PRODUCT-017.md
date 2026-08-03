# TC-PRODUCT-017: Xem (Read/List) sản phẩm hiển thị đúng dữ liệu

**Requirement ID:** FR-15
**Test Type:** Functional / Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại sẵn sản phẩm "Sản phẩm X" với dữ liệu biết trước: Giá `150000`, Danh mục `Thời trang`.

### 2. Test Data (Inputs)

- Thao tác: Xem danh sách sản phẩm và xem chi tiết "Sản phẩm X".

### 3. Test Steps

1. Mở màn hình danh sách sản phẩm (Web Admin).
2. Đối chiếu danh sách với dữ liệu hiện có trong hệ thống.
3. Mở chi tiết "Sản phẩm X".

### 4. Expected Result

- Danh sách hiển thị đầy đủ các sản phẩm hiện có, đúng số lượng và dữ liệu.
- Chi tiết "Sản phẩm X" hiển thị đúng Tên, Giá (`150000`), Danh mục (`Thời trang`) — khớp với dữ liệu trong CSDL.
