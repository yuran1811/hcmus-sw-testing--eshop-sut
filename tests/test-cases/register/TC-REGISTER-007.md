# TC-REGISTER-007: Mật khẩu thiếu chữ hoa

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana07@gmail.com`
- Mật khẩu: `abcd123!` (8 ký tự, đủ thường/số/ký tự đặc biệt, chỉ thiếu chữ hoa)
- Xác nhận mật khẩu: `abcd123!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu và Xác nhận mật khẩu đều là `abcd123!`, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi định dạng mật khẩu (thiếu chữ hoa).
- Không có tài khoản nào được tạo.
