# TC-PRODUCT-018: Xóa (Delete) sản phẩm thành công → loại khỏi danh sách

**Requirement ID:** FR-15
**Test Type:** Functional / Domain Testing

### 1. Preconditions

- Đã đăng nhập bằng tài khoản Admin (JWT hợp lệ, `role = 'admin'`).
- Tồn tại ít nhất 2 sản phẩm: "Sản phẩm X" và "Sản phẩm Y".

### 2. Test Data (Inputs)

- Sản phẩm cần xóa: `Sản phẩm X`

### 3. Test Steps

1. Mở màn hình quản lý sản phẩm.
2. Thực hiện Xóa "Sản phẩm X".
3. Kiểm tra lại danh sách sản phẩm.

### 4. Expected Result

- "Sản phẩm X" bị loại khỏi danh sách sản phẩm.
- "Sản phẩm Y" và các sản phẩm khác **giữ nguyên**, không bị ảnh hưởng.
