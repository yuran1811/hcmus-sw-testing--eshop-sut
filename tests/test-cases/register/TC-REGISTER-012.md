# TC-REGISTER-012: Mật khẩu để trống

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana12@gmail.com`
- Mật khẩu: `` (để trống)
- Xác nhận mật khẩu: `` (để trống)

### 3. Test Steps

1. Mở trang Đăng ký.
2. Để trống cả Mật khẩu và Xác nhận mật khẩu, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Mật khẩu là trường bắt buộc".
- Không có tài khoản nào được tạo.
