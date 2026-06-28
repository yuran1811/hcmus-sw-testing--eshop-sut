# TC-REGISTER-001: Đăng ký thành công với dữ liệu hợp lệ (mật khẩu chạm biên dưới 8 ký tự)

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký (Register), chưa đăng nhập.
- Email `nguyenvana01@gmail.com` chưa tồn tại trong hệ thống.

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `nguyenvana01@gmail.com`
- Mật khẩu: `Abcd123!` (đúng 8 ký tự — biên dưới hợp lệ; đủ hoa/thường/số/ký tự đặc biệt thuộc tập cho phép)
- Xác nhận mật khẩu: `Abcd123!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập đầy đủ 4 trường theo Test Data ở trên.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống tạo tài khoản mới thành công.
- Hệ thống chuyển hướng người dùng sang trang Đăng nhập.
