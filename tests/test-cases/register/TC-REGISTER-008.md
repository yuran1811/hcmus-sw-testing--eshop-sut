# TC-REGISTER-008: Mật khẩu thiếu chữ thường

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana08@gmail.com`
- Mật khẩu: `ABCD123!` (8 ký tự, đủ hoa/số/ký tự đặc biệt, chỉ thiếu chữ thường)
- Xác nhận mật khẩu: `ABCD123!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu và Xác nhận mật khẩu đều là `ABCD123!`, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi định dạng mật khẩu (thiếu chữ thường).
- Không có tài khoản nào được tạo.
