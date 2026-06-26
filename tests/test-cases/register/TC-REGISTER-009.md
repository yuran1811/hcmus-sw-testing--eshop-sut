# TC-REGISTER-009: Mật khẩu thiếu chữ số

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana09@gmail.com`
- Mật khẩu: `Abcdefg!` (8 ký tự, đủ hoa/thường/ký tự đặc biệt, chỉ thiếu chữ số)
- Xác nhận mật khẩu: `Abcdefg!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu và Xác nhận mật khẩu đều là `Abcdefg!`, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi định dạng mật khẩu (thiếu chữ số).
- Không có tài khoản nào được tạo.
