# TC-REGISTER-002: Họ Tên để trống

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `` (để trống)
- Email: `nguyenvana02@gmail.com`
- Mật khẩu: `Abcd123!`
- Xác nhận mật khẩu: `Abcd123!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Để trống trường Họ Tên, nhập đầy đủ 3 trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Họ Tên là trường bắt buộc" phía trên nút submit.
- Không có tài khoản nào được tạo.
