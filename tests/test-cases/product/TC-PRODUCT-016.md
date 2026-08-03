# TC-PRODUCT-016: BVA — Giá là số thực dương nhỏ nhất (0.01) tại biên dưới `> 0`

**Requirement ID:** FR-15
**Test Type:** Boundary Value Analysis

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại danh mục hợp lệ "Thời trang".

### 2. Test Data (Inputs)

- Tên sản phẩm: `Áo thun nam` (hợp lệ)
- Giá: `0.01` (số thực dương nhỏ nhất với bước nhảy 0.01 — ngay trên biên 0)
- Danh mục: `Thời trang` (tồn tại)

### 3. Test Steps

1. Mở màn hình Thêm sản phẩm (Web Admin).
2. Nhập Giá = `0.01`, Tên và Danh mục hợp lệ.
3. Bấm "Lưu".

### 4. Expected Result

- Theo đặc tả FR-15 ("Giá phải là số dương `> 0`"), giá trị `0.01` thỏa điều kiện → sản phẩm được tạo **thành công**.
- _Mục tiêu BVA:_ kiểm khoảng `0 < giá < 1` mà Domain Testing chưa chạm (TC-PRODUCT-004 dùng `1`). Nếu hệ thống từ chối hoặc làm tròn `0.01` về 0:
  - Đó là điểm **không tuân thủ đặc tả** (đặc tả không ràng buộc Giá phải là số nguyên), **hoặc**
  - Cho thấy đặc tả còn **mơ hồ** — cần làm rõ Giá có ngầm định là số nguyên ₫ hay không.
