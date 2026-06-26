# TC-REGISTER-004: Email đã được đăng ký (trùng)

**Requirement ID:** FR-01
**Test Type:** Domain Testing

### 1. Preconditions

- Người dùng đang ở trang Đăng ký, chưa đăng nhập.
- Tài khoản với email `test@eshop.com` đã tồn tại trong hệ thống (tài khoản mặc định theo README).

### 2. Test Data (Inputs)

- Họ Tên: `Nguyễn Văn A`
- Email: `test@eshop.com` (đúng định dạng nhưng đã tồn tại)
- Mật khẩu: `Abcd123!`
- Xác nhận mật khẩu: `Abcd123!`

### 3. Test Steps

1. Mở trang Đăng ký.
2. Nhập Email `test@eshop.com` (đã tồn tại), nhập đầy đủ các trường còn lại theo Test Data.
3. Bấm nút "Đăng ký".

### 4. Expected Result

- Hệ thống hiển thị lỗi "Email đã tồn tại".
- Không tạo tài khoản trùng; tài khoản `test@eshop.com` ban đầu không bị thay đổi.
