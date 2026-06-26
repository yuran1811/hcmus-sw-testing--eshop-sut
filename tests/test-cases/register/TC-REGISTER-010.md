# TC-REGISTER-010: Mật khẩu không có ký tự đặc biệt

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana10@gmail.com`
- Mật khẩu: `Abcd1234` (8 ký tự, đủ hoa/thường/số, hoàn toàn không có ký tự đặc biệt)
- Xác nhận mật khẩu: `Abcd1234`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Mật khẩu và Xác nhận mật khẩu đều là `Abcd1234`, nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi định dạng mật khẩu (thiếu ký tự đặc biệt).
- Không có tài khoản nào được tạo.
