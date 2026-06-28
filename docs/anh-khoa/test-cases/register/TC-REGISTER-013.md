# TC-REGISTER-013: Xác nhận mật khẩu không khớp

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana13@gmail.com`
- Mật khẩu: `Abcd123!` (hợp lệ)
- Xác nhận mật khẩu: `Abcd123@` (khác Mật khẩu — chỉ vi phạm điều kiện khớp)

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu là `Abcd123!` và Xác nhận mật khẩu là `Abcd123@`, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Mật khẩu xác nhận không khớp".
- Không có tài khoản nào được tạo.
